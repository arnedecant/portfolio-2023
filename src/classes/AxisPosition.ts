import { clamp, isEqual } from '../utils'

interface Position {
  x: number,
  y: number,
  z?: number
}

export default class AxisPosition {
  x: number = 0
  y: number = 0
  z: number = 0

  constructor (pos?: Position) {
    if (!pos) return
    this.x = pos.x
    this.y = pos.y
    this.z = pos.z ?? 0
    this.update(pos)
  }

  public update (pos: Position) {
    this.x = pos.x
    this.y = pos.y
    this.z = pos.z ?? 0
    return this
  }

  public updateFromMouseEvent (e: MouseEvent) {
    this.x = e.clientX
    this.y = e.clientY
    return this
  }

  public updateFromScrollPosition () {
    this.x = window.scrollX
    this.y = window.scrollY
    return this
  }

  public getScrollDiff () {
    const x = this.x - window.scrollX
    const y = this.y - window.scrollY
    return new AxisPosition({ x, y })
  }

  public clamp (min: AxisPosition, max: AxisPosition) {
    return new AxisPosition({
      x: clamp(this.x, min.x, max.x),
      y: clamp(this.y, min.y, max.y),
      z: clamp(this.z, min.z, max.z)
    })
  }

  public isEqualTo(pos: AxisPosition, threshold: number = 0): boolean {
    return isEqual(this.x, pos.x, threshold) && isEqual(this.y, pos.y, threshold) && isEqual(this.z, pos.z, threshold)
  }

  static getScreenCenter (): AxisPosition {
    return new AxisPosition({
      x: window.screenX / 2,
      y: window.screenY / 2
    })
  }
}
