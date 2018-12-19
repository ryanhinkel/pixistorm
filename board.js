import { SUNNY, RAIN, CLOUDS } from './weather'

const cellWidth = 5
const cellHeight = 5

export class Board {
  constructor (initialState) {
  }

  render (state) {

  }
}
export class Cell {
  constructor (coordinate) {
    [this.x, this.y] = coordinate
  }

  render (cellState) {
    this.weather = cellState.weather
  }
}
