function createSidebar() {
    const div = document.createElement('div');
    div.switchToTab = function (tabId) {
        console.log(tabId)
        for (const tabContent of this.tabContents.values()) {
            console.log(tabContent)
            tabContent.style.display = 'none';
        }
        this.tabContents.get(tabId).style.display = 'unset';
    }
    setShadow({
        shadow: div.attachShadow({ mode: 'closed' }),
        html: 'ui/sidebar/sidebar.html',
        css: 'ui/sidebar/sidebar.css'
    }).then(shadow => {
        const tabs = shadow.getElementById('tabs');
        tabs.addEventListener('click', e => {
            const tabId = e.target.dataset.tabId;
            if (tabId) {
                div.switchToTab(tabId);
            }
        });

        div.tabContents = new Map();
        for (const tabId of ['notes', 'factchecking', 'settings']) {
            div.tabContents.set(tabId, shadow.getElementById(tabId));
        }

        div.switchToTab('notes');
    });
    return div;
}
