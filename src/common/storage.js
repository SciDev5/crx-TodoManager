// @ts-check
/// <reference path="../../refrences/chrome.intellisense.js" />

/** @typedef {{newValue:any,oldValue:any}} StorageChange */
/** @typedef {{[key: string]: StorageChange}} StorageChangesMap */

async function set(/**@type {{[key:string]:any}}*/keys) {
    if (syncStorage)
        await new Promise(res=>syncStorage.set(keys,res));
    else {
        /** @type {StorageChangesMap} */ var changes = {};
        for (var key in keys) {
            changes[key] = { oldValue: JSON.parse(localStorage.getItem(key)||"null"), newValue:keys[key] };
            localStorage.setItem(key,JSON.stringify(keys[key]));
        }
        onChange(changes,null);
    }
}
/** Async binding for chrome.storage.sync.get(), (null keys gets all).
 * @returns {Promise<{[key: string]: any}>} */
async function get(/**@type {string[]|string|null}*/keys) {
    if (syncStorage)
        return await new Promise(res=>syncStorage.get(keys,res));
    else {
        var keysArray = typeof(keys)==="string"?[keys]:keys;
        if (!keysArray) keysArray = Object.keys(localStorage);
        var data = {};
        for (var key of keysArray) 
            data[key] = JSON.parse(localStorage.getItem(key)||"null");
        return data;
    }
}
async function remove(/**@type {string[]|string}*/keys) {
    if (syncStorage) {
        if (keys)
            await new Promise(res=>syncStorage.remove(keys,res));
        else
            await new Promise(res=>syncStorage.clear(res));
    } else {
        /** @type {StorageChangesMap} */ var changes = {};
        var keysArray = typeof(keys)==="string"?[keys]:keys;
        if (!keysArray) keysArray = Object.keys(localStorage);
        for (var key of keysArray) {
            changes[key] = { oldValue: JSON.parse(localStorage.getItem(key)||"null"), newValue: null };
            localStorage.removeItem(key);
        }
        onChange(changes,null);
    }
}

/** @type {((changes: StorageChangesMap, namespace: "local" | "sync" | "managed") => any)[]} */
var changeCallbacks = [];
/** @param {StorageChangesMap} changes @param {"local" | "sync" | "managed"} namespace */
function onChange(changes, namespace) {
    console.log("CHANGES [%2$s]: \n%1$o", changes, namespace);
    for (var callback of changeCallbacks) callback(changes,namespace);
}
/** @param {(changes: StorageChangesMap, namespace: "local" | "sync" | "managed") => any} funk */
function addChangeCallback(funk) {
    changeCallbacks.push(funk);
}


var syncStorage = process.env.NODE_ENV === "production" ? window.chrome.storage.sync : null;
if (syncStorage) window.chrome.storage.onChanged.addListener(onChange);


const storage = { set, get, remove, addChangeCallback };
window["customStorage"] = storage;
export default storage;