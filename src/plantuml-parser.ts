'use strict'

import type { LangType, PlantumlOptions } from './types'
import { SelectorEnum } from './types'

import deflate from './deflate'
import { getController } from './render-control'

const functions = {
  options: {
    showController: false,
  } as PlantumlOptions,

  initialize(options: PlantumlOptions): void {
    if (options)
      this.options = Object.assign(this.options, options)
  },

  getOptions(langName: LangType) {
    return this.options?.[langName] ? Object.assign(this.options, this.options?.[langName]) : this.options
  },

  getMarkup(code: string, diagramName: string, langName: LangType): string {
    const srcVal = this.generateSource(code, diagramName, this.getOptions(langName))
    const img = `<img class="${SelectorEnum.IMG}" src="${srcVal}" alt="uml diagram">`
    if (!this.options.showController)
      return img

    return getController(code, img)
  },

  generateSource(umlCode: string, diagramMarker: string, pluginOptions: PlantumlOptions): string {
    const imageFormat = pluginOptions?.imageFormat || 'svg'
    const server = pluginOptions?.server || 'https://www.plantuml.com/plantuml'
    const umlContent = `@start${diagramMarker}\n${umlCode}\n@end${diagramMarker}`
    const zippedCode = deflate.zip_deflate(umlContent, 9)
    const base64Encoded = deflate.encode64(zippedCode)
    return `${server}/${imageFormat}/${base64Encoded}`
  },
}

export default {
  functions,
}
