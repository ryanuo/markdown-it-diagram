// Process block-level uml diagrams
//
'use strict'
import type { PlantumlOptions } from './index.d'
import deflate from './deflate'
import { getController } from './render-control'

const functions = {
  options: {
    isController: true,
    framework: 'react',
  } as PlantumlOptions,

  initialize(options: PlantumlOptions): void {
    if (options)
      this.options = Object.assign(this.options, options)
  },

  getMarkup(code: string, diagramName: string): string {
    const srcVal = this.generateSource(code, diagramName, this.options)
    const img = `<img class="diagram-m" src="${srcVal}" alt="uml diagram">`
    if (!this.options.isController)
      return img

    return getController(code, img, '.diagram-m', this.options.framework ?? 'vue')
  },

  generateSource(umlCode: string, diagramMarker: string, pluginOptions: PlantumlOptions): string {
    const imageFormat = pluginOptions.imageFormat || 'svg'
    const server = pluginOptions.server || 'https://www.plantuml.com/plantuml'
    const umlContent = `@start${diagramMarker}\n${umlCode}\n@end${diagramMarker}`
    const zippedCode = deflate.zip_deflate(umlContent, 9)
    const base64Encoded = deflate.encode64(zippedCode)
    return `${server}/${imageFormat}/${base64Encoded}`
  },
}

export default {
  functions,
}
