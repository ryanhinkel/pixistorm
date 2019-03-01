export class Component {}

export class Entity {
  components: Record<string, number> = {};
}


export class ECS {
  public entities: Entity[] = [];
  public components: Record<string, Component[]> = {};

  public createEntity(): Entity {
    const entity = new Entity();
    this.entities.push(entity);
    return entity;
  }

  private registerComponent(component: Component): ECS {
    this.components[component.constructor.name] = [];
    return this;
  }

  public addComponent(entity: Entity, component: Component): Entity {
    const name = component.constructor.name;

    if (!(name in this.components)) {
      this.registerComponent(component);
    }

    const index = this.components[name].push(component) - 1;
    entity.components[component.constructor.name] = index;
    return entity;
  }

  public setComponent(entity: Entity, component: Component): Entity {
    const name = component.constructor.name;

    if (!(name in entity.components)) {
      throw new Error(`Entity does not have a ${name} component`);
    }

    const index = entity.components[name];
    this.components[name][index] = component;
    return entity;
  }
}
