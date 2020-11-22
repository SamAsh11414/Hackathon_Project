function getDocument(url) {
    console.log('loading url:', browser.runtime.getURL(url));

    return fetch(browser.runtime.getURL(url))
        .then(res => res.text())
        .then(text => (new DOMParser).parseFromString(text, 'text/html'));
}