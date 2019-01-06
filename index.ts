import { Container, WebGLRenderer } from 'pixi.js'
import { values } from 'ramda'

import * as Cell from './cell'
import * as Board from './board'
import { weatherOn } from './weather'

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

const board = Board.create(container, boardWidth, boardHeight)

const step = () => {
  weatherOn(board)
  values(board.cells).forEach(Cell.render)
  renderer.render(container)
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
