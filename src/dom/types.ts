export type PanDirection = 'up' | 'down' | 'left' | 'right'

export interface ActionMap {
  [key: string]: () => void
}

export enum SelectorEnum {
  IMG = 'diagram-m',
  MODAL = 'data-diagram-modal',
  PLANTUML = 'data-diagram-plantuml',
  MERMAID = 'data-diagram-mermaid',
}

export type ContainterSelector = '[data-control-panel-container-modal]' | '[data-control-panel-container]'
export interface PanzoomObject {
  pan: (x: number, y: number, options: { relative: boolean, animate: boolean }) => void
}
