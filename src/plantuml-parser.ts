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
    return this.options?.[langName] ? Object.assign({}, this.options, this.options?.[langName]) : this.options
  },

  getMarkup(code: string, diagramName: string, langName: LangType): string {
    const opt = this.getOptions(langName)
    const srcVal = this.generateSource(code, diagramName, opt)
    const img = `<div data-${opt.imageFormat || 'svg'}="${SelectorEnum.PLANTUML}" class="${SelectorEnum.IMG}"><img src="${srcVal}" alt="uml diagram"></div>`
    if (!this.options.showController)
      return img

    return getController(code, img)
  },

  generateSource(umlCode: string, diagramName: string, pluginOptions: PlantumlOptions): string {
    let umlContent = umlCode
    if (!umlCode.startsWith('@start')) {
      umlContent = `@start${diagramName}\n${umlCode}\n@end${diagramName}`
    }
    const imageFormat = pluginOptions?.imageFormat || 'svg'
    const server = pluginOptions?.server || 'https://www.plantuml.com/plantuml'
    const unescapeUmlContent = unescape(encodeURIComponent(umlContent))
    const zippedCode = deflate.zip_deflate(unescapeUmlContent, 9)
    const base64Encoded = deflate.encode64(zippedCode)
    return `${server}/${imageFormat}/${base64Encoded}`
  },
}

export default {
  functions,
}
