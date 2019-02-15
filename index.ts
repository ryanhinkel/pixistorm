import { ticker } from 'pixi.js'

import * as Board from './board'

import { entities } from './entity'
import { renderSystem } from './systems/renderer'
import { weatherSystem } from './systems/weather'

// make entities
Board.create()

const _ticker = new ticker.Ticker()
_ticker.add((_delta) => {
  weatherSystem(entities)
  renderSystem(entities)
})

let go = true
_ticker.start()
document.getElementById('step').onclick = () => {
    go = !go
    if (go) { _ticker.start() }
    else    { _ticker.stop() }
}
