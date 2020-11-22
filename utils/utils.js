function getText(url) {
    console.log('loading url:', browser.runtime.getURL(url));
    return fetch(browser.runtime.getURL(url)).then(res => res.text());
}
