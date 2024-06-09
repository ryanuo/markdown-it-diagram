import { SelectorEnum } from './types'

export class DiagarmModal {
  readonly _modal: HTMLElement | null
  private _title: string
  private _selector: string

  constructor(selector: string = SelectorEnum.MODAL, title: string = '') {
    this._modal = null
    this._title = title
    this._selector = selector

    // Create the modal structure
    const modalWrapper = document.createElement('div')
    modalWrapper.setAttribute(this._selector, '')
    modalWrapper.innerHTML = `
        <div class="modal-mask"></div>
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h3>${this._title}</h3>
            </div>
            <div class="modal-body"></div>
        </div>`

    document.body.insertAdjacentElement('beforeend', modalWrapper)
    this._modal = modalWrapper
    // Bind event listeners
    this.connectedCallback()
  }

  public _showModal() {
    if (this._modal) {
      this._modal.style.display = 'flex'
    }
  }

  public _hideModal() {
    if (this._modal) {
      this._modal.style.display = 'none'
      const modalBody = this._modal.querySelector('.modal-body')
      if (modalBody)
        modalBody.innerHTML = ''
    }
  }

  private connectedCallback() {
    // Implement connectedCallback to add event listeners
    this._modal!.querySelector('.close')?.addEventListener('click', this._hideModal.bind(this))
    this._modal!.querySelector('.modal-mask')?.addEventListener('click', this._hideModal.bind(this))
  }
}
