import { Svg2Roughjs } from 'svg2roughjs'

import type { ActionMap, ContainterSelector, PanDirection } from './types'
import { SelectorEnum } from './types'
import './style.css'
import { DiagarmModal } from './modal'

/**
 * diagram modal
 * @param modalSelector
 * @param content
 * @returns
 */
export function setupModalHandler(modalSelector: string, content: string, callback?: () => void) {
  const modalElement = document.querySelector(modalSelector)
  if (!modalElement) {
    console.error(`Modal element not found for selector: ${modalSelector}`)
    return
  }

  if (content) {
    const modalBody = modalElement?.querySelector('.modal-body')
    if (modalBody) {
      modalBody.innerHTML = content;
      (modalElement.querySelector('[data-control-btn="dialog"]') as HTMLElement)!.style.display = 'none'
    }
  }

  callback?.()
}

/**
 * copy to clipboard
 * @param btn
 */
async function copyToClipboard(btn: HTMLElement): Promise<void> {
  try {
    const text: string = btn.getAttribute('data-clipboard-code') || ''
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      const copyIcon = btn.querySelector('.octicon-init')
      const checkIcon = btn.querySelector('.octicon-check')
      copyIcon?.classList.add('fg-none')
      checkIcon?.classList.remove('fg-none')
      setTimeout(() => {
        copyIcon?.classList.remove('fg-none')
        checkIcon?.classList.add('fg-none')
      }, 1000)
    }
    else {
      console.warn('The Current Environment Does Not Support Clipboard API')
    }
  }
  catch (err) {
    console.error('Failed To Copy To Clipboard:', err)
  }
}

/**
 * @description move the diagram
 * @param diagram
 * @param direction
 * @returns
 */
function panDiagram(diagram: HTMLElement | null, direction: PanDirection): void {
  if (!diagram)
    return
  const currentTransform: string = diagram?.style.transform || 'translate(0px, 0px) scale(1)'
  let [translateStr, scaleStr] = currentTransform.split(' scale')
  translateStr = translateStr.trim()
  scaleStr = scaleStr ? ` scale${scaleStr.trim()}` : ''
  const transformValues: string[] = translateStr.replace('translate(', '').replace(')', '').split(',')
  let x: number = Number.parseInt(transformValues[0].trim())
  let y: number = Number.parseInt(transformValues[1].trim())

  switch (direction) {
    case 'up':
      y -= 20
      break
    case 'down':
      y += 20
      break
    case 'left':
      x -= 20
      break
    case 'right':
      x += 20
      break
  }

  diagram.style.transform = `translate(${x}px, ${y}px)${scaleStr}`
}

/**
 * DiagramController zoom in/out
 */
class DiagramController {
  private scale: number
  private diagram: HTMLElement | null

  constructor(diagram: HTMLElement) {
    this.diagram = diagram
    this.scale = 1
    this.resetView()
  }

  zoomIn(): void {
    this.scale *= 1.2
    this.applyScale()
  }

  zoomOut(): void {
    this.scale /= 1.2
    if (this.scale < 0.1) {
      this.scale = 0.1
    }
    this.applyScale()
  }

  resetView(): void {
    if (!this.diagram)
      return
    this.scale = 1
    this.diagram.style.transform = 'translate(0px, 0px) scale(1)'
  }

  private applyScale(): void {
    if (!this.diagram)
      return
    const currentTransform: string = this.diagram.style.transform || 'translate(0px, 0px) scale(1)'
    const [translateStr] = currentTransform.split(' scale')
    this.diagram.style.transform = `${translateStr} scale(${this.scale})`
  }
}

function replaceImageWithSvg(diagram: HTMLElement, svgTemp: any, callback: () => void): void {
  const imgEle = diagram.querySelector('img')
  const svgUrl = imgEle!.getAttribute('src')!
  const width = imgEle!.width
  const height = imgEle!.height
  fetch(svgUrl)
    .then(response => response.text())
    .then((svgText) => {
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
      const svgElement = svgDoc.documentElement
      svgElement.setAttribute('width', `${width}px`)
      svgElement.setAttribute('height', `${height}px`)
      svgElement.style.width = `${width}px`
      svgElement.style.height = `${height}px`
      svgTemp.init = svgElement
      callback?.()
    })
    .catch((error) => {
      console.error('Error fetching and parsing SVG:', error)
    })
}

/**
 * svg diagram to rough diagram
 * @param diagram diagram container
 * @param svgTemp svg temp dom
 * @param btn button control panel
 */
