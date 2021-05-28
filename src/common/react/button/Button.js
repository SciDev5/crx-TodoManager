// @ts-check
import React from "react";
import Translate from "../../lang/Translate";

/** @extends {React.Component<{action:()=>any,className?:string,nameKey?:string},{},{}>} */
class Button extends React.Component {
    onClick(/**@type {React.MouseEvent<HTMLButtonElement>}*/e) {
        if (this.props.action && (this.props.action instanceof Function))
            this.props.action();
    }
    render() {
        var className = "Button";
        if (this.props.className) className += " "+this.props.className;
        return (
            <button onClick={e=>this.onClick(e)} className={className}>
                { 
                    this.props.nameKey ? 
                    <Translate text={this.props.nameKey}/> : 
                    this.props.children
                }
            </button>
        );
    }
}

export default Button;