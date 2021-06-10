// @ts-check
import React from "react";
import lang from "../../../common/lang/lang";
import Button from "../../../common/react/button/Button";
import AssignmentDataRow from "./AssignmentDataRow";


/** @extends {React.Component<{assignment:import("../code/Assignment").default,edit:()=>any,remove:()=>any},{opened:boolean},{}>} */
class AssignmentRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {opened:false};
    }
    /** @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e */
    toggleOpened(e) {
        if (!(e.target instanceof HTMLButtonElement))
            this.setState({opened: !this.state.opened});
    }
    render() {
        var { assignment } = this.props;
        var { opened } = this.state;
        return (
            <div className="hwt-Assignment" onClick={e=>this.toggleOpened(e)}>
                <div className="-hdr">
                    <span className={"-arrow"+(opened?" -opened":"")}>{">"}</span>
                    <span className="-name">{assignment.name}</span>
                    <span className="-due">{assignment.due.toDaysUntilString()}</span>
                    <div className="-buttons">
                        <Button action={()=>this.props.edit()} nameKey="general.edit" unstyled={false} />
                        <Button action={()=>this.props.remove()} nameKey="general.remove" unstyled={false}/>
                    </div>
                </div>
                <div className={"-body"+(opened?" -opened":"")}>
                    <AssignmentDataRow label="hw-tracker.subject" data={assignment.subject} />
                    <AssignmentDataRow label="hw-tracker.description" data={assignment.description} />
                    <AssignmentDataRow label="hw-tracker.link" data={assignment.link} linkify />
                    <AssignmentDataRow label="hw-tracker.due" data={assignment.due.toLocaleString(lang.getLocale())} />
                </div>
            </div>
        );
    }
}

export default AssignmentRow;