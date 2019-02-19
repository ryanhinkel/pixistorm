import { ECS } from './ecs';


class Position {
  x: number;
  y: number;
}

class Visibility {
  value: boolean;
}


test("registering a component type creates a storage array", () => {
  let ecs = new ECS().registerComponent('positions', new Position);
  expect(ecs.components).toHaveProperty('positions');
});

test("registering two components", () => {
  let ecs = new ECS()
    .registerComponent('positions', new Position)
    .registerComponent('visibilities', new Visibility);
  expect(ecs.components).toHaveProperty('positions');
  expect(ecs.components).toHaveProperty('visibilities');
})