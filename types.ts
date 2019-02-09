import { Container, Graphics } from 'pixi.js'

export type Coordinate = [number, number]

export interface Board {
    cells: { [key: string]: Cell }
}

export interface Cell {
    weather: Weather
    coordinate: [number, number]
    container: Container
    sprites: {[W in Weather]: Graphics}
}

export enum Weather {
  SUNNY = 'SUNNY',
  RAIN = 'RAIN',
  CLOUDS = 'CLOUDS',
  SNOW = 'SNOW',
  HAIL = 'HAIL'
}
