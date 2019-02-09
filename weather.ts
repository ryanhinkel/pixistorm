import { chance } from './random'
import { values } from 'ramda'
import { Weather } from './types'
import * as Board from './board'
import * as Cell from './cell'

export const analyzeWeather = (neighbors) => {
  let counts = {
    [Weather.RAIN]: 0,
    [Weather.SUNNY]: 0,
    [Weather.CLOUDS]: 0,
  }
  neighbors.forEach(neighbor => {
    if (!counts[neighbor.weather]) {
      counts[neighbor.weather] = 0
    }
    counts[neighbor.weather] += 1
  })
  return counts
}

export const weatherOn = (board: Board.Board) => {
  values(board.cells).forEach(cell => {
    const neighbors = Board.getNeighbors(board, cell.coordinate)
    const counts = analyzeWeather(neighbors)

    if (neighbors.length < 8 && cell.weather !== Weather.SUNNY) {
      Cell.setWeather(cell, Weather.SUNNY)
      return
    }

    // Gets rainy if
    if (
      (cell.weather === Weather.CLOUDS && counts[Weather.CLOUDS] === 8) ||
      (cell.weather === Weather.CLOUDS && counts[Weather.RAIN] > 1)
    ) {
      Cell.setWeather(cell, Weather.RAIN)

    // Gets cloudy if
    } else if (
      cell.weather === Weather.SUNNY &&
      (
        Math.random() < .001 ||
        (chance(10) && counts[Weather.CLOUDS] > 0) ||
        (chance(20) && counts[Weather.CLOUDS] > 1)
      )
    ) {
      Cell.setWeather(cell, Weather.CLOUDS)

    // Gets sunny if
    } else if (
      cell.weather === Weather.RAIN
    ) {
      Cell.setWeather(cell, Weather.SUNNY)
    }
  })
}
