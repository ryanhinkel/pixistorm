import { values } from 'ramda'
import { Graphics, Container, WebGLRenderer, ticker, UPDATE_PRIORITY } from 'pixi.js'

import { Board, Coordinate, Weather } from '../types'
import { createCellSprite } from '../sprites/cell'

const WIDTH = window.innerWidth - 20;
const HEIGHT = window.innerHeight - 20;
const renderer = new WebGLRenderer(WIDTH, HEIGHT, { transparent: true });
document.body.appendChild(renderer.view);
const container = new Container();

const sprites = {}


export const renderSystem = entities => {
  values(entities).forEach(entity => {
    if (entity.name === 'cell') {
      if (!sprites[entity.id]) {
        sprites[entity.id] = createCellSprite(container, entity)
      }
      const spriteMap = sprites[entity.id]
      values(spriteMap).forEach(sprite => sprite.visible = false)
      spriteMap[entity.weather.value].visible = true
    }
  })
  renderer.render(container)
}

