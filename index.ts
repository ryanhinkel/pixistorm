import { Container, Application, WebGLRenderer } from 'pixi.js'
import { range, xprod } from 'ramda'

import * as Cell from './cell'
import { weatherOn, WeatherType } from './weather'
import { choice } from './random'
import { Board } from './types'

// const app = new Application(800, 600, {backgroundColor : 0xFFFFFF});
// document.body.appendChild(app.view);

const WIDTH = window.innerWidth - 20;
const HEIGHT = window.innerHeight - 20;

function setupRenderer() {
    const renderOptions = {
        transparent: true
    }
    const renderer = new WebGLRenderer(WIDTH, HEIGHT, renderOptions);
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.parentElement.removeChild(canvas);
    }
    document.body.appendChild(renderer.view)
    return renderer;
}

const renderer = setupRenderer();
const container = new Container();

const boardWidth = 100
const boardHeight = 100

const boardCoordinates = xprod(range(0, boardWidth), range(0, boardHeight))

const initCells = (coordinates) => {
  return coordinates.reduce((acc, coordinate) => {
    acc[coordinate] = Cell.create(coordinate, container)
    return acc
  }, {})
}

const cells = initCells(boardCoordinates)
const board: Board = { cells }

const step = () => {
  weatherOn(board)
  boardCoordinates.forEach(coordinate => {
    const key = coordinate.toString()
    const cell = cells[key]
    Cell.render(cell)
  })
  renderer.render(container);
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
