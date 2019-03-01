import { ComponentIter } from './ecs';
import { transpose } from 'ramda';


export class Entity {
  components: Record<string, number> = {};
}

export class Component {}
export type ComponentIter<T> = T[];

export interface System <T extends Component[]> {
  components: Component[];
  onUpdate(componentIter: ComponentIter<T>);
}

export class ECS {
  public entities: Entity[] = [];
  public components: Record<string, Component[]> = {};
  public systems: System<any>[] = [];

  public createEntity(): Entity {
    const entity = new Entity();
    this.entities.push(entity);
    return entity;
  }

  public registerComponent(component: Component): ECS {
    this.components[component.constructor.name] = [];
    return this;
  }

  public registerSystem <T extends Component[]> (system: System<T>): ECS {
    this.systems.push(system);
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

  public run() {
    for (const system of this.systems) {
      const componentIter = transpose(system.components.map(componentClass => {
        return this.components[componentClass.constructor.name];
      }));

      system.onUpdate(componentIter as any);
    }
  }
}
