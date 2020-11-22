function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.style.display = 'none';

    setShadow({
        shadow: sidebar.attachShadow({ mode: 'closed' }),
        html: 'ui/sidebar/sidebar.html',
        css: 'ui/sidebar/sidebar.css'
    }).then(shadow => {
        const tabContents = new Map();
        for (const tab of shadow.getElementById('tabContents').children) {
            tabContents.set(tab.id, tab);
        }
        
        function switchToTab(tabId) {
            for (const tabContent of tabContents.values()) {
                tabContent.style.display = 'none';
            }
            tabContents.get(tabId).style.display = 'unset';
        }
        
        const tabs = shadow.getElementById('tabs');
        tabs.addEventListener('click', e => {
            const tabId = e.target.dataset.tabid;
            if (tabId) switchToTab(tabId);
        });

        switchToTab('notes');
    });
    return sidebar;
}
