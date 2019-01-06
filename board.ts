import { xprod, range } from 'ramda'

import * as Cell from './cell'
import { Board } from './types'


export const create = (container, height, width): Board => {
  const boardCoordinates = xprod(range(0, width), range(0, height))

  const cells = boardCoordinates.reduce((acc, coordinate) => {
    acc[coordinate] = Cell.create(coordinate, container)
    return acc
  }, {})

  return { cells }
}

export { Board } from './types'