async function svgToRough(diagram: HTMLElement, btn: HTMLElement, svgTemp: any) {
  if (!diagram)
    return

  const currentIdentifier = diagram.getAttribute('data-svg')
  const btn_selectors = btn.querySelectorAll('svg')
  btn_selectors?.forEach((btn_selector) => {
    if (btn_selector.classList.contains('octicon-loading')) {
      btn_selector.classList.remove('fg-none')
    }
    else {
      btn_selector.classList.add('fg-none')
    }
  })

  const callback = () => {
    if (svgTemp.rough) {
      diagram.replaceChildren(svgTemp?.init)
      svgTemp.rough = null
      btn.querySelector('.octicon-loading')?.classList.add('fg-none')
      btn.querySelector('.octicon-check')?.classList.add('fg-none')
      btn.querySelector('.octicon-init')?.classList.remove('fg-none')
    }
    else {
      const svg2roughjs = new Svg2Roughjs(diagram as any)
      svg2roughjs.svg = svgTemp.init
      svg2roughjs.sketch().then((res) => {
        diagram.replaceChildren(res as Node)
        svgTemp.rough = res
      }).finally(() => {
        btn.querySelector('.octicon-loading')?.classList.add('fg-none')
        btn.querySelector('.octicon-check')?.classList.remove('fg-none')
        btn.querySelector('.octicon-init')?.classList.add('fg-none')
      })
    }
  }

  if (currentIdentifier === SelectorEnum.PLANTUML && !svgTemp.init) {
    return replaceImageWithSvg(diagram, svgTemp, callback)
  }
  callback()
}

/**
 * @param selector
 * [data-controll-panel-container-modal] | [data-controll-panel-container]
 */
const markdownItDiagramDom: (selector?: ContainterSelector) => void = function (selector = '[data-controll-panel-container]') {
  const containers: NodeListOf<Element> = document.querySelectorAll(selector)

  let diagramModal: DiagarmModal | null = null

  // setup modal handler
  if (!document.querySelector(`[${SelectorEnum.MODAL}]`))
    diagramModal = new DiagarmModal()
  containers.forEach((container: Element) => {
    const diagram: HTMLElement | null = container.querySelector(`.${SelectorEnum.IMG}`)
    if (!diagram) {
      console.warn('Cannot find diagram within container')
      return
    }

    const diagramController = new DiagramController(diagram)
    const svgContainer = container.querySelector('[data-svg]')
    let svgTemp = null
    if (svgContainer) {
      container.querySelector('[data-control-btn="rough"]')?.classList.remove('fg-none')
      svgTemp = {
        init: svgContainer.querySelector('svg'), // init planuml svg is undefined
        rough: null,
      }
    }

    const handleButtonClick = (event: Event): void => {
      const button: HTMLElement | null = event.target ? (event.target as HTMLElement).closest('[data-control-btn]') : null
      if (!button || !diagram)
        return

      const actionMap: ActionMap = {
        'zoom-in': () => diagramController.zoomIn(),
        'zoom-out': () => diagramController.zoomOut(),
        'reset': () => diagramController.resetView(),
        'up': () => panDiagram(diagram, 'up'),
        'down': () => panDiagram(diagram, 'down'),
        'left': () => panDiagram(diagram, 'left'),
        'right': () => panDiagram(diagram, 'right'),
        'copy': () => copyToClipboard(button),
        'dialog': () => {
          setupModalHandler(`[${SelectorEnum.MODAL}]`, `<div data-controll-panel-container-modal>${container.innerHTML}</div>`, () => {
            diagramModal?._showModal()
            markdownItDiagramDom('[data-controll-panel-container-modal]')
          })
        },
        'rough': () => svgToRough(diagram, button, svgTemp),
      }

      const btnName: string | undefined = button.dataset.controlBtn as string
      const action: (() => void) | undefined = actionMap[btnName]
      if (action)
        action()
    }

    container.addEventListener('mouseenter', () => {
      const controlPanels: NodeListOf<Element> = container.querySelectorAll('[data-control-panel]')
      controlPanels.forEach((controlPanel) => {
        controlPanel.addEventListener('click', handleButtonClick)
      })
    })

    container.addEventListener('mouseleave', () => {
      const controlPanels: NodeListOf<Element> = container.querySelectorAll('[data-control-panel]')
      controlPanels.forEach((controlPanel) => {
        controlPanel.removeEventListener('click', handleButtonClick)
      })
    })
  })
}

export { markdownItDiagramDom }
