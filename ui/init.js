window.addEventListener('load', () => {
    try {
        console.log('the sidebar is being added');
        const sidebar = createSidebar();
        const sidebarOpener = createSidebarOpener(sidebar);
        const stickynote = createStickyNote();
    
        document.body.appendChild(sidebar);
        document.body.appendChild(sidebarOpener);
        document.body.appendChild(stickynote);
    } catch (e) {
        console.dir(e);
    }
});

window.addEventListener('mousemove', e => {
    if (window.getSelection()) {
        const truthValue = 'true';
        const selObj = document.getSelection();
        const oRange = selobj.getRangeAt(0);
        const oRect = oRange.getBoundingClientRect();
        const x2 = oRect.x + oRect.width
        const x = (oRect.x + x2)/2;
        const y = oRect.y;
        const popup = createPopup(x, y);
        popup.content = truthValue;
    }
});
