class Modal extends HTMLElement {
  private _modal: HTMLElement | null | undefined
  private _title: string | null | undefined

  constructor() {
    super()
    this._modal = null
    this._title = ''

    // Create a shadow root that we can use for styling purposes
    // this.attachShadow({ mode: 'open' })
    this.innerHTML = `
      <style>
      /* The Modal (background) */
      .modal {
          display: none;
          position: fixed;
          z-index: 97;
          padding-top: 80px;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
      }

      .modal-mask{
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(7px);
          width: 100%;
          height: 100%;
          z-index: -1;
      }

      /* Modal Content */
      .modal-content {
          position: relative;
          background-color: #fefefe;
          margin: auto;
          padding: 0;
          border: 1px solid #888;
          width: 80%;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          -webkit-animation-name: animatetop;
          -webkit-animation-duration: 0.4s;
          animation-name: animatetop;
          animation-duration: 0.4s;
          border-radius: 5px;
      }

      /* Add Animation */
      @-webkit-keyframes animatetop {
          from {
              top: -300px;
              opacity: 0
          }

          to {
              top: 0;
              opacity: 1
          }
      }

      @keyframes animatetop {
          from {
              top: -300px;
              opacity: 0
          }

          to {
              top: 0;
              opacity: 1
          }
      }

      /* The Close Button */
      .close {
          color: #000000;
          float: right;
          font-size: 18px;
          font-weight: bold;
      }

      .close:hover,
      .close:focus {
          transform: scale(1.2);
          text-decoration: none;
          cursor: pointer;
      }

      .modal-header {
          padding: 2px 16px;
          background-color: #434e552e;
          color: #000000;
      }

      .modal-body {
          padding: 2px 16px;
          margin: 20px 2px
      }
  </style>
  <button>Open Modal</button>
  <div class="modal">
      <div class="modal-mask"></div>
      <div class="modal-content">
          <div class="modal-header">
              <span class="close">&times;</span>
              <slot name="header">
                  <h3>${this._title}</h3>
              </slot>
          </div>
          <div class="modal-body">
              <slot></slot>
          </div>
      </div>
  </div>`
  }

  connectedCallback() {
    this._modal = this!.querySelector('.modal') as HTMLElement
    this?.querySelector('button')?.addEventListener('click', this._showModal.bind(this))
    this?.querySelector('.close')?.addEventListener('click', this._hideModal.bind(this))
    this?.querySelector('.modal-mask')?.addEventListener('click', this._hideModal.bind(this))
  }

  disconnectedCallback() {
    this?.querySelector('button')?.removeEventListener('click', this._showModal)
    this?.querySelector('.close')?.removeEventListener('click', this._hideModal)
    this?.querySelector('.modal-mask')?.removeEventListener('click', this._hideModal)
  }

  public _showModal() {
    if (this._modal) {
      this._modal.style.display = 'block'
    }
  }

  public _hideModal() {
    if (this._modal) {
      this._modal.style.display = 'none'
      this._modal.querySelector('.modal-body')!.innerHTML = ''
    }
  }
}

customElements.define('pp-modal', Modal)
