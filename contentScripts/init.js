class MASidebar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: close });
        shadow.appendChild(getDocument('sidebar/sidebar.html').body);
    }


}

class MAFloating extends HTMLElement {
    constructor(floatingContentURL) {
        super();
        const shadow = this.attachShadow({ mode: close });
        shadow.appendChild(getDocument(floatingContentURL).body);
    }
}

class MAPopup extends MAFloating {
    constructor() {
        super('');
    }
}

class MANote extends MAFloating {
    constructor() {
        super('');
    }
}

// TODO do a notificatoins thing, 
class MASidebarOpener {
    constructor() {

    }
}

window.customElements.define('ma-sidebar', MASidebar);
window.customElements.define('ma-note', MANote);
window.customElements.define('ma-popup', MAPopup);

window.addEventListener('DOMContentLoaded', () => {
    
});

runtime