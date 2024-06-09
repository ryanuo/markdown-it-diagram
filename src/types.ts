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
  /**
   * ditaa options
   */
  ditaa?: {
    server?: string
    imageFormat?: 'png' | 'txt'
  }
  /**
   * dot options
   */
  dot?: {
    server?: string
    imageFormat?: 'png' | 'svg' | 'txt'
  }
  /**
   * plantuml options
   */
  plantuml?: {
    server?: string
    imageFormat?: 'png' | 'svg' | 'txt'
  }
  [key: string]: any
}

export type LangType = 'ditaa' | 'dot' | 'plantuml'

export interface MermaidOptions extends BaseOptions {
  [key: string]: any
}

export { dom, SelectorEnum }
