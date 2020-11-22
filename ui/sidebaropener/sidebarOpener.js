// TODO do a notificatoins thing, 
class MASidebarOpener extends HTMLElement {
    constructor() {
        super();
        console.log('aoeu')
        setShadow({
            shadow: this.attachShadow({ mode: 'closed' }),
            html: 'ui/sidebaropener/sidebaropener.html',
            css: 'ui/sidebaropener/sidebaropener.css'
        }).then(shadow => {
            console.log(shadow.getElementById('sanity'))
            shadow.getElementById('sanity').addEventListener('click', e => {
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
