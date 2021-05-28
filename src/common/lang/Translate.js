// @ts-check
import React from "react";

/** @extends {React.Component<{key:string},{},{}>} */
class Translate extends React.Component {
    render() {
        return "TRANSLATED:"+this.props.key;
    }
}

export default Translate;