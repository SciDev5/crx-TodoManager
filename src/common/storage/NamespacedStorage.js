// @ts-check
import storage from "./storage";

/** A class which puts namespaces on data put in storage to make it easier to make more sub-programs. */
class NamespacedStorage {
    /** @private @type {(changes: import("./storage").StorageChangesMap, namespace: import("./storage").StorageNamespaces) => any} */
    boundChangeCallback;
    /** @readonly @type {string} The namespace's name. */ name;
    /** Create a new NamespacedStorage with name.
     * @param {string} name */
    constructor(name) {
        if (!name || name.includes(":")) throw new Error("storage namespace name invalid");
        this.name = name.trim();
        this.boundChangeCallback = this.changeCallback.bind(this);
        storage.addChangeCallback(this.boundChangeCallback);
        Object.freeze(this);
    }
    /** Transform a single key.
     * @private
     * @param {string} key */
    transformKey(key) {
        return `${this.name}.${key}`;
    }
    /** Check if a storage key is from this namespace.
     * @private
     * @param {string} key */
    matchesKey(key) {
        var k = /^(.*?):.*?$/.exec(key);
        return !!(k && k[1] === this.name);
    }
    /** Transform a key set
     * @private
     * @template {string|string[]|{[key:string]:any}} T
     * @param {T} keys
     * @returns {T} */
    transformKeys(keys) {
        if (!keys) return null;
        if (typeof(keys)==="string")
            // @ts-ignore
            return this.transformKey(keys);
        else if (keys instanceof Array) {
            let transformed = [];
            for (let key of keys) 
                transformed.push(this.transformKey(key));
                // @ts-ignore
            return transformed;
        } else {
            let transformed = {};
            for (let [key, value] of Object.entries(keys)) 
                transformed[this.transformKey(key)] = value;
            // @ts-ignore
            return transformed;
        }
    }
    
    /** @param {string|string[]} keys */
    async get(keys) {  return storage.get(this.transformKeys(keys)); }
    /** @param {{[key:string]:any}} keys */
    async set(keys) {  return storage.set(this.transformKeys(keys)); }
    /** @param {string|string[]} keys */
    async remove(keys) {  return storage.remove(this.transformKeys(keys)); }
    
    /** @type {((changes: import("./storage").StorageChangesMap, namespace: import("./storage").StorageNamespaces) => any)[]} @private */
    callbacks = [];
    /** Add a change callback which only responds to changes to this namespace.
     * @param {(changes: import("./storage").StorageChangesMap, namespace: import("./storage").StorageNamespaces) => any} callback */
    addChangeCallback(callback) { this.callbacks.push(callback); }

    /** @private @param {import("./storage").StorageChangesMap} changed @param {import("./storage").StorageNamespaces} namespace */
    changeCallback(changed,namespace) {
        var filteredChanges = Object.entries(changed).filter(entry=>this.matchesKey(entry[0]));
        if (filteredChanges.length === 0) return;
        /** @type {import("./storage").StorageChangesMap} */ var recombinedChanges = {};
        for (let change of filteredChanges) recombinedChanges[change[0]] = change[1];
        for (let callback of this.callbacks) callback(recombinedChanges,namespace);
    }

    /** Disconnect the event handler from the storage api. */
    disconnect() { storage.removeChangeCallback(this.boundChangeCallback); }
}

export default NamespacedStorage;