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

export type PanDirection = 'up' | 'down' | 'left' | 'right'

export interface ActionMap {
  [key: string]: () => void
}

export enum SelectorEnum {
  IMG = 'diagram-m',
}
