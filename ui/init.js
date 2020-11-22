window.addEventListener('load', () => {
    try {
        console.log('the sidebar is being added');
        const sidebar = createSidebar();
        const sidebarOpener = createSidebarOpener(sidebar);
    
        document.body.appendChild(sidebar);
        document.body.appendChild(sidebarOpener);
    } catch (e) {
        console.dir(e);
    }
});

window.addEventListener('mouseup', e => {
    const selection = window.getSelection();
    const selectionString = selection.toString();
    console.log(selectionString);
    if (selectionString.length > 1) {
        getTrueFalseValue(selectionString).then(value => {
            const popup = createPopup(e.clientX, e.clientY, value);
            document.body.appendChild(popup);
            document.addEventListener('click', () => popup.remove(), { once: true });
        }, e => console.log(e));

        // const selObj = document.getSelection();
        // const oRange = selobj.getRangeAt(0);
        // const oRect = oRange.getBoundingClientRect();
        // const x2 = oRect.x + oRect.width
        // const x = (oRect.x + x2)/2;
        // const y = oRect.y;
        // console.log(window.getSelection());
    }
});
