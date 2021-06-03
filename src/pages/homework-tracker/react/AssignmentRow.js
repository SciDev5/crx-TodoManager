// @ts-check
import React from "react";
import Button from "../../../common/react/button/Button";

/** @extends {React.Component<{assignment:import("../code/Assignment").default,edit:()=>any,remove:()=>any},{},{}>} */
class AssignmentRow extends React.Component {
    render() {
        var { assignment } = this.props;
        return (
            <div className="hwt-Assignment">
                <span>Name: {assignment.name}</span>
                <Button action={()=>this.props.edit()} nameKey="!!edit" unstyled={true} />
                <Button action={()=>this.props.remove()} nameKey="!!delete" unstyled={true}/>
            </div>
        );
    }
}

export default AssignmentRow;