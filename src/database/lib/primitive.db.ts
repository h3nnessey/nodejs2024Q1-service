export class PrimitiveDatabase<Primitive extends string | number> {
  private primitives: Primitive[] = [];

  public async add(primitive: Primitive): Promise<Primitive> {
    const index = this.primitives.indexOf(primitive);

    if (index === -1) {
      this.primitives.push(primitive);
    }

    return primitive;
  }

  public async delete(primitive: Primitive): Promise<void> {
    this.primitives = this.primitives.filter((value) => value !== primitive);
  }

  public async findMany(): Promise<Primitive[]> {
    return this.primitives;
  }
}
