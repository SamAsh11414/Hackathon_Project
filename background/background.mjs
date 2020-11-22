import { Configurator, setConfigurator } from '../utils/configuration.mjs';
import { PREFS } from './prefs.js';

let db;

let dbreq = indexedDB.open('Infolog', 1);

dbreq.onsuccess       = e => db = e.target.result;
dbreq.onerror         = e => alert('error opening database ' + e.target.errorCode);
dbreq.onupgradeneeded = e => {
    db = e.target.result;
    let notations = db.createObjectStore('notations', { autoIncrement: true });
};

function displayNotes(notes) {
    console.log(notes)
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { type, data } = message;
    const tx = db.transaction(['notations'], 'readwrite');
    const store = tx.objectStore('notations');
    switch (type) {
        case 'saveNote':
            const notations = { text: data, timestamp: Date.now() };
            store.add(notations);
            tx.onerror    = e => sendResponse(e.target.errorCode);
            tx.oncomplete = () => sendResponse(notations);
            break;
        case 'deleteNote':
            // TODO delete notes by id; delete a specific note
            store.openCursor().onsuccess = function(event) {
                let cursor = event.target.result;

                if (cursor != null) {
                    var request = cursor.delete();
                    request.onsuccess = () => {
                        console.log('Deleted');
                        sendResponse(true);
                    }
                }
            }
            break;
        case 'getAllNotes':
            const tx = db.transaction(['notations'], 'readonly');
            const store = tx.objectStore('notations');
            const req = store.openCursor(null, reverseOrder ? 'prev' : 'next');
            const allNotes = [];
            req.onsuccess = function(event) {
                let cursor = event.target.result;
        
                if (cursor != null) {
                    allNotes.push(cursor.value)
                    cursor.continue();
                } else {
                    displayNotes(allNotes);
                }
            }
            req.onerror = function(event) {
                alert('error in cursor request' + event.target.errorCode);
            }

            break;
        case 'changeSetting':

            break;
    }
});

// TODO make sure stuff still works across browser restarts

// const maConfig = new Configurator('ma-config', PREFS);
// setConfigurator(maConfig);

let defaultIsEnabled = true;
const enabledOn = [];
const disabledOn = [];

function isExtensionEnabled(tabId) {
    let idList = enabledOn;
    if (defaultIsEnabled) idList = disabledOn;
    
    return idList.includes(tabId) || true;
}

// function onClicked(tab, onClickData) {
//     let idList = enabledOn;
//     if (defaultIsEnabled) idList = disabledOn;
    
//     const index = idList.findIndex(id => id === tab.id);

//     if (browserAction.isEnabled()) ;
//     else enable();
// }

// browser.browserAction.onClicked.addListener(onClicked);

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (isExtensionEnabled(tabId)) {
        console.log('injecting')
        browser.tabs.executeScript({
            allFrames: false,
            runAt: 'document_start',
            file: '/contentScripts/init.js',
            matchAboutBlank: false
        });
    }
});
