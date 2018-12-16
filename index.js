import { Container, Application } from 'pixi.js'
import { range, xprod } from 'ramda'

import { Cell } from './board'
import { weatherOn, SUNNY, RAIN, CLOUDS } from './weather'
import { choice } from './random'

const app = new Application(800, 600, {backgroundColor : 0xFFFFFF});
document.body.appendChild(app.view);

const container = new Container();
app.stage.addChild(container);

const boardWidth = 10
const boardHeight = 10
const boardCoordinates = xprod(range(0, boardWidth), range(0, boardHeight))

const initState = (coordinates) => {
  return coordinates.reduce((acc, coordinate) => {
    acc[coordinate] = {
      coordinate,
      weather: choice([SUNNY])
    }
    return acc
  }, {})
}

const initCells = (coordinates) => {
  return coordinates.reduce((acc, coordinate) => {
    acc[coordinate] = new Cell(coordinate, container)
    return acc
  }, {})
}

const state = initState(boardCoordinates)
const cells = initCells(boardCoordinates)
console.log(state)
console.log(cells)

const step = () => {
  weatherOn(state)
  boardCoordinates.forEach(coordinate => {
    cells[coordinate].render(state[coordinate])
  })
}

const loop = () => {
  requestAnimationFrame(() => {
    step()
    loop()
  })
}

loop()
