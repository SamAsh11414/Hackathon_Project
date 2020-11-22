function createPopup(x, y, content) {
    const popup = document.createElement('div');
    popup.style.top = y + popup.offsetHeight + 'px';
    popup.style.left = x + 'px';
    
    setShadow({
        shadow: popup.attachShadow({ mode: 'closed' }),
        html: 'ui/popup/popup.html',
        css: 'ui/popup/popup.css'
    }).then(shadow => {
        const contentElem = shadow.getElementById('content');
        contentElem.innerHTML = content;
    });
    
    return popup;
}
