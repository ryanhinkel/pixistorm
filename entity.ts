const makeIdGenerator = () => {
  let id = 0
  return () => id++
}

const newId: () => number = makeIdGenerator()
const reserved = ['id', 'name']

export const entities = {}

export const addEntity = (name) => {
  const id = newId()
  const entity = {
    id,
    name,
    components: {}
  }
  entities[id] = entity
  return entity
}

export const removeEntity = id => {
  delete entities[id]
}

export const addComponent = (entityId: number, component) => {
  if (reserved.indexOf(component.name) !== -1) {
    throw "Cannont use " + component.name + " to name a component"
  }
  const entity = entities[entityId]
  entity[component.name] = component
}

export const removeComponent = (entityId: number, component) => {
  const entity = entities[entityId]
  delete entity.components[component.name]
}
