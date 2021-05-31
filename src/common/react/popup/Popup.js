// @ts-check
import React from "react";
import "./Popup.scss";

/** @extends {React.Component<{className:string},{},{}>} */
class Popup extends React.Component {
    render() {
        return (
            <div className="Popup">
                <div className="-bg" />
                <div className={"-content "+this.props.className} children={this.props.children} />
            </div>
        );
    }
}

export default Popup;