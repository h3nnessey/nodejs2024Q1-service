export class PrimitiveDatabase<Primitive extends string | number> {
  private readonly primitives = new Set<Primitive>();

  public async add(primitive: Primitive): Promise<Primitive> {
    this.primitives.add(primitive);

    return primitive;
  }

  public async delete(primitive: Primitive): Promise<void> {
    this.primitives.delete(primitive);
  }

  public async findMany(): Promise<Primitive[]> {
    return Array.from(this.primitives.values());
  }
}
