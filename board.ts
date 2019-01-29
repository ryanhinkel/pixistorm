import { Container, Graphics } from 'pixi.js'
import { WeatherType } from './weather'

const cellWidth = 5
const cellHeight = 5

export class Board {
  constructor (initialState) {
  }

  render (state) {

  }
}

export class Cell {
  container: Container,
  sprites: {[W in WeatherType]: Graphics}

  constructor (coordinate, parent) {
    this.container = new Container();
    parent.addChild(this.container)

    const [x, y] = coordinate
    this.container.x = x * cellWidth
    this.container.y = y * cellHeight

    this.sprites = {
      [WeatherType.SUNNY] : this.drawCell(0xc4f2fc),
      [WeatherType.CLOUDS]: this.drawCell(0xcccccc),
      [WeatherType.RAIN]: this.drawCell(0x635d60),
      [WeatherType.HAIL]: this.drawCell(0xdddddd),
      [WeatherType.SNOW]: this.drawCell(0xffffff),
    }
  }

  drawCell (color): Graphics {
    const g = new Graphics()
    g.beginFill(color)

    g.moveTo(0,0);
    g.lineTo(cellWidth, 0)
    g.lineTo(cellWidth, cellHeight)
    g.lineTo(0, cellHeight)
    g.lineTo(0, 0)
    g.endFill()

    this.container.addChild(g)
    g.visible = false
    return g
  }

  render (cellState) {

    Object.keys(this.sprites).forEach(weather => {
      const sprite = this.sprites[weather]
      if (weather === cellState.weather && !sprite.visible) {
        sprite.visible = true
      } else if (weather !== cellState.weather && sprite.visible) {
        sprite.visible = false
      }
    })
  }
}
