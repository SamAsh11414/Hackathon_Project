class MAPopup extends MAFloating {
    constructor() {
        super('');
        this.setAttribute('moveable', false);
    }
}

window.customElements.define('ma-popup', MAPopup);
