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

const disabledon = []

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

