// @ts-check
import dictUtil from "../util/dict-util";
import rawTranslations_global from "./translations/global.json";

/** @typedef {"number"|"string"} LangComponentType */
/** @typedef {string|[string,{[key:string]:LangComponentType}]|undefined} RawLangEntry */

/** Compile the raw json data for a language into an easy to compute form.
 * @param {import("../util/dict-util").NestedDict<RawLangEntry>} langData */
function compileLang(langData) {
    const percentReplacer = "[#97820428202]";
    /** @type {{[key:string]:[string[],{[key:string]:LangComponentType}]}} */
    var compiled = {};
    var flattened = dictUtil.denest(langData,d=>typeof(d)==="string");
    for (var [key,value] of Object.entries(flattened)) {
        var text = typeof(value)==="string"?value:value[0];
        var subs = typeof(value)==="string"?null:value[1];
        let chopped = text.replace(/([^\\]|^)%/g,"$1"+percentReplacer).replace(/\\%/g,"%").split(percentReplacer);
        compiled[key] = [chopped,subs];
    }
    return compiled;
}

// @ts-ignore
var translations_global = compileLang(rawTranslations_global);


const lang = {};
export default lang;