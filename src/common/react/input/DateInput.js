// @ts-check
import React from "react";
import Translate from "../../lang/Translate";
import DayDate from "../../util/DayDate";
import "./TextInput.scss";


/** A general purpose text input component.
 * @extends {React.Component<{change?:((value:DayDate)=>any),submit?:(()=>void),value?:DayDate,placeholder?:string,type?:"text"|"password",verify?:(value:DayDate)=>boolean,ariaLabel?:string},{value:DayDate,showPassword?:boolean},any>} */
class DateInput extends React.Component {
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
        var valueAsDate = e.target.valueAsDate;
        var value = new DayDate(valueAsDate.getUTCDate(),valueAsDate.getUTCMonth(),valueAsDate.getUTCFullYear());
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

    // Render
    render() {
        var name = this.props.ariaLabel?Translate.text(this.props.ariaLabel):undefined;
        var placeholder = Translate.text(this.props.placeholder);        
        return (<input type="date"
            value={this.state.value.getDateString()}
            onChange={this.onChange} onKeyPress={this.onKey}
            name={name} placeholder={placeholder}
            className="TextInput" />)
    }
}

export default DateInput;