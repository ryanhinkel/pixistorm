import { Container, Graphics } from 'pixi.js'
import { SUNNY, RAIN, CLOUDS } from './weather'

const cellWidth = 50
const cellHeight = 50

export class Board {
  constructor (initialState) {
  }

  render (state) {

  }
}

export class Cell {
  constructor (coordinate, parent) {
    this.container = new Container();
    parent.addChild(this.container)

    const [x, y] = coordinate
    this.container.x = x * cellWidth
    this.container.y = y * cellHeight

    this.sprites = {
      [SUNNY] : this.drawCell(0xc4f2fc),
      [CLOUDS]: this.drawCell(0xcccccc),
      [RAIN]: this.drawCell(0x635d60),
    }
  }

  drawCell (color) {
    const cell = new Graphics()
    cell.beginFill(color)

    cell.moveTo(0,0);
    cell.lineTo(cellWidth, 0)
    cell.lineTo(cellWidth, cellHeight)
    cell.lineTo(0, cellHeight)
    cell.lineTo(0, 0)
    cell.endFill()

    this.container.addChild(cell)
    cell.visible = false

    return cell
  }

  render (cellState) {
    Object.keys(this.sprites).forEach(weather => {
      const sprite = this.sprites[weather]
      if (weather == cellState.weather && !sprite.visible) {
        sprite.visible = true
      } else if (weather != cellState.weather && sprite.visible) {
        sprite.visible = false
      }
    })
  }
}
