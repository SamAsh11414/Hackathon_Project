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

// window.addEventListener('mousemove', e => {
//     if (window.getSelection()) {
//         const truthValue = 'true';
//         const popup = document.createElement('ma-popup');
//         popup.content = truthValue;
//     }
// });
