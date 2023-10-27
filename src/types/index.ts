import type AxisPosition from '../classes/AxisPosition'

export interface AxisPositionHistory {
  prev: AxisPosition,
  curr: AxisPosition
}

export enum ProjectTag {
  Vue = 'vue',
  WebGL = 'webgl',
  Website = 'website'
}

export interface Project {
  slug: string
  name: string
  intro: string
  description: string
  tags: ProjectTag[],
  src: string
}
