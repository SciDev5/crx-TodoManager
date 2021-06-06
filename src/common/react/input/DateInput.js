// @ts-check
import React from "react";
import Translate from "../../lang/Translate";
import DayDate from "../../util/DayDate";
import "./TextInput.scss";


/** A general purpose text input component.
 * @extends {React.Component<{change?:((value:DayDate)=>any),submit?:(()=>void),value?:DayDate,type?:"text"|"password",verify?:(value:DayDate)=>boolean,ariaLabel?:string},{value:DayDate,textValue:string,valid:boolean},any>} */
class DateInput extends React.Component {
    /**
     * @param {{ change?: (value: DayDate) => any; submit?: () => void; value?: DayDate; placeholder?: string; type?: "text" | "password"; verify?: (value: DayDate) => boolean; ariaLabel?: string; } | Readonly<{ change?: (value: DayDate) => any; submit?: () => void; value?: DayDate; placeholder?: string; type?: "text" | "password"; verify?: (value: DayDate) => boolean; ariaLabel?: string; }>} props
     */
    constructor(props) {
        super(props);
        // Bind the onClick callback to this.
        this.onChange = this.onChange.bind(this);
        this.onKey = this.onKey.bind(this);
        var value = props.value || new DayDate();
        this.state = {value,textValue: value.getDateString(), valid: true};
    }

    /** The change handler for the input.
     * @param {React.ChangeEvent<HTMLInputElement>} e The event. */
    onChange(e) {
        this.setState({textValue:e.target.value});
        var valueAsDate = e.target.valueAsDate;
        if (!valueAsDate) { this.setState({valid:false}); return; }
        var day = valueAsDate.getUTCDate(), month = valueAsDate.getUTCMonth(), year = valueAsDate.getUTCFullYear();
        var value = new DayDate(day, month, year);
        var valid = DayDate.isDayMonthYearValid(day,month,year) && (!this.props.verify || !(this.props.verify instanceof Function) || this.props.verify(value));
        if (!valid) { this.setState({valid:false}); return; }
        this.setState({value, valid: true});
        if (this.props.change && (this.props.change instanceof Function)) this.props.change(value);
        console.log(value.getDateString(),valueAsDate.toUTCString(),valid,day,month,year);
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
        var ariaLabel = Translate.text(this.props.ariaLabel);        
        return (<input type="date"
            value={this.state.textValue}
            onChange={this.onChange} onKeyPress={this.onKey}
            name={name} aria-label={ariaLabel}
            className={"TextInput"+(this.state.valid?"":" invalid")} />)
    }
}

export default DateInput;