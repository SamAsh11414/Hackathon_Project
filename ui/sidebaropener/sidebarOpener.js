// TODO do a notificatoins thing, 
function createSidebarOpener(sidebar) {
    const div = document.createElement('div');
    setShadow({
        shadow: div.attachShadow({ mode: 'closed' }),
        html: 'ui/sidebaropener/sidebaropener.html',
        css: 'ui/sidebaropener/sidebaropener.css'
    }).then(shadow => {
        const button = shadow.getElementById('sanity');
        button.handleEvent = function(event) {
            console.log('called click handler')
            // if (this.sidebar.style.display === 'none') {
            //     this.sidebar.display = 'unset';
            // } else {
            //     this.sidebar.display = 'none';
            // }
        };
        button.addEventListener('click', button);
    });
    return div;
}
