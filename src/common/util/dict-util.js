// @ts-check

/** @template T @typedef {{[key:string]:T|NestedDict<T>}} NestedDict<T> */
/** @template T @typedef {{[key:string]:T}} Dict<T> */

/**
 * @template T
 * @param {NestedDict<T>} dict The dictionary to de-nest.
 * @param {((elt: NestedDict<T>|T)=>boolean)} isElement A function which tells apart elements from the other parts.
 * @param {string} [levelSeparator] The separator for the key path, usually "."
 * @returns {Dict<T>} A de-nested version of dict.
 */
function denestDict(dict, isElement, levelSeparator) {
    const separator = levelSeparator||".";
    /**@type {Dict<T>}*/ var denested = {};
    denestDict_recursive(denested,[],dict,isElement,separator,[dict])
    return denested;
}

/**
 * @template T
 * @param {NestedDict<T>} dict The dictionary to trace through.
 * @param {((elt: NestedDict<T> | T)=>boolean)} isElement A function which tells apart elements from the other parts.
 * @param {NestedDict<T>[]} objectPath The path of objects it is going through (loop prevention).
 * @param {string[]} path The current key path.
 * @param {string} separator The separator for the key path, usually "."
 * @param {Dict<T>} denested The denested object to add to.
 */
function denestDict_recursive(denested,path,dict,isElement,separator,objectPath) {
    for (var [key, value] of Object.entries(dict)) {
        path.push(key);
        if (isElement(value)) {
            // @ts-ignore
            denested[path.join(separator)] = value;
        } else {
            // @ts-ignore
            /**@type {NestedDict<T>}*/ var subDict = value;
            if (objectPath.includes(subDict))
                throw new TypeError("cannot denest object with self-refrence loop")
            objectPath.push(subDict);
            denestDict_recursive(denested,path,subDict,isElement,separator,objectPath);
            objectPath.splice(-1);
        }
        path.splice(-1);
    }
}

const dictUtil = {denest:denestDict};
export default dictUtil;