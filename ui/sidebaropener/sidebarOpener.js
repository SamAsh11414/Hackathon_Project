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
            if (sidebar.style.display === 'none') {
                sidebar.style.display = 'unset';
            } else {
                sidebar.style.display = 'none';
            }
        };
        button.addEventListener('click', button);
    });
    return div;
}
