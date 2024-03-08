import { NotFoundException } from '@nestjs/common';

export class Database<Entity extends { id: string }> {
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

  public async delete(id: string): Promise<void> {
    const isEntityExists = this.entities.has(id);

    if (!isEntityExists) {
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

  public async has(id: string): Promise<boolean> {
    return this.entities.has(id);
  }
}
