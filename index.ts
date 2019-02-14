import { Container, WebGLRenderer, ticker, UPDATE_PRIORITY } from 'pixi.js'

import * as Board from './board'
import { weatherOn } from './weather'

const WIDTH = window.innerWidth - 20;
const HEIGHT = window.innerHeight - 20;
const boardWidth = 20
const boardHeight = 20

const renderer = new WebGLRenderer(WIDTH, HEIGHT, { transparent: true });
document.body.appendChild(renderer.view);
const container = new Container();

const board = Board.create(container, boardWidth, boardHeight)

const _ticker = new ticker.Ticker()
_ticker.add((_delta) => {
  weatherOn(board)
  renderer.render(container)
})

let go = true
_ticker.start()
document.getElementById('step').onclick = () => {
    go = !go
    if (go) { _ticker.start() }
    else    { _ticker.stop() }
}
