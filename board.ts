import { xprod, range } from 'ramda'

import { Weather } from './types'

import { addEntity, addComponent } from './entity'

const width = 50
const height = 50

export const create = () => {
  const boardCoordinates = xprod(range(0, width), range(0, height))

  const cellEntities = boardCoordinates.map(coordinate => {
    const entity = addEntity('cell')
    addComponent(entity.id, {
      name: 'position',
      x: coordinate[0],
      y: coordinate[1],
    })
    addComponent(entity.id, {
      name: 'weather',
      value: Weather.SUNNY ,
    })
    return entity
  })

  return cellEntities
}
