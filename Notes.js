let db;

let dbReq = indexedDB.open('Factcheck', 1);
let reverseOrder;

dbReq.onupgradeneeded = function(event) {
    db = event.target.result;

    
    let notes = db.createObjectStore('notes', {autoIncrement: true});
};

dbReq.onsuccess = function(event) {
    db = event.target.result;
    getAndDisplayNotes(db);
};

dbReq.onerror = function(event) {
    alert('error opening database ' + event.target.errorCode);
};

function addStickyNote(db, message) {
    const tx = db.transaction(['notes'], 'readwrite');
    const tx2 = db.transaction(['notes'], 'readwrite');
    const store = tx.objectStore('notes');
    //const index = store.index('timestamp');
    const note = { text: message, timestamp: Date.now() };
    store.add(note);
    tx.oncomplete = function() { getAndDisplayNotes(db); }
    tx.onerror = function(event) {
        alert('error storing note ' + event.target.errorCode);
    }
}

function submitNote() {
    let message = document.getElementById('newmessage');
    addStickyNote(db, message.value);
    message.value = '';
}

function inReverseorder() {
    getAndDisplayNotes(db, false);
}

function notinReverseorder() {
    getAndDisplayNotes(db, true);
}

function Delete() {
    const tx = db.transaction(['notes'], 'readwrite');
    const store = tx.objectStore('notes');

    store.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;

        if (cursor != null) {
            var request = cursor.delete();
            request.onsuccess = function() {
                console.log('Deleted')
                getAndDisplayNotes(db);
            }
        } 
    }
}

function getAndDisplayNotes(db, reverseOrder) {
    const tx = db.transaction(['notes'], 'readonly');
    const store = tx.objectStore('notes');
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
}

function displayNotes(notes) {
    let listHTML = '<ul>';
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        listHTML += '<li>' + note.text + ' ' +
            new Date(note.timestamp).toString() + '</li>';
    }
    document.getElementById('notes').innerHTML = listHTML;
}

window.addEventListener('DOMContentLoaded', () => {
    const submitNoteBtn = document.getElementById('submitNote');
    submitNoteBtn.addEventListener('click', submitNote);

    const inReverseorderbtn = document.getElementById('inReverseorder');
    inReverseorderbtn.addEventListener('click', inReverseorder);

    const notinReverseorderbtn = document.getElementById('notinReverseorder');
    notinReverseorderbtn.addEventListener('click', notinReverseorder);

    const Deletebtn = document.getElementById('Delete');
    Deletebtn.addEventListener('click', Delete);
});
/*


// TODO : Quality of life stuff
if (!db.objectStoreNames.contains('notes'))
{
    notes = dbReq.transaction.objectStore('notes');
}
    else
{
    notes = dbReq.transaction.objectStore('notes');
}

    if (!notes.indexNames.contains('timestamp'))
    {
        notes.createIndex('timestamp', 'timestamp')
    }*/