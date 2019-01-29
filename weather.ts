import { chance } from './random'

export enum WeatherType {
  SUNNY = 'SUNNY',
  RAIN = 'RAIN',
  CLOUDS = 'CLOUDS',
  SNOW = 'SNOW',
  HAIL = 'HAIL'
}

const neighborMap = {}

export const getNeighborsCoordinates = coordinate => {
  const x = coordinate[0]
  const y = coordinate[1]

  return [
    [x-1, y-1], [x, y-1], [x+1, y-1],
    [x-1, y],             [x+1, y],
    [x-1, y+1], [x, y+1], [x+1, y+1],
  ]
}

export const getNeighbors = (cell, cells) => {
  const { coordinate } = cell
  if (!neighborMap[coordinate]) {
    let neighbors = []
    getNeighborsCoordinates(coordinate).forEach(coordinate => {
      const neighbor = cells[coordinate]
      if (neighbor) {
        neighbors.push(neighbor)
      }
    })
    neighborMap[coordinate] = neighbors
  }
  return neighborMap[coordinate]
}

export const analyzeWeather = (neighbors) => {
  let counts = {
    [WeatherType.RAIN]: 0,
    [WeatherType.SUNNY]: 0,
    [WeatherType.CLOUDS]: 0,
  }
  neighbors.forEach(neighbor => {
    if (!counts[neighbor.weather]) {
      counts[neighbor.weather] = 0
    }
    counts[neighbor.weather] += 1
  })
  return counts
}

export const weatherOn = (cells) => {

  Object.values(cells).forEach(cell => {
    const neighbors = getNeighbors(cell, cells)
    const counts = analyzeWeather(neighbors)

    if (neighbors.length < 8 && cell.weather !== WeatherType.SUNNY) {
      cell.weather = WeatherType.SUNNY
      return
    }

    // Gets rainy if
    if (
      (cell.weather === WeatherType.CLOUDS && counts[WeatherType.CLOUDS] === 8) ||
      (cell.weather === WeatherType.CLOUDS && counts[WeatherType.RAIN] > 1)
    ) {
      cell.weather = WeatherType.RAIN

    // Gets cloudy if
    } else if (
      cell.weather === WeatherType.SUNNY &&
      (
        Math.random() < .001 ||
        (chance(10) && counts[WeatherType.CLOUDS] > 0) ||
        (chance(20) && counts[WeatherType.CLOUDS] > 1)
      )
    ) {
      cell.weather = WeatherType.CLOUDS

    // Gets sunny if
    } else if (
      cell.weather === WeatherType.RAIN
    ) {
      cell.weather = WeatherType.SUNNY
    }
  })
  return cells
}
