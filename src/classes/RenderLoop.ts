export default class RenderLoop {
  id: number|null = null
  isAuto: boolean = true
  fn: Function

  constructor (fn: Function, isAuto?: boolean) {
    this.fn = fn
    if (isAuto !== undefined) this.isAuto = isAuto
  }

  public request (isFirstTick: boolean = false) {
    if (this.id !== null) return
    this.id = window.requestAnimationFrame(() => this.render(isFirstTick))
  }

  public cancel () {
    if (this.id === null) return
    window.cancelAnimationFrame(this.id)
    this.id = null
  }

  public render (isFirstTick: boolean = false) {
    this.id = null
    this.fn.call(isFirstTick)
    if (this.isAuto) this.request()
  }
}
