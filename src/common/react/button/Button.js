// @ts-check
import React from "react";
import Translate from "../../lang/Translate";
import "./Button.scss";

/** @extends {React.Component<{action:()=>any,className?:string,nameKey?:string,ariaLabel?:string,unstyled?:boolean,disabled?:boolean,icon?:any,iconAltKey?:string},{},{}>} */
class Button extends React.Component {
    onClick(/**@type {React.MouseEvent<HTMLButtonElement>}*/e) {
        if (this.props.action && (this.props.action instanceof Function))
            this.props.action();
    }
    render() {
        var className = "Button";
        if (this.props.className) className += " "+this.props.className;
        if (this.props.unstyled) className += " -unstyled";
        return (
            <button onClick={e=>this.onClick(e)} className={className} 
                disabled={this.props.disabled} aria-label={this.props.ariaLabel?Translate.text(this.props.ariaLabel):undefined}>
                {this.props.icon && <img src={this.props.icon} alt={Translate.text(this.props.iconAltKey)} className="-icon" />}
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