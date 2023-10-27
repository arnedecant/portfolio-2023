import type { AxisPositionHistory } from '../types'
import { getRandomString, lerp } from '../utils'
import AxisPosition from './AxisPosition'
import RenderLoop from './RenderLoop'

export default class InteractiveElement {

  htmlElement: HTMLElement
  axisPosHistory: AxisPositionHistory = {
    prev: new AxisPosition(),
    curr: new AxisPosition()
  }
  randomString: string = getRandomString(2000)
  posScroll: AxisPosition = new AxisPosition()
  posMouse: AxisPosition = new AxisPosition()
  posScreenCenter: AxisPosition = AxisPosition.getScreenCenter()
  rect: DOMRect = new DOMRect()
  size: number
  animation: RenderLoop = new RenderLoop(this.render.bind(this))

  constructor (htmlElement: HTMLElement, size: number = 300) {
    this.htmlElement = htmlElement
    this.size = size
    this.calculateSizePosition()
    this.initEvents()
  }

  private calculateSizePosition () {
    this.posScroll.updateFromScrollPosition()
    this.rect = this.htmlElement.getBoundingClientRect()
  }

  private initEvents () {
    if (window === undefined) return
    window.addEventListener('mousemove', (e: MouseEvent) => this.posMouse.updateFromMouseEvent(e))
    window.addEventListener('resize', () => this.calculateSizePosition())
    this.htmlElement.addEventListener('mouseenter', () => this.animation.request(true))
    this.htmlElement.addEventListener('mouseleave', () => this.animation.cancel())
  }

  private render (isFirstTick: boolean = false) {
    const scrollDiff = this.posScroll.getScrollDiff()
    this.axisPosHistory.curr.update({
      x: (this.posMouse.x - (scrollDiff.x + this.rect.left)),
      y: (this.posMouse.y - (scrollDiff.y + this.rect.top))
    })
    if (isFirstTick) {
      this.axisPosHistory.prev.update({
        x: this.axisPosHistory.curr.x,
        y: this.axisPosHistory.curr.y
      })
    }
    this.axisPosHistory.prev.update({
      x: lerp(this.axisPosHistory.prev.x, this.axisPosHistory.curr.x, 0.2),
      y: lerp(this.axisPosHistory.prev.y, this.axisPosHistory.curr.y, 0.2)
    })
    this.htmlElement.style.setProperty('--x', this.axisPosHistory.prev.x + 'px')
    this.htmlElement.style.setProperty('--y', this.axisPosHistory.prev.y + 'px')
    this.htmlElement.style.setProperty('--size', this.size + 'px')
    if (this.axisPosHistory.prev.isEqualTo(this.axisPosHistory.curr, 2)) return
    this.htmlElement.setAttribute('data-string', getRandomString(15000))
  }

}
