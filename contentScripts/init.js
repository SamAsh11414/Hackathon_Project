function getDocument(url) {
    return fetch(runtime.getURL(url))
        .then(res => res.text())
        .then(text => (new DOMParser).parseFromString(text));
}

class MASidebar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'close' });
        getDocument('sidebar/sidebar.html').then(document => {
            shadow.appendChild(document.body);

            const tabs = shadow.getElementById('tabs')
            tabs.addEventListener('click', e => {
                if (e.target instanceof HTMLButtonElement) {
                    switchToTab(e.target.dataset.tabId);
                }
            });
    
            this.tabContents = new Map();
            for (const tabId of ['notes', 'factchecking', 'settings']) {
                this.tabContents.set(tabId, shadow.querySelector(tabId));
            }

            this.switchToTab('notes');
        });
    }

    switchToTab(tabId) {
        for (const tabContents of this.tabContents.values()) {
            tabContents.style.display = 'none'
        }
        this.tabContents.get(tabId).style.display = 'unset';
    }
}

class MAFloating extends HTMLElement {
    constructor(floatingContentURL) {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        getDocument(floatingContentURL).then(document => {
            shadow.appendChild(document.body);
        });
    }

    

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'moveable') {
            if (newValue === 'true') {
                // TODO
            } else if (newValue === 'false') {
                // TODO
            }
        }
    }
}

class MAPopup extends MAFloating {
    constructor() {
        super('');
        this.setAttribute('moveable', false);
    }
}

class MANote extends MAFloating {
    constructor() {
        super('ui/note/sticknote.html');
        this.setAttribute('moveable', true);
    }

    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text') {
            this.
        }
    }
}

// TODO do a notificatoins thing, 
class MASidebarOpener {
    constructor() {

    }
}

window.customElements.define('ma-sidebar', MASidebar);
window.cusomElements.define('ma-note', MANote);
window.customElements.define('ma-popup', MAPopup);

window.addEventListener('DOMContentLoaded', () => {
    
});

runtime