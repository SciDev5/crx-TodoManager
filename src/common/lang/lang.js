// @ts-check
import dictUtil from "../util/dict-util";
import rawTranslations_global from "./translations/global.json";
import rawTranslations_english from "./translations/en.json";

/** @typedef {"number"|"string"|"Date"|"Date-time"|"Date-date"} LangComponentType */
/** @typedef {number|string|Date} LangComponent */
/** @typedef {string|[string,{[key:string]:LangComponentType}]|undefined} RawLangEntry */

/** Compile the raw json data for a language into an easy to compute form.
 * @param {import("../util/dict-util").NestedDict<RawLangEntry>} langData */
function compileLang(langData) {
    const percentReplacer = "[#97820428202]";
    /** @type {{[key:string]:[string[],{[key:string]:LangComponentType}]}} */
    var compiled = {};
    var flattened = dictUtil.denest(langData,d=>typeof(d)==="string"||(d instanceof Array));
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
// @ts-ignore
var translations_local = compileLang(rawTranslations_english);

/** A prefix to select global translation keys instead of locale-based ones (used for endonyms and such) */
const GLOBAL_TRANSLATION_PREFIX = "~";

/** Translate a key with substitution values for objects like date and numbers.
 * @param {string} key The translation's id, used to pick a chunk of meaning.
 * @param {{[key:string]:LangComponent}} [subsitutions] Objects to substitute into the translation. */
function translate(key,subsitutions) {
    var isGlobalTranslation = key.startsWith(GLOBAL_TRANSLATION_PREFIX);
    var key_ = isGlobalTranslation?key.substr(GLOBAL_TRANSLATION_PREFIX.length):key;
    var translationEntry = isGlobalTranslation?translations_global[key_]:translations_local[key_];

    if (!translationEntry) return key;

    /** @type {{[key:string]:string}} */ var components = {};
    var subs = subsitutions||{}, subtypes = translationEntry[1]||{};
    var missingSubs = [];
    for (let [name, value] of Object.entries(subtypes)) {
        if (subs.hasOwnProperty(name))
            components[name] = translateComponent(value,subs[name],name);
        else 
            missingSubs.push(name);
    }
    if (missingSubs.length > 0) throw new TypeError("Translation missing substitutions: "+missingSubs.join());

    var translationWithSubstitutions = translationEntry[0].map((v,i)=>i%2===0?v:components[v]).join("");
    return translationWithSubstitutions;
}

/**
 * @param {LangComponentType} componentType
 * @param {LangComponent} component
 * @param {string} name */
function translateComponent(componentType,component,name) {
    const typeMismatch = new TypeError(`component type mismatch: "${name}" is supposed to be a >${componentType}< but is >${component.constructor.name}<`);
    switch (componentType) {
        case "string": 
            if (typeof(component)==="string") return component;
            else throw typeMismatch;
        case "number":
            if (typeof(component)==="number") return component.toLocaleString([getLocale()]);
            else throw typeMismatch;
        case "Date":
            if (component instanceof Date) return component.toLocaleString([getLocale()]);
            else throw typeMismatch;   
        case "Date-date":
            if (component instanceof Date) return component.toLocaleDateString([getLocale()]);
            else throw typeMismatch;
        case "Date-time":
            if (component instanceof Date) return component.toLocaleTimeString([getLocale()]);
            else throw typeMismatch;
        default:
            throw new TypeError("component type not implemented (or does not exist)");
    }
}

//// Locale Handling ////

/**@type {[string,string]}*/
var locale = ["en","us"];

/** @param {string} localeString */
async function setLocale(localeString) {
    var [lang,region] = localeString.split(/-|_/).map(v=>v.toLowerCase());
    locale = [lang,region||null];
    // New local translation is set (if a regioned language does not exist, a regionless translation will be fallen back to).
    translations_local = compileLang(
        (region && await import("./translations/"+lang+"-"+region+".json")) ||
        (await import("./translations/"+lang+".json"))
    );
}
function getLocale() { return locale.filter(Boolean).join("-"); }

const lang = {setLocale,getLocale,translate};
window["lang"] = lang;
export default lang;