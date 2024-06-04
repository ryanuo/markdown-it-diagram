export type Framework = 'vue' | 'react'

export interface BaseOptions {
  /**
   * if use controller
   */
  isController?: boolean
  /**
   * framework name
   */
  framework?: Framework
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
