export const SUNNY = 'SUNNY'
export const RAIN = 'RAIN'
export const CLOUDS = 'CLOUDS'
export const SNOW = 'SNOW'
export const HAIL = 'HAIL'

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
  const coordinates = getNeighborsCoordinates(cell.coordinate)
  return coordinates.reduce((acc, coordinate) => {
    const neighbor = cells[coordinate]
    if (neighbor) {
      acc.push(neighbor)
      return acc
    } else {
      return acc
    }
  }, [])
}

export const analyzeWeather = (neighbors) => {
  let counts = {}
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
      (counts[CLOUDS] || 0) + (counts[RAIN] || 0) === 8
    ) {
      cell.weather = RAIN

    // Gets cloudy if
    } else if (
      Math.random() < .001 ||
      (Math.random() < .1 && counts[CLOUDS] > 0) ||
      (Math.random() < .2 && counts[CLOUDS] > 1) ||
      counts[CLOUDS] > 4 &&
      cell.weather == SUNNY
    ) {
      cell.weather = CLOUDS

    // Gets sunny if
    } else if (
      counts[RAIN] > 5 ||
      (counts[SUNNY] > 3 && counts[SUNNY] < 7)
    ) {
      cell.weather = SUNNY
    }
  })
  return cells
}
