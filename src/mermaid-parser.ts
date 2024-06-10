'use strict'

import { getController } from './render-control'
import { type MermaidOptions, SelectorEnum } from './types'

const functions = {
  options: {
    showController: false,
  } as MermaidOptions,

  initialize(options: MermaidOptions): void {
    if (options)
      this.options = Object.assign(this.options, options)
  },

  getMarkup(code: string): string {
    const content = removeTripleBackticks(code)
    const img = `<pre data-svg="${SelectorEnum.MERMAID}" class="mermaid ${SelectorEnum.IMG}">\n${content}\n</pre>\n`
    if (!this.options.showController)
      return img
    return getController(code, img)
  },
}

function removeTripleBackticks(inputString: string): string {
  if (inputString.endsWith('```')) {
    // Remove the last 3 characters
    return inputString.slice(0, -3)
  }
  else {
    // String doesn't end with "```", return as is
    return inputString
  }
}

export default {
  functions,
}
