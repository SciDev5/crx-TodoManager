// @ts-check
import React from "react";
import Button from "../../../common/react/button/Button";

/** @extends {React.Component<{assignment:import("../code/Assignment").default,update:()=>any,remove:()=>any,editing:boolean,beginEditing:()=>any},{},{}>} */
class AssignmentRow extends React.Component {

    remove() {
        this.props.remove();
    }
    edit() {
        this.props.beginEditing();
    }

    /** General input event.
     * @param {"name"} type 
     * @param {React.ChangeEvent<HTMLInputElement>} e */
    onInput(type,e) {
        if (!this.props.editing) return;

        var value = e.target.value;
        console.log(value,type);
        if (value === "name")
            this.props.assignment.name = value;
        this.props.update();
    }

    render() {
        var { assignment, editing } = this.props;
        return (
            <div className="hwt-Assignment">
                <span>Name: {editing?<input value={assignment.name} onChange={this.onInput.bind(this,"name")}/>:assignment.name}</span>
                {!editing && <Button action={()=>this.edit()} nameKey="!!edit" />}
                <Button action={()=>this.remove()} nameKey="!!delete" />
            </div>
        );
    }
}

export default AssignmentRow;