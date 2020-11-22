function throttle(fn, milli) {
    let throttling = false;
    return fn;
}

// this assumes that fn will not modify args in anyway; fn is functional
function memorize(fn, thisVal) {
    const memorization = new Map();
    return (...args) => 
        memorization.get(args) || memorization.set(args, fn.apply(thisVal, args)).get(args);
}


function getText(url) {
    return fetch(browser.runtime.getURL(url)).then(res => res.text());
}

function genDocumentFrag(string) {
    const template = document.createElement('template');
    template.innerHTML = string;
    return template.content;
}

function getDocumentFrag(url) {
    return getText(url).then(genDocumentFrag);
}

const memGetDocumentFrag = memorize(getDocumentFrag, this);
const memGetText = memorize(getText, this);
const memGetStyle = memorize(text => genDocumentFrag('<style>' + text + '</style>'), this);

function setShadowHTML(shadow, htmlURL) {
    return memGetDocumentFrag(htmlURL).then(text => {
        shadow.appendChild(text); 
        return Promise.resolve(shadow);
    });
}

function setShadowCSS(shadow, cssURL) {
    return memGetText(cssURL).then(text => {
        shadow.appendChild(memGetStyle(text)); 
        return Promise.resolve(shadow);
    });
}

function setShadow(obj) {
    return setShadowHTML(obj.shadow, obj.html)
        .then(shadow => {
            setShadowCSS(shadow, obj.css);
            return Promise.resolve(shadow)
        });
}