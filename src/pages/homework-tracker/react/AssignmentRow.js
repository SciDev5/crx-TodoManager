// @ts-check
import React from "react";
import Button from "../../../common/react/button/Button";
import TextInput from "../../../common/react/input/TextInput";

/** @extends {React.Component<{assignment:import("../code/Assignment").default,update:()=>any,remove:()=>any,editing:boolean,setEditing:(editing:boolean)=>any},{},{}>} */
class AssignmentRow extends React.Component {

    remove() {
        this.props.remove();
    }
    setEditing(editing) {
        this.props.setEditing(editing);
    }

    /** General input event.
     * @param {"name"} type 
     * @param {string} value */
    onInput(type,value) {
        if (!this.props.editing) return;
        if (type === "name")
            this.props.assignment.name = value;
        this.props.update();
    }

    render() {
        var { assignment, editing } = this.props;
        return (
            <div className="hwt-Assignment">
                <span>Name: {editing?<TextInput value={assignment.name} change={this.onInput.bind(this,"name")} placeholder="!!ph"/>:assignment.name}</span>
                <Button action={()=>this.setEditing(!editing)} nameKey={"!!setedit-"+!editing} />
                <Button action={()=>this.remove()} nameKey="!!delete" />
            </div>
        );
    }
}

export default AssignmentRow;