import { xprod, range } from 'ramda'

import * as Cell from './cell'
import { Board, Coordinate } from './types'

export const create = (container, height, width): Board => {
  const boardCoordinates = xprod(range(0, width), range(0, height))

  const cells = boardCoordinates.reduce((acc, coordinate) => {
    const s = coordString(coordinate)
    acc[s] = Cell.create(coordinate, container)
    return acc
  }, {})

  return { cells }
}

export const getCell = (board: Board, coord: Coordinate): Cell.Cell => {
  const s = coordString(coord)
  return board.cells[s]
}

const neighborMap = {}

export const getNeighborsCoordinates = (coordinate: Coordinate): Coordinate[] => {
  const x = coordinate[0]
  const y = coordinate[1]

  return [
    [x-1, y-1], [x, y-1], [x+1, y-1],
    [x-1, y],             [x+1, y],
    [x-1, y+1], [x, y+1], [x+1, y+1],
  ]
}

export const getNeighbors = (board: Board, coordinate: Coordinate) => {
  const cs = coordString(coordinate)

  if (!neighborMap[cs]) {
    let neighbors = []
    getNeighborsCoordinates(coordinate).forEach(c => {
      const neighbor = getCell(board, c)
      if (neighbor) {
        neighbors.push(neighbor)
      }
    })
    neighborMap[cs] = neighbors
  }
  return neighborMap[cs]
}

const coordString = (coord): string => {
  return coord.toString()
}

export { Board } from './types'
