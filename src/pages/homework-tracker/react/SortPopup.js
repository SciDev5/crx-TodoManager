// @ts-check
import React from "react";
import Translate from "../../../common/lang/Translate";
import Button from "../../../common/react/button/Button";
import Popup from "../../../common/react/popup/Popup";
import SelectInput from "../../../common/react/select/SelectInput";

/** @typedef {import("../code/hw-tracker").SortConfig} SortConfig */

/** @extends {React.Component<{done:(sortConfig:SortConfig)=>any,cancel:()=>any,sorting:SortConfig},{sorting:SortConfig},{}>} */
class SortPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sorting:props.sorting};
    }
    done() {
        this.props.done(this.state.sorting);
    }
    cancel() {
        this.props.cancel();
    }
    /** Internal update sorting state.
     * @param {"field"|"dir"} key Which part of the sorting to set
     * @param {any} value The new value */
    setSorting(key,value) {
        console.log(key,value);
        var sorting = this.state.sorting;
        switch (key) {
            case "field": sorting.field = value; break;
            case "dir": sorting.dir = value; break;
            default: return;
        }
        this.setState({sorting});
    }
    render() {
        var sorting = this.state.sorting;
        return (<Popup className="hwt-SortPopup">
            <h2><Translate text="!!Change sorting"/></h2>
            <div className="-row"><label><Translate text="!!sort by"/></label>
                <SelectInput value={sorting.field} 
                    options={[{nameKey:"!!due",id:"due"},{nameKey:"!!name",id:"name"},{nameKey:"!!sub",id:"subject"}]} 
                    change={this.setSorting.bind(this,"field")} />
            </div>
            <div className="-row"><label><Translate text="!!sort order"/></label>
                <SelectInput value={sorting.dir}
                    options={[{nameKey:"!!asc",id:"asc"},{nameKey:"!!dsc",id:"dsc"}]}
                    change={this.setSorting.bind(this,"dir")} />
            </div>
            <Button action={()=>this.done()} nameKey="general.done" className="-done-button"/>
            <Button action={()=>this.cancel()} nameKey="general.cancel" className="-cancel-button"/>
        </Popup>);
    }
}

export default SortPopup;