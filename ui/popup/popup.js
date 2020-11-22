class MAPopup extends HTMLElement {
    constructor() {
        super('');
        this.setAttribute('moveable', false);
    }
}

window.customElements.define('ma-popup', MAPopup);
