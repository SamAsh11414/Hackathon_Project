function getDocument(url) {
    console.log('loading url:', runtime.getURL(url));

    return fetch(runtime.getURL(url))
        .then(res => res.text())
        .then(text => (new DOMParser).parseFromString(text));
}

class MASidebar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'closed' });
        getDocument('sidebar/sidebar.html').then(document => {
            shadow.appendChild(document.body);

            const tabs = shadow.getElementById('tabs');
            tabs.addEventListener('click', e => {
                if (e.target instanceof HTMLButtonElement) {
                    this.switchToTab(e.target.dataset.tabId);
                }
            });
    
            this.tabContents = new Map();
            for (const tabId of ['notes', 'factchecking', 'settings']) {
                this.tabContents.set(tabId, shadow.getElementById(tabId));
            }

            this.switchToTab('notes');
        });
    }

    switchToTab(tabId) {
        for (const tabContents of this.tabContents.values()) {
            tabContents.style.display = 'none';
        }
        this.tabContents.get(tabId).style.display = 'unset';
    }
}

class MAFloating extends HTMLElement {
    constructor(floatingContentURL, onLoad) {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        getDocument(floatingContentURL).then(document => {
            shadow.appendChild(document.body);
            if (onLoad) onLoad(document);
        });
    }

    

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'moveable') {
            if (newValue === 'true') {
                // TODO
            } else if (newValue === 'false') {
                // TODO
            }
        }
    }
}

class MAPopup extends MAFloating {
    constructor() {
        super('');
        this.setAttribute('moveable', false);
    }
}

class MANote extends MAFloating {
    constructor() {
        super('ui/note/sticknote.html', document => {
            this.textarea = document.getElementById('note');
            this.textarea.addEventListener('input', throttle(() => {
                runtime.sendMessage();
            }, 200))
            this.setAttribute('moveable', true);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text') {
            this.textarea.value = newValue;
        }
    }
}

// TODO do a notificatoins thing, 
class MASidebarOpener extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        console.log('shadow was made')
        getDocument('Sidebar/sidebaropener.html').then(document => {
            this.appendChild(document.body);
            this.addEventListener('click', () => {
                console.log('called click handler')
                if(this.sidebar.style.display === 'none') {
                    this.sidebar.display = 'unset';
                } else {
                    this.sidebar.display = 'none';
                }
            });
        });
    }    
}

window.customElements.define('ma-sidebar', MASidebar);
window.customElements.define('ma-note', MANote);
window.customElements.define('ma-popup', MAPopup);
window.customElements.define('ma-sidebar-opener', MASidebarOpener);

window.addEventListener('load', () => {
    console.log('the sidebar is being added');
    const sidebar = document.createElement('ma-sidebar');
    const sidebarOpener = document.createElement('ma-sidebar-opener');
    sidebar.style.display = 'none';
    sidebarOpener.sidebar = sidebar;

    document.body.appendChild(sidebar);
    document.body.appendChild(sidebarOpener);
});

window.getDocument = getDocument;

// runtime.connect()

// function getAndDisplayNotes(db, reverseOrder) {
//     const tx = db.transaction(['notes'], 'readonly');
//     const store = tx.objectStore('notes');
//     const req = store.openCursor(null, reverseOrder ? 'prev' : 'next');
//     const allNotes = [];
//     req.onsuccess = function(event) {
//         let cursor = event.target.result;

//         if (cursor != null) {
//             allNotes.push(cursor.value)
//             cursor.continue();
//         } else {
//             displayNotes(allNotes);
//         }
//     }
//     req.onerror = function(event) {
//         alert('error in cursor request' + event.target.errorCode);
//     }
// }
// function displayNotes(notes) {
//     let listHTML = '<ul>';
//     for (let i = 0; i < notes.length; i++) {
//         let note = notes[i];
//         listHTML += '<li>' + note.text + ' ' +
//             new Date(note.timestamp).toString() + '</li>';
//     }
//     document.getElementById('notes').innerHTML = listHTML;
// }