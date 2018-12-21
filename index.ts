import { Container, Application, WebGLRenderer } from 'pixi.js'
import { range, xprod } from 'ramda'

import { Cell } from './board'
import { weatherOn, SUNNY, RAIN, CLOUDS } from './weather'
import { choice } from './random'

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

const step = () => {
  weatherOn(state)
  boardCoordinates.forEach(coordinate => {
    const key = coordinate.toString()
    cells[key].render(state[key])
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
