function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.style.display = 'none';

    setShadow({
        shadow: sidebar.attachShadow({ mode: 'closed' }),
        html: 'ui/sidebar/sidebar.html',
        css: 'ui/sidebar/sidebar.css',

    }).then(shadow => {
        // tab switching
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

        // UI Color changer
        const allStuff = shadow.getElementById('Allstuff');
        const Button = shadow.getElementById('button');

        const backselect = shadow.getElementById('Backgroundcolor');
        backselect.addEventListener('input', () => {
            allStuff.style['background-color'] = backselect.value;
        });

        const Fselect = shadow.getElementById('Fcolor');
        Fselect.addEventListener('input', () => {
            allStuff.style.color = Fselect.value;
            Button.style ['color'] = Fselect.value;
        });
        
        // Display notes 
        function displayList() {
            browser.runtime.sendMessage({ type: 'getAllNotes' }).then(notes => {
                const notations = shadow.getElementById('notations');
                let listHTML = '<ul>';
                for (const note of notes) {
                    listHTML += '<li>' + note.text + '</li>';
                }
                notations.innerHTML = listHTML + '</ul>';
            
            });
        }

        displayList();

        browser.runtime.onMessage.addListener(() => displayList());

        // addingNotes
        const addNoteBtn = shadow.getElementById('addNote');
        addNoteBtn.addEventListener('click', () => {
            const stickynote = createStickyNote(200, 200);
            document.body.appendChild(stickynote);
        });
    });
    return sidebar;
}
