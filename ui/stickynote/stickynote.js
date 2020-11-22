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

window.customElements.define('ma-sticky-note', MAStickyNote);
