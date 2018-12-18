import { chance } from './random'

export const SUNNY = 'SUNNY'
export const RAIN = 'RAIN'
export const CLOUDS = 'CLOUDS'
export const SNOW = 'SNOW'
export const HAIL = 'HAIL'

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
    [RAIN]: 0,
    [SUNNY]: 0,
    [CLOUDS]: 0,
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

    if (neighbors.length < 8 && cell.weather !== SUNNY) {
      cell.weather = SUNNY
      return
    }

    // Gets rainy if
    if (
      counts[CLOUDS] + counts[RAIN] === 8
    ) {
      cell.weather = RAIN

    // Gets cloudy if
    } else if (
      Math.random() < .001 ||
      (chance(10) && counts[CLOUDS] > 0) ||
      (chance(20) && counts[CLOUDS] > 1) ||
      counts[CLOUDS] > 4 &&
      cell.weather === SUNNY
    ) {
      cell.weather = CLOUDS

    // Gets sunny if
    } else if (
      counts[RAIN] > 5 ||
      (counts[SUNNY] > 3 && counts[SUNNY] < 7) ||
      (cell.weather === RAIN && counts[SUNNY] > 4)
    ) {
      cell.weather = SUNNY
    }
  })
  return cells
}
