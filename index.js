import { range, xprod } from 'ramda'

import { Cell } from './board'
import { weatherOn, SUNNY, RAIN, CLOUDS } from './weather'
import { choice } from './random'

const boardWidth = 100
const boardHeight = 100

const newCanvas = () => {
  const canvas = document.createElement("canvas")
  canvas.width = boardWidth*5
  canvas.height = boardHeight*5
  canvas.ctx = canvas.getContext("2d")
  return canvas
}

const paintCanvas = newCanvas()
const displayCanvas = newCanvas()
document.body.appendChild(displayCanvas)

const drawCell = ([x,y]) => {
  paintCanvas.ctx.fillRect(x*5, y*5, 5, 5)
}

const draw = () => {
  const { ctx, width, height } = paintCanvas
  ctx.fillStyle = "#c4f2fc"
  ctx.fillRect(0,0,width,height)

  const sunny = boardCoordinates.filter(coordinate => cells[coordinate].weather === SUNNY)
  const clouds = window.clouds = boardCoordinates.filter(coordinate => cells[coordinate].weather === CLOUDS)
  const rain = boardCoordinates.filter(coordinate => cells[coordinate].weather === RAIN)

  sunny.forEach(drawCell)
  ctx.fillStyle = "#cccccc"
  clouds.forEach(drawCell)
  ctx.fillStyle = "#635d60"
  rain.forEach(drawCell)

  displayCanvas.ctx.drawImage(paintCanvas,0,0)
}

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
    acc[coordinate] = new Cell(coordinate)
    return acc
  }, {})
}

const state = initState(boardCoordinates)
const cells = initCells(boardCoordinates)

window.cells = cells

const step = () => {
  weatherOn(state)
  boardCoordinates.forEach(coordinate => {
    const key = coordinate.toString()
    cells[key].render(state[key])
  })
  draw()
}

let go = false
const render = () => {
  if (go) {
    step()
  }
  requestAnimationFrame(render)
}

render()

document.getElementById('step').onclick = () => {
  console.log(go)
  go = !go
}
