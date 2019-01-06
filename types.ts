import { Container, Graphics } from 'pixi.js'
import { WeatherType } from './weather'

// export type Board = { [key: string]: Cell }
export interface Board {
    cells: { [key: string]: Cell }
}

export interface Cell {
    weather: WeatherType
    coordinate: [number, number]
    container: Container
    sprites: {[W in WeatherType]: Graphics}
}
