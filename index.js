import * as PIXI from 'pixi.js'
import { range, xprod } from 'ramda'

import { createSprite } from './sprites'
import { weatherOn, SUNNY, RAIN, CLOUDS } from './weather'
import { choice } from './random'

const app = new PIXI.Application(800, 600, {backgroundColor : 0xFFFFFF});
document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);


const boardWidth = 10
const boardHeight = 10

const initCells = (coordinate) => {
  return {
    coordinate,
    sprite: null,
    weather: choice([SUNNY]),
  }
}

const renderCellSprites = cells => {
  Object.values(cells).forEach(cell => {
    if (cell.sprite) {
      container.removeChild(cell.sprite)
    }
    const sprite = createSprite(cell.weather, cell.coordinate)
    cell.sprite = sprite
    container.addChild(sprite)
  })
}

const boardCoordinates = xprod(range(0, boardWidth), range(0, boardHeight))

const boardCells = boardCoordinates.reduce((acc, coordinate) => {
  acc[coordinate] = initCells(coordinate)
  return acc
}, {})

const step = () => {
  weatherOn(boardCells)
  renderCellSprites(boardCells)
}

const loop = () => {
  requestAnimationFrame(() => {
    step()
    loop()
  })
}

renderCellSprites(boardCells)
loop()
