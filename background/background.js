// When the 

const browserAction = browser.browserAction;

function enable() {
    browserAction.enable();

}

function disable() {
    browserAction.disable();

}

function onClicked(tab, onClickData) {
    if(browserAction.isEnabled()) disable();
    else enable();
}

browserAction.onClicked.addListener(onClicked);

function injectCode() {

}

browser.