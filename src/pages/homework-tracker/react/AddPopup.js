// @ts-check
import React from "react";
import Translate from "../../../common/lang/Translate";
import Button from "../../../common/react/button/Button";
import DateInput from "../../../common/react/input/DateInput";
import TextInput from "../../../common/react/input/TextInput";
import Popup from "../../../common/react/popup/Popup";
import Assignment from "../code/Assignment";

/** @extends {React.Component<{done:(assignment:import("../code/Assignment").default)=>any,cancel:()=>any},{assignment:Assignment},{}>} */
class AddPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {assignment: new Assignment()}
    }
    render() {
        var assignment = this.state.assignment;
        return (<Popup className="hwt-AddPopup">
            <div className="-input"><span><Translate text="!!name"/></span><TextInput placeholder="!!name" change={value=>assignment.name=value}/></div>
            <div className="-input"><span><Translate text="!!subject"/></span><TextInput placeholder="!!subject" change={value=>assignment.subject=value}/></div>
            <div className="-input"><span><Translate text="!!link"/></span><TextInput placeholder="!!link" change={value=>assignment.link=value}/></div>
            <div className="-input"><span><Translate text="!!date"/></span><DateInput change={value=>assignment.due=value} value={assignment.due} ariaLabel="!!date" /></div>
            <Button action={()=>this.props.done(this.state.assignment)} nameKey="!!done"/>
            <Button action={()=>this.props.cancel()} nameKey="!!cancel"/>
        </Popup>);
    }
}

export default AddPopup;