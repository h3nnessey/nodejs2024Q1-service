import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class EntityDatabase<Entity extends { id: string }> {
  private readonly entities = new Map<string, Entity>();

  public async create(entity: Entity): Promise<Entity> {
    this.entities.set(entity.id, entity);

    return entity;
  }

  public async update(id: string, dto: Partial<Entity>): Promise<Entity> {
    const entity = await this.findOne(id);

    const updatedEntity = this.entities
      .set(entity.id, { ...entity, ...dto })
      .get(entity.id);

    return updatedEntity;
  }

  public async delete(id: string, skipExistenceCheck = false): Promise<void> {
    const isEntityExists = this.entities.has(id);

    if (!isEntityExists && !skipExistenceCheck) {
      throw new NotFoundException();
    }

    this.entities.delete(id);
  }

  public async findMany(): Promise<Entity[]> {
    return Array.from(this.entities.values());
  }

  public async findOne(id: string): Promise<Entity> {
    const entity = this.entities.get(id);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  public async entityExistenceCheck(id: string): Promise<void> {
    if (!this.entities.has(id)) {
      throw new UnprocessableEntityException();
    }
  }
}
