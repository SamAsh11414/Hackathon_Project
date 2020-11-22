window.addEventListener('load', () => {
    console.log('the sidebar is being added');
    // const sidebar = document.createElement('ma-sidebar');
    // const sidebarOpener = document.createElement('ma-sidebar-opener');
    const stickynote = document.createElement('ma-note');
    // sidebar.style.display = 'none';
    // sidebarOpener.sidebar = sidebar;

    // document.body.appendChild(sidebar);
    // document.body.appendChild(sidebarOpener);
    document.body.appendChild(stickynote);
});

// window.addEventListener('mousemove', e => {
//     if (window.getSelection()) {
//         const truthValue = 'true';
//         const popup = document.createElement('ma-popup');
//         popup.content = truthValue;
//     }
// });
