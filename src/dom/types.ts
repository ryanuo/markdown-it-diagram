export type PanDirection = 'up' | 'down' | 'left' | 'right'

export interface ActionMap {
  [key: string]: () => void
}

export enum SelectorEnum {
  IMG = 'diagram-m',
  MODAL = 'dialog__m',
}

export type ContainterSelector = '[data-controll-panel-container-modal]' | '[data-controll-panel-container]'
