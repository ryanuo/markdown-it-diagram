import { Svg2Roughjs } from 'svg2roughjs'
import type { PanzoomObject } from '@panzoom/panzoom'
import Panzoom from '@panzoom/panzoom'
import type { ActionMap, ContainterSelector, PanDirection } from './types'
import { SelectorEnum } from './types'
import { DiagarmModal } from './modal'
import { css } from './style'

export function injectStyle(styleId: string): void {
  // Check if the style tag with the specified ID already exists
  if (!document.getElementById(styleId)) {
    // Create a new style element
    const styleElement = document.createElement('style')
    styleElement.id = styleId
    styleElement.textContent = css

    // Append the style element to the document head
    document.head.appendChild(styleElement)

    console.warn(`Style with ID '${styleId}' injected successfully.`)
  }
  else {
    console.warn(`Style with ID '${styleId}' already exists.`)
  }
}

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
function panDiagram(panzoom: PanzoomObject | null, direction: PanDirection): void {
  if (!panzoom)
    return

  const panValues: { [key in PanDirection]: [number, number] } = {
    up: [0, -20],
    down: [0, 20],
    left: [-20, 0],
    right: [20, 0],
  }

  const [x, y] = panValues[direction]
  panzoom.pan(x, y, { relative: true, animate: true })
}

/**
 *
 * @param diagram
 * @param svgTemp
 * @param callback
 * @returns
 */
async function replaceImageWithSvg(diagram: HTMLElement, svgTemp: any, callback: () => void): Promise<void> {
  const imgEle = diagram.querySelector<HTMLImageElement>('img')
  if (!imgEle) {
    console.error('No image element found in the diagram.')
    return
  }

  const svgUrl = imgEle.getAttribute('src')
  if (!svgUrl) {
    console.error('No src attribute found on the image element.')
    return
  }

  const width = imgEle.width
  const height = imgEle.height

  try {
    const response = await fetch(svgUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const svgText = await response.text()
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
    const svgElement = svgDoc.documentElement

    svgElement.setAttribute('width', `${width}px`)
    svgElement.setAttribute('height', `${height}px`)
    svgElement.style.width = `${width}px`
    svgElement.style.height = `${height}px`

    svgTemp.init = svgElement
    if (callback)
      callback()
  }
  catch (error) {
    console.error('Error fetching and parsing SVG:', error)
  }
}

/**
 * svg diagram to rough diagram
 * @param diagram diagram container
 * @param svgTemp svg temp dom
 * @param btn button control panel
 */
async function svgToRough(diagram: HTMLElement | null, btn: HTMLElement, svgTemp: any): Promise<void> {
  if (!diagram)
    return

  const currentIdentifier = diagram.getAttribute('data-svg')
  const btnSelectors = btn.querySelectorAll('svg')
  const loadingIcon = btn.querySelector('.octicon-loading')
  const checkIcon = btn.querySelector('.octicon-check')
  const initIcon = btn.querySelector('.octicon-init')

  btnSelectors.forEach((btnSelector) => {
    btnSelector.classList.toggle('fg-none', !btnSelector.classList.contains('octicon-loading'))
  })

  const callback = async () => {
    if (svgTemp.rough) {
      diagram.replaceChildren(svgTemp.init)
      svgTemp.rough = null
      loadingIcon?.classList.add('fg-none')
      checkIcon?.classList.add('fg-none')
      initIcon?.classList.remove('fg-none')
    }
    else {
      const svg2roughjs = new Svg2Roughjs(diagram as unknown as SVGSVGElement)
      svg2roughjs.svg = svgTemp.init
      try {
        const res = await svg2roughjs.sketch()
        diagram.replaceChildren(res as Node)
        svgTemp.rough = res
      }
      finally {
        loadingIcon?.classList.add('fg-none')
        checkIcon?.classList.remove('fg-none')
        initIcon?.classList.add('fg-none')
      }
    }
  }

  if (currentIdentifier === SelectorEnum.PLANTUML && !svgTemp.init) {
    return replaceImageWithSvg(diagram, svgTemp, callback)
  }

  await callback()
}

/**
 * @param selector
 * [data-controll-panel-container-modal] | [data-controll-panel-container]
 */
const markdownItDiagramDom: (selector?: ContainterSelector) => void = function (selector = '[data-controll-panel-container]') {
  const containers: NodeListOf<Element> = document.querySelectorAll(selector)
  // inject style css
  injectStyle('diagram-css-unique')

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

    const svgContainer = container.querySelector('[data-svg]')
    let svgTemp = null
    if (svgContainer) {
      container.querySelector('[data-control-btn="rough"]')?.classList.remove('fg-none')
      svgTemp = {
        init: svgContainer.querySelector('svg'), // init planuml svg is undefined
        rough: null,
      }
    }

    const panzoom = Panzoom(diagram)
    const parent = diagram.parentElement as HTMLElement
    // This demo binds to shift + wheel
    parent.addEventListener('wheel', (event) => {
      if (!event.shiftKey)
        return
      panzoom.zoomWithWheel(event)
    })

    const handleButtonClick = (event: Event): void => {
      const button: HTMLElement | null = event.target ? (event.target as HTMLElement).closest('[data-control-btn]') : null
      if (!button || !diagram)
        return

      const actionMap: ActionMap = {
        'zoom-in': () => panzoom.zoomIn(),
        'zoom-out': () => panzoom.zoomOut(),
        'reset': () => panzoom.reset(),
        'up': () => panDiagram(panzoom, 'up'),
        'down': () => panDiagram(panzoom, 'down'),
        'left': () => panDiagram(panzoom, 'left'),
        'right': () => panDiagram(panzoom, 'right'),
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
