import { icons, status_icons } from './icons' // 上面整理好的 icons 对象

const mainControllerKeys = ['zoom-in', 'zoom-out', 'reset', 'up', 'down', 'left', 'right'] as const
const otherControllerKeys = ['rough', 'dialog', 'copy', 'download'] as const

/** 主控制按钮 HTML */
const controller = mainControllerKeys.map(key =>
  `<button data-control-btn="${key}" aria-label="${key.replace(/-/g, ' ')}">${icons[key]}</button>`,
).join('')

/** 渲染其他控制按钮 */
function renderOtherController(code: string) {
  return `<div data-control-panel="details">
    ${otherControllerKeys.map((key) => {
    if (key === 'copy') {
      return `<button data-clipboard-code="${code}" data-control-btn="copy" aria-label="Copy to clipboard">
          ${icons.copy}${status_icons['copy-checked']}
        </button>`
    }

    if (key === 'rough') {
      return `<button class="fg-none" data-control-btn="rough" aria-label="rough to svg">
          ${icons.rough}${status_icons.loading}${status_icons['rough-checked']}
        </button>`
    }

    return `<button data-control-btn="${key}" aria-label="${key.replace(/-/g, ' ')}">${icons[key]}</button>`
  }).join('')}
  </div>`
}

/** 获取完整控制面板 */
export function getController(code: string, img: string) {
  return `
  <div data-control-panel-container>
    ${img}
    <div data-control-panel="view">
      ${controller}
    </div>
    ${renderOtherController(code)}
  </div>`
}
