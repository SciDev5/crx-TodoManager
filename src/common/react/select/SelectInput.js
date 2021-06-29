// @ts-check
import React from "react";
import Translate from "../../lang/Translate";
import "./SelectInput.scss";

/**
 * @extends {React.Component<{options:{id:string,nameKey:string,nameSubs?:{[key:string]:any}}[],change:(id:string)=>any,value?:string},{value:string},{}>}
 */
class SelectInput extends React.Component {
    constructor(props) {super(props);
        this.state = {value:props.value||props.options[0].id};
    }
    /** @param {React.ChangeEvent<HTMLSelectElement>} e */
    onChange(e) {
        var value = e.target.value;
        this.setState({value});
        if (this.props.change && (this.props.change instanceof Function))
            this.props.change(value);
    }

    /** @type {React.RefObject<HTMLSelectElement>} */
    inputRef = React.createRef();
    focus() {
        this.inputRef.current.focus();
    }

    render() {
        return (
            <select className="SelectInput" onChange={e=>this.onChange(e)}value={this.state.value} ref={this.inputRef}>
                {this.props.options.map(v=>(
                    <option value={v.id} key={v.id}>{Translate.text(v.nameKey,v.nameSubs)}</option>
                ))}
            </select>
        );
    }
}

export default SelectInput;