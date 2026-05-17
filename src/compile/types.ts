import * as dom from '../dom/types'
import { SelectorEnum } from '../dom/types'

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
    // no support svg: https://github.com/plantuml/plantuml/issues/2495#issuecomment-4405454899
    imageFormat?: 'png'
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
