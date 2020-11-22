class MASidebar extends HTMLElement {
    constructor() {
        super();
        setShadow({
            shadow: this.attachShadow({ mode: 'closed' }),
            html: 'ui/sidebar/sidebar.html',
            css: 'ui/sidebar/sidebar.html'
        }).then(shadow => {
            const tabs = shadow.getElementById('tabs');
            tabs.addEventListener('click', e => {
                const tabId = e.target.dataset.tabId;
                if (tabId) {
                    this.switchToTab(tabId);
                }
            });
    
            this.tabContents = new Map();
            for (const tabId of ['notes', 'factchecking', 'settings']) {
                this.tabContents.set(tabId, shadow.getElementById(tabId));
            }

            this.switchToTab('notes');
        });
    }

    switchToTab(tabId) {
        console.log(tabId)
        for (const tabContent of this.tabContents.values()) {
            console.log(tabContent)
            tabContent.style.display = 'none';
        }
        this.tabContents.get(tabId).style.display = 'unset';
    }
}

window.customElements.define('ma-sidebar', MASidebar);
