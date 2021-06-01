// @ts-check
import React from "react";

/** @extends {React.Component<{text:string,subs?:{[key:string]:string}},{},{}>} */
class Translate extends React.Component {
    /** Translate a translation key into text.
     * @param {string} text The translation key.
     * @param {{[key:string]:string}} [sub] The subsitutions into the text to use (prefix with TODO (something) to auto-translate it) */
    static text(text,sub) { return "T!!"+text+"<<"+(sub?JSON.stringify(sub):"")}
    render() {
        return <>{Translate.text(this.props.text,this.props.subs)}</>;
    }
}

export default Translate;