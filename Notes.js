let db;
let dbReq = indexedDB.open('Factcheck', 1);
dbReq.onupgradeneeded = function(event) {
  db = event.target.result;

  let notes = db.createObjectStore('notes', {autoIncrement: true});
}dbReq.onsuccess = function(event) {
  db = event.target.result;
}dbReq.onerror = function(event) {
  alert('error opening database ' + event.target.errorCode);
}