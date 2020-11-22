function getText(url) {
    return fetch(browser.runtime.getURL(url)).then(res => res.text());
}

function setShadowHTML(shadow, htmlURL) {
    return getText(htmlURL).then(text => (shadow.innerHTML += text, Promise.resolve(shadow)));
}

function setShadowCSS(shadow, cssURL) {
    return getText(cssURL).then(text => (shadow.innerHTML += ('<style>' + text + '</style>'), Promise.resolve(shadow)));
}

function setShadow(obj) {
    return setShadowHTML(obj.shadow, obj.html)
        .then(shadow => (setShadowCSS(shadow, obj.css), Promise.resolve(shadow)));
}