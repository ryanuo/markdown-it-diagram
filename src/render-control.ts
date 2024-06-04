import type { Framework } from './types'

/**
 * Render controller for other frameworks
 * @param content
 * @returns string
 */
function renderOtherController(content: string) {
  return `
  <div class="details-controller">
  <button class="btn dialog" aria-label="Show details">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="octicon">
      <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 1.06L2.56 7h10.88l-2.22-2.22a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.22-2.22H2.56l2.22 2.22a.75.75 0 11-1.06 1.06l-3.5-3.5a.75.75 0 010-1.06l3.5-3.5z"></path>
    </svg>
    ${content}
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
  selector: string,
  framework: Framework,
) {
  const tag_map = {
    vue: 'component',
    react: 'script',
  }

  return `
    <style>
      :root {
        --color-btn-text: #24292f;
        --color-btn-bg: #f6f8fa;
        --color-btn-border: rgba(27,31,36,0.15);
        --color-btn-shadow: 0 1px 0 rgba(27,31,36,0.04);
        --color-btn-inset-shadow: inset 0 1px 0 rgba(255,255,255,0.25);
        --color-btn-hover-bg: #f3f4f6;
        --color-btn-hover-border: rgba(27,31,36,0.15);
        --color-btn-focus-border: rgba(27,31,36,0.15);
        --color-btn-focus-shadow: 0 0 0 2px #abadaf4d;
      }
      #diagram-dialog-container{
        position: fixed;
        top: 30%;
        left: calc(50% - 30vw);
        margin: 0 auto;
        z-index: 100;
        width: 60vw;
        justify-content: center;
        align-items: center;
        background-color: var(--color-btn-bg);
        display: none;
      }
      .controller-panel-container {
        z-index: 20;
        position: relative;
        overflow: hidden;
      }
      .controller-panel-container .fg-none{
        display: none;
      }
      .fg-show{
         display: flex !important;
      }
      .controller-panel-container .color-fg-success{
        color: #1a7f37;
      }
      .controller-panel-container .dialog-container{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .viewer-control-panel {
        position: absolute;
        bottom: 1em;
        right: 1em;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 0.2em;
      }
      .details-controller{
        position: absolute;
        top: 1em;
        right: 1em;
        display: flex;
        gap: 0.2em;
      }
      .viewer-control-panel .btn,
      .details-controller .btn {
        color: var(--color-btn-text);
        background-color: var(--color-btn-bg);
        box-shadow: var(--color-btn-shadow), var(--color-btn-inset-shadow);
        transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
        transition-property: color, background-color, border-color;        
        position: relative;
        display: inline-block;
        padding: 5px 7px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        border: 1px solid;
        border-color: var(--color-btn-border);
        border-radius: 6px;
        appearance: none;
       }
       .viewer-control-panel .btn:hover,
       .details-controller .btn:hover {
        background-color: var(--color-btn-hover-bg);
        border-color: var(--color-btn-hover-border);
        transition-duration: 0.1s;
       }
       .viewer-control-panel .btn:focus {
        border-color: var(--color-btn-focus-border);
        outline: none;
        box-shadow: var(--color-btn-focus-shadow);
       }
       .details-controller .btn:focus{
        outline: none;
       }
      .viewer-control-panel button {
        padding: 5px 7px;
      }
      .viewer-control-panel .zoom-in {
        grid-column: 3;
        grid-row: 1;
      }
      .viewer-control-panel .zoom-out {
        grid-column: 3;
        grid-row: 3;
      }
      .viewer-control-panel .reset {
        grid-column: 2;
        grid-row: 2;
      }
      .viewer-control-panel .up {
        grid-column: 2;
        grid-row: 1;
      }
      .viewer-control-panel .down {
        grid-column: 2;
        grid-row: 3;
      }
      .viewer-control-panel .left {
        grid-column: 1;
        grid-row: 2;
      }
      .viewer-control-panel .right {
        grid-column: 3;
        grid-row: 2;
      } 
    </style>
    <div class="controller-panel-container">
    ${img}
    ${controller}
    ${renderOtherController(
      `<div class="dialog__item fg-none">
        <div class="controller-panel-container">
          ${img}
          ${controller}
        </div>
      </div>
      `,
    )}
    </div>
    <${tag_map[framework]} is="script">
    var render_ = function(){
      function insertAtBodyStart(targetsName) {
        const body = document.body;
        const existingElement = document.querySelector(targetsName);
    
        if (!existingElement) {
            const newElement = document.createElement('div');
            newElement.id = targetsName.replace(/#/, '');;
            body.insertBefore(newElement, body.firstChild);
        }
      }
      insertAtBodyStart('#diagram-dialog-container');
      
      const containers = document.querySelectorAll('.controller-panel-container');
      containers.forEach(function(container) {
        const diagram = container.querySelector('${selector}');
  
        if (!diagram) {
          console.warn('Cannot find diagram within container');
          return;
        }
  
        let scale = 1;

        function zoomIn() {
          scale *= 1.2;
          applyScale();
        }
        
        function zoomOut() {
          scale /= 1.2;
          if (scale < 0.1) scale = 0.1;
          applyScale();
        }
        
        function resetView() {
          scale = 1;
          diagram.style.transform = 'translate(0px, 0px) scale(1)';
        }
        
        function applyScale() {
          const currentTransform = diagram.style.transform || 'translate(0px, 0px) scale(1)';
          let [translateStr] = currentTransform.split(' scale');
          diagram.style.transform = translateStr +' scale(' + scale + ')';
        }

        resetView();
  
        function panDiagram(direction) {
          const currentTransform = diagram.style.transform || 'translate(0px, 0px) scale(1)';
          let [translateStr, scaleStr] = currentTransform.split(' scale');
          translateStr = translateStr.trim();
          scaleStr = scaleStr ? ' scale' + scaleStr.trim() + '' : '';
        
          var transformValues = translateStr.replace('translate(', '').replace(')', '').split(',');
          var x = parseInt(transformValues[0].trim());
          var y = parseInt(transformValues[1].trim());

          switch (direction) {
            case 'up':
              y -= 20;
              break;
            case 'down':
              y += 20;
              break;
            case 'left':
              x -= 20;
              break;
            case 'right':
              x += 20;
              break;
          }
        
          diagram.style.transform = 'translate(' + x + 'px, ' + y + 'px)' + scaleStr;
        }
        
        async function copyToClipboard(text,btn) {
          try {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                  await navigator.clipboard.writeText(text);
                  btn.querySelector('.octicon-copy').classList.add('fg-none');
                  btn.querySelector('.octicon-check').classList.remove('fg-none');
                  setTimeout(() => {
                    btn.querySelector('.octicon-copy').classList.remove('fg-none');
                    btn.querySelector('.octicon-check').classList.add('fg-none');
                  }, 1000);
              } else {
                  console.log('The Current Environment Does Not Support Clipboard API');
              }
          } catch (err) {
              console.error('Failed To Copy To Clipboard:', err);
          }
        }
        function handleButtonClick(event) {
          const button = event.target.closest('.btn');
          if (!button) return;
      
          const actionMap = {
              'zoom-in': zoomIn,
              'zoom-out': zoomOut,
              'reset': resetView,
              'up': () => panDiagram('up'),
              'down': () => panDiagram('down'),
              'left': () => panDiagram('left'),
              'right': () => panDiagram('right'),
              'copy': () => copyToClipboard('${code}',button),
              'dialog': () => {
                console.log(event);
              }
          };
      
          const className = button.classList[1];
          const action = actionMap[className];
          if (typeof action === 'function') {
              action();
          }
        }
      
        container.addEventListener('mouseenter', function() {
          const controlPanel = container.querySelector('.viewer-control-panel');
          const detailsPanel = container.querySelector('.details-controller');
          if (controlPanel) {
            controlPanel.addEventListener('click', handleButtonClick);
          }
          if (detailsPanel) {
            detailsPanel.addEventListener('click', handleButtonClick);
          }
        });
  
        container.addEventListener('mouseleave', function() {
          const controlPanel = container.querySelector('.viewer-control-panel');
          const detailsPanel = container.querySelector('.details-controller');
          if (controlPanel) {
            controlPanel.removeEventListener('click', handleButtonClick);
          }
          if (detailsPanel) {
            detailsPanel.removeEventListener('click', handleButtonClick);
          }
        });
      });
    };

    render_();
    </${tag_map[framework]}>
  `
}
