class MASidebarOpener extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'closed' });
        console.log('shadow was made')
        getDocument('Sidebar/sidebaropener.html').then(document => {
            shadow.appendChild(document.body);
            shadow.getElementId('sanity').addEventListener('click', e => {
                console.log('called click handler')
                if (this.sidebar.style.display === 'none') {
                    this.sidebar.display = 'unset';
                } else {
                    this.sidebar.display = 'none';
                }
            });
        });
    }    
}

window.customElements.define('ma-sidebar-opener', MASidebarOpener);
