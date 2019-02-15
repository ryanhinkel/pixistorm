import { chance } from '../random'
import { values } from 'ramda'
import { Weather } from '../types'
import * as Board from '../board'
import { entities } from '../entity'

export const analyzeWeather = (neighbors) => {
  let counts = {
    [Weather.RAIN]: 0,
    [Weather.SUNNY]: 0,
    [Weather.CLOUDS]: 0,
  }
  neighbors.forEach(neighbor => {
    const weather = neighbor.weather.value
    if (!counts[weather]) {
      counts[weather] = 0
    }
    counts[weather] += 1
  })
  return counts
}

const neighborMap = {}

export const getNeighborsCoordinates = (position) => {
  const { x, y } = position

  return [
    [x-1, y-1], [x, y-1], [x+1, y-1],
    [x-1, y],             [x+1, y],
    [x-1, y+1], [x, y+1], [x+1, y+1],
  ]
}

export const getCell = (coordinate) => {
  const [targetX, targetY] = coordinate
  let result = null
  values(entities).forEach((entity: any) => {
    const { x, y } = entity.position
    if (entity.name == 'cell' && x === targetX && y === targetY) {
      result = entity
    }
  })
  return result
}

export const getNeighbors = (entity) => {
  const { position } = entity
  const cs = coordString(position)

  if (!neighborMap[cs]) {
    let neighbors = []
    getNeighborsCoordinates(position).forEach(c => {
      const neighbor = getCell(c)
      if (neighbor) {
        neighbors.push(neighbor)
      }
    })
    neighborMap[cs] = neighbors
  }
  return neighborMap[cs]
}

const coordString = (position) => {
  return `${position.x},${position.y}`
}

export const weatherSystem = (entities) => {
  values(entities).forEach(entity => {
    const neighborMap = getNeighbors(entity)
    if (entity.name === 'cell') {
      const neighbors = getNeighbors(entity)
      const counts = analyzeWeather(neighbors)

      const weather = entity.weather.value
      if (neighbors.length < 8 && weather !== Weather.SUNNY) {
        entity.weather.value = Weather.SUNNY
        return
      }

      // Gets rainy if
      if (
        (weather === Weather.CLOUDS && counts[Weather.CLOUDS] === 8) ||
        (weather === Weather.CLOUDS && counts[Weather.RAIN] > 1)
      ) {
        entity.weather.value = Weather.RAIN

      // Gets cloudy if
      } else if (
        weather === Weather.SUNNY &&
        (
          Math.random() < .001 ||
          (chance(10) && counts[Weather.CLOUDS] > 0) ||
          (chance(20) && counts[Weather.CLOUDS] > 1)
        )
      ) {
        entity.weather.value = Weather.CLOUDS

      // Gets sunny if
      } else if (
        weather === Weather.RAIN
      ) {
        entity.weather.value = Weather.SUNNY
      }
    }
  })
}
