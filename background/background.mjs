import { Configurator, setConfigurator } from '../utils/configuration.mjs';
import { PREFS } from './prefs.js';

let db;

let dbreq = indexedDB.open('Infolog', 1);

dbreq.onsuccess       = e => db = e.target.result;
dbreq.onerror         = e => alert('error opening database ' + e.target.errorCode);
dbreq.onupgradeneeded = e => {
    db = e.target.result;
    db.createObjectStore('notations', { autoIncrement: true });
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

// TODO make extension disable/enable on a site through the icon
// function onClicked(tab, onClickData) {
//     let idList = enabledOn;
//     if (defaultIsEnabled) idList = disabledOn;
    
//     const index = idList.findIndex(id => id === tab.id);

//     if (browserAction.isEnabled()) ;
//     else enable();
// }

// browser.browserAction.onClicked.addListener(onClicked);

const contentScripts = [
    '/utils/utils.js',
    '/utils/snopes.js',
    '/ui/sidebaropener/sidebaropener.js',
    '/ui/sidebar/sidebar.js',
    '/ui/stickynote/stickynote.js',
    '/ui/popup/popup.js',
    '/ui/init.js'
];
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.search('about') > -1 || !tab.url || tab.favIconUrl) return; 
    if (isExtensionEnabled(tabId) && changeInfo.status === 'loading') {
        console.log(tab)
        for (const path of contentScripts) {
            browser.tabs.executeScript(tabId, {
                allFrames: false,
                runAt: 'document_start',
                file: path,
                matchAboutBlank: false
            }).then(
                val => console.info(
                    '%cfile loaded: %c"%s", returned %o',
                    'font: 1.2em monospace;',
                    'font: 1.2em monospace; color: blue;',
                    path,
                    val
                ),
                error => {
                    console.info(
                        '%cfile failed: %c"%s", error:',
                        'font: 1.2em monospace;',
                        'font: 1.2em monospace; color: blue;',
                        path
                    );
                    console.error(error);
                }
            );
        }
    }
}, {
    properties: ['status']
});
