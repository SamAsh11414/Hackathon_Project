function getDocument(url) {
    console.log('loading url:', browser.runtime.getURL(url));

    return fetch(browser.runtime.getURL(url))
        .then(res => res.text())
        .then(text => (new DOMParser).parseFromString(text, 'text/html'));
}

class MASidebar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'closed' });
        getDocument('sidebar/sidebar.html').then(document => {
            const linkElem = document.createElement('link');
            linkElem.setAttribute('rel', 'stylesheet');
            linkElem.setAttribute('href', browser.runtime.getURL('Factcheck.css'));
            shadow.appendChild(linkElem);
            shadow.appendChild(document.body);

            const tabs = shadow.getElementById('tabs');
            tabs.addEventListener('click', e => {
                const tabId = e.target.dataset.tabId;
                if (tabId) {
                    this.switchToTab(tabId);
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
        console.log(tabId)
        for (const tabContent of this.tabContents.values()) {
            console.log(tabContent)
            tabContent.style.display = 'none';
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
            if (onLoad) onLoad(document, shadow);
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

class MAStickyNote extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const that = this;
        getDocument('ui/note/stickynote.html').then(document => {
            shadow.appendChild(document.body);
            // this.textarea = document.getElementById('note');
            // this.textarea.addEventListener('input', throttle(() => {
            //     runtime.sendMessage();
            // }, 200))
            console.log(document)

            let moving = false;
            window.addEventListener('mousedown', e => {
                // console.log('down')
                moving = true;
            });
            
            window.addEventListener('mousemove', e => {
                // console.log('move')
                that.move(e.pageX, e.pageY);
                if (moving === true) {
                }
            });

            window.addEventListener('mouseup', e => {
                // console.log('up')
                console.log(that)
                console.log(this)
                that.move(e.pageX, e.pageY);
                if (moving === true) {
                }
                moving = false;
            });

            
            that.move(0, 0);
            
            that.setAttribute('moveable', true);
        });
    }
    
    move(x, y) {
        console.log(x, y)
        this.style.position = 'fixed';
        this.style.left = x;
        this.style.top = y;
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
        const shadow = this.attachShadow({ mode: 'closed' });
        console.log('shadow was made')
        getDocument('Sidebar/sidebaropener.html').then(document => {
            shadow.appendChild(document.body);
            shadow.getElementId('sanity').addEventListener('click', e => {
                console.log('called click handler')
                if (this.sidebar.style.display === 'none') {
                    this.sidebar.display = 'unset';
                } else {
                    this.sidebar.display = 'none';
                }
            });
        });
    }    
}

window.customElements.define('ma-sidebar', MASidebar);
window.customElements.define('ma-note', MAStickyNote);
window.customElements.define('ma-popup', MAPopup);
window.customElements.define('ma-sidebar-opener', MASidebarOpener);

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

// searchSnopes(searchString)
// getTrueFalseValue(searchString)
// window.addEventListener('mousemove', e => {
//     if (window.getSelection()) {
//         const truthValue = 'true';
//         const popup = document.createElement('ma-popup');
//         popup.content = truthValue;
//     }
// });

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