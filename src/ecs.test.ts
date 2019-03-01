import { ECS } from './ecs';


class Position {
  x: number;
  y: number;
}

class Velocity {
  x: number;
  y: number;
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
