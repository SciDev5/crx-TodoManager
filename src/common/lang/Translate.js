// @ts-check
import React from "react";

/** @extends {React.Component<{text:string},{},{}>} */
class Translate extends React.Component {
    render() {
        return "TRANSLATED:"+this.props.text;
    }
}

export default Translate;