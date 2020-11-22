function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.switchToTab = function (tabId) {
        console.log(tabId)
        for (const tabContent of this.tabContents.values()) {
            console.log(tabContent)
            tabContent.style.display = 'none';
        }
        this.tabContents.get(tabId).style.display = 'unset';
    }
    // sidebar.style.display = 'none';
    setShadow({
        shadow: sidebar.attachShadow({ mode: 'closed' }),
        html: 'ui/sidebar/sidebar.html',
        css: 'ui/sidebar/sidebar.css'
    }).then(shadow => {
        const tabs = shadow.getElementById('tabs');
        tabs.addEventListener('click', e => {
            const tabId = e.target.dataset.tabid;
            if (tabId) {
                sidebar.switchToTab(tabId);
            }
        });

        sidebar.tabContents = new Map();
        for (const tabId of ['notes', 'facts', 'factchecking', 'settings']) {
            sidebar.tabContents.set(tabId, shadow.getElementById(tabId));
        }

        sidebar.switchToTab('notes');
    });
    return sidebar;
}
