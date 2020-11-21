import { Configurator, setConfigurator } from 'utils/configuration.js';
import { PREFS } from 'prefs.js';

// TODO make sure stuff still works across browser restarts

const maConfig = new Configurator('ma-config', PREFS);
setConfigurator(maConfig);

let defaultIsEnabled = true;
const enabledOn = [];
const disabledOn = [];

function isExtentionEnabled(tabId) {
    if (defaultIsEnabled) {
        return disabledOn.includes(tabId) || true;
    }
    return enabledOn.includes(tabId) || true;
}

const browserAction = browser.browserAction;

function onClicked(tab, onClickData) {
    if(browserAction.isEnabled()) disable();
    else enable();
}

browserAction.onClicked.addListener(onClicked);

browser.tabs.executeScript({
    allFrames: false,
    runAt: 'document_start',
    file: 'contentScripts/init.js',
});

browser.tabs.executeScript({
    allFrames: false,
    runAt: 'document_end',
    file: 'contentScripts/uiShow.js',
});

browser.runtime.addListener(() => {
    
})