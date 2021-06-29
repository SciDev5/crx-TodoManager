// @ts-check
import React from "react";
import Translate from "../../lang/Translate";
import Button from "../button/Button";
import "./TextInput.scss";


/** A general purpose text input component.
 * @extends {React.Component<{change?:((value:string)=>any),submit?:(()=>void),value?:string,placeholder:string,type?:"text"|"password",verify?:(value:string)=>boolean,ariaLabel?:string},{value:string,showPassword?:boolean},any>} */
class TextInput extends React.Component {
    constructor(props) {
        super(props);
        // Bind the onClick callback to this.
        this.onChange = this.onChange.bind(this);
        this.onKey = this.onKey.bind(this);
        this.state = {value:props.value||""}
    }

    /** The change handler for the input.
     * @param {React.ChangeEvent<HTMLInputElement>} e The event. */
    onChange(e) {
        var value = e.target.value;
        if (this.props.verify && (this.props.verify instanceof Function) && !this.props.verify(value)) value = this.state.value;
        this.setState({value});
        if (this.props.change && (this.props.change instanceof Function)) this.props.change(value);
    }

    /** The keypressed handler for the the input.
     * @param {React.KeyboardEvent<HTMLInputElement>} e The event.
     */
    onKey(e) {
        if (e.key === "Enter")
            if (this.props.submit && (this.props.submit instanceof Function)) this.props.submit();
    }

    
    /** @type {React.RefObject<HTMLInputElement>} */
    inputRef = React.createRef();
    focus() {
        this.inputRef.current.focus();
    }

    // Render
    render() {
        var name = this.props.ariaLabel?Translate.text(this.props.ariaLabel):undefined;
        var placeholder = Translate.text(this.props.placeholder);
        switch (this.props.type) {
            case "password": 
                const showInputSVG = (<svg height='300px' width='300px' fill="var(--svg-fg)" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100"><path d="M50,36.044c-7.695,0-13.955,6.26-13.955,13.956S42.305,63.956,50,63.956S63.955,57.695,63.955,50S57.695,36.044,50,36.044z   M50,58.956c-4.938,0-8.955-4.018-8.955-8.956s4.018-8.956,8.955-8.956s8.955,4.018,8.955,8.956S54.938,58.956,50,58.956z   M89.166,48.55C79.477,34.936,65.201,27.127,50,27.127S20.523,34.936,10.834,48.55L9.803,50l1.031,1.449  C20.522,65.064,34.798,72.873,50,72.873s29.478-7.809,39.166-21.424L90.197,50L89.166,48.55z M50,67.873  c-13.021,0-25.328-6.49-34.023-17.873C24.672,38.617,36.98,32.127,50,32.127S75.328,38.617,84.023,50  C75.328,61.383,63.021,67.873,50,67.873z"></path></svg>);
                return (<span className="TextInput PassInput" onMouseLeave={()=>this.setState({showPassword:false})}><input
                    ref={this.inputRef}
                    value={this.state.value}
                    onChange={this.onChange} onKeyPress={this.onKey}
                    aria-label={name} placeholder={placeholder}
                    type={this.state.showPassword?"text":"password"} />
                    <Button 
                        action={()=>this.setState({showPassword:!this.state.showPassword})} 
                        ariaLabel={Translate.text("!!hidePassName",{name})}
                        unstyled={true}>
                            {showInputSVG}
                    </Button>
                </span>);
            default:
                return (<input 
                    ref={this.inputRef}
                    value={this.state.value}
                    onChange={this.onChange} onKeyPress={this.onKey}
                    name={name} placeholder={placeholder}
                    className="TextInput" />)
        }
        ;
    }
}

export default TextInput;