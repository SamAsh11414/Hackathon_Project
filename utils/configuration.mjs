import { Observable } from './observable';

const CONFIGURATION_API_VERSION = 1;
let currentConfigurator = null;

export let getPref = null;
export let setPref = null;
export let ifPref = null;
export let getPrefObservable = null;

export function setConfigurator(configurator) {
    currentConfigurator = configurator;
    getPref = configurator.getPref;
    setPref = configurator.setPref;
}

export class Configurator {
    static async Exists(pref, ifFunc, elseFunc) {
        const prefValue = await this.getPref(pref);
        if (prefValue) ifFunc(pref, prefValue);
        else elseFunc(pref); 
    }

    constructor(namespace, defaultPrefs, options) {
        this._namespace = namespace;
        this._options = options;
        this._observables = new Map();
        this._defaultPrefs = defaultPrefs;
        this._broadcastChannel = new BroadcastChannel('configurator-' + namespace);
        broadcastChannel.onmessage = message => {
            if (message.type = 'prefUpdate') {
                this._observables.get(message.pref)?.broadcast({
                    pref: message.pref,
                    newVal: message.newValue
                });
            }
        };

        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this._namespace, CONFIGURATION_API_VERSION);
            request.onsuccess = e => {
                this._database = e.target.result;
                resolve(this);
            };
            request.onerror = e => reject();
            request.onblocked = e => reject();
            request.onupgradeneeded = e => {
                const database = e.target.result;
                this._prefsStore = database.createObjectStore('prefs');
                for (const pref in this._defaultPrefs) {
                    this._prefsStore.add(this._defaultPrefs[pref], pref);
                }
            };
        });
    }

    close() {
        this._broadcastChannel.close();
        this._database.close();
    };

    setPref(pref, newVal) {
        return new Promise((resolve, reject) => {
            this._database.trans;
            this._observables.get(pref)?.broadcast({ pref: pref, newVal: newVal });
        });
    }

    getPref(pref) {
        return new Promise((resolve, reject) => {
            const objectStoreRequest = this._prefsStore.get(pref);
            objectStoreRequest.onsuccess = () => resolve(objectStoreRequest.result);
            objectStoreRequest.onerror = () => reject(objectStoreRequest.error);
        });
    }

    getPrefObserver(pref) {
        const observable = this._observables.get(pref)?.observable;
        if (observable) return observable;

        const [newObservable, broadcast] = new Observable();
        observable.set(pref, { observable: newObservable, broadcast: broadcast });
        return newObservable;
    }

    ifPref(func, ...args) {
        func.call(this, ...args);
    }
}
