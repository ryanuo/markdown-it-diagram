/**
 * Render controller for other frameworks
 * @param content
 * @returns string
 */
function renderOtherController(code: string, content: string) {
  return `
  <div class="details-controller">
  <button class="btn dialog" aria-label="Show details" data-clipboard-code="${code}">
    ${content}
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="octicon">
      <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 1.06L2.56 7h10.88l-2.22-2.22a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.22-2.22H2.56l2.22 2.22a.75.75 0 11-1.06 1.06l-3.5-3.5a.75.75 0 010-1.06l3.5-3.5z"></path>
    </svg>
  </button>
  <button class="btn copy" aria-label="Copy to clipboard">
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-copy js-clipboard-copy-icon">
      <path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path>
      <path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
    </svg>
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-check js-clipboard-check-icon color-fg-success m-2 fg-none">
      <path fill-rule="evenodd" fill="currentColor" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
    </svg>
  </button>
  </div>
`
}

/**
 * Render controller
 * @param content
 * @returns
 */
const controller = `<div class="viewer-control-panel">
<button class="btn zoom-in" aria-label="Zoom in">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-zoom-in"
    aria-hidden="true"
  >
    <path
      d="M3.75 7.5a.75.75 0 0 1 .75-.75h2.25V4.5a.75.75 0 0 1 1.5 0v2.25h2.25a.75.75 0 0 1 0 1.5H8.25v2.25a.75.75 0 0 1-1.5 0V8.25H4.5a.75.75 0 0 1-.75-.75Z"
    ></path>
    <path
      d="M7.5 0a7.5 7.5 0 0 1 5.807 12.247l2.473 2.473a.749.749 0 1 1-1.06 1.06l-2.473-2.473A7.5 7.5 0 1 1 7.5 0Zm-6 7.5a6 6 0 1 0 12 0 6 6 0 0 0-12 0Z"
    ></path>
  </svg>
</button>
<button class="btn zoom-out" aria-label="Zoom out">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-zoom-out"
    aria-hidden="true"
  >
    <path d="M4.5 6.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5Z"></path>
    <path
      d="M0 7.5a7.5 7.5 0 1 1 13.307 4.747l2.473 2.473a.749.749 0 1 1-1.06 1.06l-2.473-2.473A7.5 7.5 0 0 1 0 7.5Zm7.5-6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
    ></path>
  </svg>
</button>
<button class="btn reset" aria-label="Reset view">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-sync"
    aria-hidden="true"
  >
    <path
      d="M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.002 7.002 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.002 7.002 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z"
    ></path>
  </svg>
</button>
<button class="btn up" aria-label="Pan up">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-chevron-up"
    aria-hidden="true"
  >
    <path
      d="M3.22 10.53a.749.749 0 0 1 0-1.06l4.25-4.25a.749.749 0 0 1 1.06 0l4.25 4.25a.749.749 0 1 1-1.06 1.06L8 6.811 4.28 10.53a.749.749 0 0 1-1.06 0Z"
    ></path>
  </svg>
</button>
<button class="btn down" aria-label="Pan down">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-chevron-down"
    aria-hidden="true"
  >
    <path
      d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"
    ></path>
  </svg>
</button>
<button class="btn left" aria-label="Pan left">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-chevron-left"
    aria-hidden="true"
  >
    <path
      d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"
    ></path>
  </svg>
</button>
<button class="btn right" aria-label="Pan right">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-chevron-right"
    aria-hidden="true"
  >
    <path
      d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"
    ></path>
  </svg>
</button>
</div>`

/**
 * Get controller
 * @param code
 * @param img
 * @param selector
 * @returns html string
 */
export function getController(
  code: string,
  img: string,
) {
  return `
    <div class="controller-panel-container">
    ${img}
    ${controller}
    ${renderOtherController(
      code,
      `<div class="dialog__item fg-none">
        <div class="controller-panel-container">
          ${img}
          ${controller}
        </div>
      </div>
      `,
    )}
    </div>
  `
}
