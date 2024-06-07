import { type ActionMap, type PanDirection, SelectorEnum } from './types'
import './style.css'

const MarkdownItDiagramDomScript: () => void = function () {
  const containers: NodeListOf<Element> = document.querySelectorAll('[data-controll-panel-container]')
  containers.forEach((container: Element) => {
    const diagram: HTMLElement | null = container.querySelector(`.${SelectorEnum.IMG}`)
    if (!diagram) {
      console.warn('Cannot find diagram within container')
      return
    }

    let scale: number = 1

    function zoomIn(): void {
      scale *= 1.2
      applyScale()
    }

    function zoomOut(): void {
      scale /= 1.2
      if (scale < 0.1)
        scale = 0.1
      applyScale()
    }

    function resetView(): void {
      if (!diagram)
        return
      scale = 1
      diagram.style.transform = 'translate(0px, 0px) scale(1)'
    }

    function applyScale(): void {
      if (!diagram)
        return
      const currentTransform: string = diagram?.style.transform || 'translate(0px, 0px) scale(1)'
      const [translateStr] = currentTransform.split(' scale')
      diagram.style.transform = `${translateStr} scale(${scale})`
    }

    resetView()

    function panDiagram(direction: PanDirection): void {
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

    async function copyToClipboard(btn: HTMLElement): Promise<void> {
      try {
        const text: string = btn.getAttribute('data-clipboard-code') || ''
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text)
          const copyIcon = btn.querySelector('.octicon-copy')
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

    function handleButtonClick(event: Event): void {
      const button: HTMLElement | null = event.target ? (event.target as HTMLElement).closest('[data-control-btn]') : null
      if (!button)
        return

      const actionMap: ActionMap = {
        'zoom-in': zoomIn,
        'zoom-out': zoomOut,
        'reset': resetView,
        'up': () => panDiagram('up'),
        'down': () => panDiagram('down'),
        'left': () => panDiagram('left'),
        'right': () => panDiagram('right'),
        'copy': () => copyToClipboard(button),
        'dialog': () => {
          console.warn(event)
        },
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

export { MarkdownItDiagramDomScript }
