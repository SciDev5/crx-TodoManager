// @ts-check
import React from "react";
import Button from "../../../common/react/button/Button";
import Popup from "../../../common/react/popup/Popup";


/** @extends {React.Component<{done:(sortConfig:import("../code/hw-tracker").SortConfig)=>any,cancel:()=>any},{},{}>} */
class SortPopup extends React.Component {
    
    done() {
        this.props.done(null); // TODO
    }
    cancel() {
        this.props.cancel();
    }
    render() {
        return (<Popup className="hwt-SortPopup">
            <></>
            <Button action={()=>this.done()} nameKey="general.done" className="-done-button"/>
            <Button action={()=>this.cancel()} nameKey="general.cancel" className="-cancel-button"/>
        </Popup>);
    }
}

export default SortPopup;