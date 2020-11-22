function createStickyNote() {
    const div = document.createElement('div');
    div.move = function (x, y) {
        console.log(x, y)
        this.style.position = 'fixed';
        this.style.left = x;
        this.style.top = y;
    };
    setShadow({
        shadow: div.attachShadow({ mode: 'closed' }),
        html: 'ui/note/stickynote.html',
        css: 'ui/note/stickynote.css',
    }).then(shadow => {
        let moving = false;
        window.addEventListener('mousedown', e => {
            // console.log('down')
            moving = true;
        });
        
        window.addEventListener('mousemove', e => {
            // console.log('move')
            if (moving === true) {
                that.move(e.pageX, e.pageY);
            }
        });

        window.addEventListener('mouseup', e => {
            // console.log('up')
            if (moving === true) {
                div.move(e.pageX, e.pageY);
            }
            moving = false;
        });

        
        div.move(0, 0);
    });
    return div;
}
