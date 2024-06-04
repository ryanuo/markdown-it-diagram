import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import type Renderer from 'markdown-it/lib/renderer.mjs'
import * as mermaidFunctions from './mermaid-parser'
import * as platumlFunctions from './plantuml-parser'
import type { PlantumlOptions } from './types'

export default function umlPlugin(md: MarkdownIt, options: PlantumlOptions = {}) {
  platumlFunctions.default.functions.initialize(options)
  mermaidFunctions.default.functions.initialize(options)

  const defaultRenderer = md.renderer.rules.fence!.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens: Token[], idx: number, options: any, env: any, slf: Renderer) => {
    const token = tokens[idx]
    const code = token.content.trim()
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    let langName = ''
    if (info)
      langName = info.split(/\s+/g)[0]

    switch (langName) {
      case 'mermaid':
        return mermaidFunctions.default.functions.getMarkup(code)
      case 'plantuml':
      case 'dot':
        return platumlFunctions.default.functions.getMarkup(code, 'uml')
      case 'ditaa':
        return platumlFunctions.default.functions.getMarkup(code, 'ditaa')
    }
    return defaultRenderer(tokens, idx, options, env, slf)
  }
}
