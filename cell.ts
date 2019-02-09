import { Container, Graphics } from 'pixi.js'
import { Cell, Weather } from './types'

const cellWidth = 5
const cellHeight = 5

export const create = (coordinate, parent): Cell => {
    let container = new Container()
    parent.addChild(container)

    const [x, y] = coordinate
    container.x = x * cellWidth
    container.y = y * cellHeight

    const sprites = {
      [Weather.SUNNY] : draw(container, 0xc4f2fc),
      [Weather.CLOUDS]: draw(container, 0xcccccc),
      [Weather.RAIN]: draw(container, 0x635d60),
      [Weather.HAIL]: draw(container, 0xdddddd),
      [Weather.SNOW]: draw(container, 0xffffff),
    }
    return { container, sprites, coordinate, weather: Weather.SUNNY }
}

const draw = (container: Container, color): Graphics => {
  const g = new Graphics()
  g.beginFill(color)

  g.moveTo(0,0);
  g.lineTo(cellWidth, 0)
  g.lineTo(cellWidth, cellHeight)
  g.lineTo(0, cellHeight)
  g.lineTo(0, 0)
  g.endFill()

  container.addChild(g)
  g.visible = false
  return g
}

export const setWeather = (cell: Cell, weather: Weather): Cell => {
  getCurrentSprite(cell).visible = false
  cell.weather = weather
  getCurrentSprite(cell).visible = true
  return cell
}

const getCurrentSprite = (cell: Cell): Graphics => {
  return cell.sprites[cell.weather]
}

export { Cell } from './types'
