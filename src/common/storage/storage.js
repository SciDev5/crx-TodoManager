// @ts-check
/// <reference path="../../../refrences/chrome.intellisense.js" />

/** @typedef {{newValue?:any,oldValue?:any}} StorageChange */
/** @typedef {{[key: string]: StorageChange}} StorageChangesMap */
/** @typedef {"local" | "sync" | "managed"} StorageNamespaces */

async function set(/**@type {{[key:string]:any}}*/keys) {
    if (syncStorage)
        await new Promise(res=>syncStorage.set(keys,res));
    else {
        /** @type {StorageChangesMap} */ var changes = {};
        for (var key in keys) {
            var oldValue = JSON.parse(localStorage.getItem(key)||"null");
            changes[key] = oldValue ? { oldValue , newValue:keys[key] } : { newValue:keys[key]};
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
            var oldValue = JSON.parse(localStorage.getItem(key)||"null");
            if (oldValue) changes[key] = { oldValue };
            localStorage.removeItem(key);
        }
        onChange(changes,null);
    }
}

/** @type {((changes: StorageChangesMap, namespace: StorageNamespaces) => any)[]} */
var changeCallbacks = [];
/** @param {StorageChangesMap} changes @param {StorageNamespaces} namespace */
function onChange(changes, namespace) {
    console.log("CHANGES [%2$s]: \n%1$o", changes, namespace);
    for (var callback of changeCallbacks) callback(changes,namespace);
}
/** @param {(changes: StorageChangesMap, namespace: StorageNamespaces) => any} funk */
function addChangeCallback(funk) {
    changeCallbacks.push(funk);
}
/** @param {(changes: StorageChangesMap, namespace: StorageNamespaces) => any} funk */
function removeChangeCallback(funk) {
    if (changeCallbacks.includes(funk))
        changeCallbacks.splice(changeCallbacks.indexOf(funk));
}


var syncStorage = process.env.NODE_ENV === "production" ? window.chrome.storage.sync : null;
if (syncStorage) window.chrome.storage.onChanged.addListener(onChange);


const storage = { set, get, remove, addChangeCallback, removeChangeCallback };
window["customStorage"] = storage;
export default storage;