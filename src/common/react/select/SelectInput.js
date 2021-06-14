// @ts-check
import React from "react";
import Translate from "../../lang/Translate";
import "./SelectInput.scss";

/**
 * @extends {React.Component<{options:{id:string,nameKey:string,nameSubs?:{[key:string]:any}}[],change:(id:string)=>any},{value:string},{}>}
 */
class SelectInput extends React.Component {
   
    /** @param {React.ChangeEvent<HTMLSelectElement>} e */
    onChange(e) {
        if (this.props.change && (this.props.change instanceof Function))
            this.props.change(e.target.value);
    }
    render() {
        return (
            <select className="SelectInput" onChange={e=>this.onChange(e)}>
                {this.props.options.map(v=>(
                    <option value={v.id} key={v.id}>{Translate.text(v.nameKey,v.nameSubs)}</option>
                ))}
            </select>
        );
    }
}

export default SelectInput;