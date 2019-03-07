import { Component, ComponentIter, ECS, System } from './ecs';


class Position extends Component {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    super();
    this.x = x;
    this.y = y;
  }
}


class Velocity extends Component {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    super();
    this.x = x;
    this.y = y;
  }
}

class Health {
  value: number;

  constructor(value: number = 100) {
    this.value = value
  }
}


class VelocitySystem implements System<[Health, Velocity]> {
  components = [new Health, new Velocity];

  onUpdate(componentIter: ComponentIter<[Health, Velocity]>) {
    for (let [health, velocity] of componentIter) {

    }
  }
}


test("creates a storage array", () => {
  let ecs = new ECS();
  let entity = ecs.createEntity();
  ecs.addComponent(entity, new Velocity);
  expect(ecs.components).toHaveProperty('Velocity');
});

test("creates two storage arrays", () => {
  let ecs = new ECS();
  let entity = ecs.createEntity();
  ecs.addComponent(entity, new Velocity);
  ecs.addComponent(entity, new Position);
  expect(ecs.components).toHaveProperty('Velocity');
  expect(ecs.components).toHaveProperty('Position');
});

test("associates entities and components by index", () => {
  let ecs = new ECS();
  let entity = ecs.createEntity();
  ecs.addComponent(entity, new Velocity);
  expect(entity.components.Velocity == 0);
});

test("register system", () => {
  let ecs = new ECS();
  ecs.registerSystem(new VelocitySystem);
  expect(ecs.systems.length).toEqual(1);
});

test("runs velocity system", () => {
  let ecs = new ECS();
  let entity = ecs.createEntity()

  ecs.addComponent(entity, new Position(2, 3));
  ecs.addComponent(entity, new Velocity(4, 5));
  ecs.registerSystem(new VelocitySystem);
  ecs.run();

  const position = ecs.components.Position[entity.components.Position];
  expect(position).toEqual(new Position(6, 8));
});
