function createStickyNote(ix, iy) {
    const stickyNote = document.createElement('div');
    stickyNote.style.top = iy;
    stickyNote.style.left = ix;

    setShadow({
        shadow: stickyNote.attachShadow({ mode: 'closed' }),
        html: 'ui/stickynote/stickynote.html',
        css: 'ui/stickynote/stickynote.css'
    }).then(shadow => {
        // dragging        
        let dragging = false;
        const offsets = { x: null, y: null };
        
        const dragBar = shadow.getElementById('dragBar');

        dragBar.addEventListener('mousedown', e => {
            dragging = true;
            offsets.x = e.offsetX;
            offsets.y = e.offsetY;
            e.preventDefault();
        });
        
        window.addEventListener('mousemove', e => {
            if (dragging === true) {
                const x = e.clientX - offsets.x;
                const y = e.clientY - offsets.y;
                stickyNote.style.position = 'fixed';
                stickyNote.style.left = x + 'px';
                stickyNote.style.top = y + 'px';
            }
        });

        window.addEventListener('mouseup', () => dragging = false);


        const messageId = Math.floor(Math.random()*Math.random()*1000000000000);

        browser.runtime.sendMessage({ type: 'saveNote', data: { message: '', messageId: messageId }})

        // autosave
        const textarea = shadow.getElementById('note');
        textarea.addEventListener('input', throttle(() => {
            browser.runtime.sendMessage({ type: 'saveNote', data: { message: textarea.value, messageId: messageId } });
        }, 500));
    });
    return stickyNote;
}


