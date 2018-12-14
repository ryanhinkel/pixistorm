import * as PIXI from 'pixi.js'
import brick from './brick.png'
import { range, xprod } from 'ramda'

import { createSprite } from './sprites'
import { SUNNY, RAIN, CLOUDS } from './weather'

const randint = (l, h) => {
  return Math.floor(Math.random() * (h - l)) + l
}

const choice = (arr) => {
  return arr[randint(0, arr.length)]
}

const app = new PIXI.Application(800, 600, {backgroundColor : 0xFFFFFF});
document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);


const boardWidth = 10
const boardHeight = 10

const createCell = (coordinate) => {
  const weather = SUNNY
  const sprite = createSprite(weather, coordinate)
  container.addChild(sprite)

  return {
    coordinate,
    sprite,
    weather,
  }
}

const modifyCell = (coordinate) => {
  const cell = boardCells[coordinate]
  container.removeChild(cell.sprite)
  const weather = choice([SUNNY, RAIN, CLOUDS])
  cell.sprite = createSprite(weather, coordinate)
  container.addChild(cell.sprite)
}

const boardCoordinates = xprod(range(0, boardWidth), range(0, boardHeight))

const boardCells = boardCoordinates.reduce((acc, coordinate) => {
  acc[coordinate] = createCell(coordinate)
  return acc
}, {})

const step = () => {
  const coordinate = choice(boardCoordinates)
  modifyCell(coordinate)
}

const loop = () => {
  requestAnimationFrame(() => {
    step()
    loop()
  })
}

loop()
