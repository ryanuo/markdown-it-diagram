import * as dom from './dom/types'
import { SelectorEnum } from './dom/types'

export interface BaseOptions {
  /**
   * if use controller
   */
  isController?: boolean
}

export interface PlantumlOptions extends BaseOptions {
  /**
   * image format
   */
  imageFormat?: string
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
