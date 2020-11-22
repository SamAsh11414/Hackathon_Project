function createStickyNote() {
    const stickyNote = document.createElement('div');

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

        // autosave
        const textarea = shadow.getElementById('notes');
        
        textarea.addEventListener('input', () => {
            console.log('aoeusth')
            runtime.sendMessage({ type: 'saveNote', data: textarea.value });
        });
    });
    return stickyNote;
}
