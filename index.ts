import { Container, WebGLRenderer, ticker, UPDATE_PRIORITY } from 'pixi.js'

import * as Board from './board'
import { weatherOn } from './weather'

const WIDTH = window.innerWidth - 20;
const HEIGHT = window.innerHeight - 20;
const boardWidth = 100
const boardHeight = 100

const renderer = new WebGLRenderer(WIDTH, HEIGHT, { transparent: true });
document.body.appendChild(renderer.view);
const container = new Container();

const board = Board.create(container, boardWidth, boardHeight)

const _ticker = new ticker.Ticker()
_ticker.add((_delta) => {
  weatherOn(board)
})

_ticker.add((_delta) => {
  renderer.render(container)
}, UPDATE_PRIORITY.LOW)

let go = false
document.getElementById('step').onclick = () => {
    go = !go
    if (go) { _ticker.start() }
    else    { _ticker.stop() }
}
