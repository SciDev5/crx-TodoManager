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
    /** @type {React.RefObject<SelectInput>} */
    firstInputRef = React.createRef();
    componentDidMount() {
        this.firstInputRef.current.focus();
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
            <h2><Translate text="hw-tracker.popup.sort.title"/></h2>
            <div className="-row"><label><Translate text="hw-tracker.popup.sort.field"/></label>
                <SelectInput value={sorting.field} ref={this.firstInputRef}
                    options={[{nameKey:"hw-tracker.popup.sort.field.due",id:"due"},{nameKey:"hw-tracker.popup.sort.field.name",id:"name"},{nameKey:"hw-tracker.popup.sort.field.subject",id:"subject"}]} 
                    change={this.setSorting.bind(this,"field")} />
            </div>
            <div className="-row"><label><Translate text="hw-tracker.popup.sort.dir"/></label>
                <SelectInput value={sorting.dir}
                    options={[{nameKey:"hw-tracker.popup.sort.dir.asc",id:"asc"},{nameKey:"hw-tracker.popup.sort.dir.dsc",id:"dsc"}]}
                    change={this.setSorting.bind(this,"dir")} />
            </div>
            <Button action={()=>this.done()} nameKey="general.done" className="-done-button"/>
            <Button action={()=>this.cancel()} nameKey="general.cancel" className="-cancel-button"/>
        </Popup>);
    }
}

export default SortPopup;