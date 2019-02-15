import { Graphics, Container } from 'pixi.js'
import { Weather } from '../types'

export const createCellSprite = (container, entity) => {
    const cellWidth = 5
    const cellHeight = 5
    const {x, y} = entity.position

    let cellContainer = new Container()
    cellContainer.x = x * cellWidth
    cellContainer.y = y * cellHeight
    container.addChild(cellContainer)

    const draw = (color): Graphics => {
      const g = new Graphics()
      g.beginFill(color)

      g.moveTo(0,0);
      g.lineTo(cellWidth, 0)
      g.lineTo(cellWidth, cellHeight)
      g.lineTo(0, cellHeight)
      g.lineTo(0, 0)
      g.endFill()

      cellContainer.addChild(g)
      g.visible = false
      return g
    }

    const sprites = {
      [Weather.SUNNY] : draw(0xc4f2fc),
      [Weather.CLOUDS]: draw(0xcccccc),
      [Weather.RAIN]: draw(0x635d60),
      [Weather.HAIL]: draw(0xdddddd),
      [Weather.SNOW]: draw(0xffffff),
    }
    return sprites
}
