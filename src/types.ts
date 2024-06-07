import * as dom from './dom/types'
import { SelectorEnum } from './dom/types'

export interface BaseOptions {
  /**
   * if show controller
   */
  showController?: boolean
}

export interface PlantumlOptions extends BaseOptions {
  /**
   * image format
   */
  imageFormat?: 'png' | 'svg' | 'txt'
  /**
   * server url
   */
  server?: string
  [key: string]: any
}

export interface MermaidOptions extends BaseOptions {
  [key: string]: any
}

export { dom, SelectorEnum }
