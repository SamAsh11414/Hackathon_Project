// TODO do a notificatoins thing, 

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
window.addEventListener('mousemove', e => {
    if (window.getSelection()) {
        const truthValue = 'true';
        const popup = document.createElement('ma-popup');
        popup.content = truthValue;
    }
});

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