export type Framework = 'vue' | 'react'
export interface PlantumlOptions {
  imageFormat?: string
  server?: string
  isController?: boolean
  framework?: Framework
  [key: string]: any
}

export interface MermaidOptions {
  isController?: boolean
  framework?: Framework
  [key: string]: any
}
