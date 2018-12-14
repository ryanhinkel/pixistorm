import { SUNNY, RAIN, CLOUDS } from './weather'

const cellWidth = 50
const cellHeight = 50

const createSunnySprite = (x, y) => {
  const cell = new PIXI.Graphics()
  cell.beginFill(0xc4f2fc)

  cell.moveTo(0,0)
  cell.lineTo(cellWidth, 0)
  cell.lineTo(cellWidth, cellHeight)
  cell.lineTo(0, cellHeight)
  cell.lineTo(0, 0)
  cell.endFill()

  cell.x = x * cellWidth
  cell.y = y * cellHeight
  return cell
}

const createRainSprite = (x, y) => {
  const cell = new PIXI.Graphics()
  cell.beginFill(0xc6b6b3)

  cell.moveTo(0,0);
  cell.lineTo(cellWidth, 0)
  cell.lineTo(cellWidth, cellHeight)
  cell.lineTo(0, cellHeight)
  cell.lineTo(0, 0)
  cell.endFill()

  cell.x = x * cellWidth
  cell.y = y * cellHeight
  return cell
}

const createCloudsSprite = (x, y) => {
  const cell = new PIXI.Graphics()
  cell.beginFill(0xcccccc)

  cell.moveTo(0,0);
  cell.lineTo(cellWidth, 0)
  cell.lineTo(cellWidth, cellHeight)
  cell.lineTo(0, cellHeight)
  cell.lineTo(0, 0)
  cell.endFill()

  cell.x = x * cellWidth
  cell.y = y * cellHeight
  return cell
}

const weatherMap = {
  [SUNNY]: createSunnySprite,
  [RAIN]: createRainSprite,
  [CLOUDS]: createCloudsSprite,
}

export const createSprite = (weather, coordinate) => {
  return weatherMap[weather](coordinate[0], coordinate[1])
}
