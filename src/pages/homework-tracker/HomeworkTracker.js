// @ts-check
import React from "react";
import Header from "../../common/react/Header";
import Button from "../../common/react/button/Button";
import AddPopup from "./react/AddPopup";
import SortPopup from "./react/SortPopup";
import Assignment from "./code/Assignment";
import AssignmentRow from "./react/AssignmentRow";

/*LAYOUT PLAN

 [<] Homework Tracker
-----------------------------
 [ sorting: Due (soonest) ]
 [    + Add Assignment    ]
- - - - - - - - - - - - - - -
 > Assignment A (3dy)
 > yeet (2wk)
 > A thing (today)
 v ExampleOpenedAssignment
 | Due: 7/13/20 (4dy)
 | Subject: "Math lol"
 | Link: [link if provided]
 > Assignmet (overdue)
*/


//const htStorage = new NamespacedStorage("homework-tracker");

// !!DEBUG
const assignmentsTemp = new Array(3).fill().map(()=>new Assignment());
assignmentsTemp[0].name = "a";
assignmentsTemp[1].name = "second1";
assignmentsTemp[2].due.set(10,4,2023);
// !!/DEBUG

/** @extends {React.Component<{},{popup?:"add"|"sort",assignments:Assignment[],editingAssignment?:Assignment,sorting:any},{}>} */
class HomeworkTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {popup:null,sorting:null,assignments:assignmentsTemp};
        window["hte"] = this; // !!DEBUG
    }

    /** @param {"add"|"sort"} popup*/
    openPopup(popup) { this.setState({popup}); }
    closePopup() { this.setState({popup:null}); }

    /** @param {Assignment} assignment */
    addAssignment(assignment) {
        this.state.assignments.push(assignment);
        this.closePopup();
        this.updateAssignmentState();
    }
    /** @param {this["state"]["assignments"][number]} assignment */
    removeAssignment(assignment) {
        var i = this.state.assignments.indexOf(assignment);
        if (i >= 0) this.state.assignments.splice(i,1);
        this.updateAssignmentState();
    }
    /** @param {this["state"]["assignments"][number]} assignment */
    setEditingAssignment(assignment) {
        this.setState({editingAssignment: assignment});
    }
    updateAssignmentState() { this.forceUpdate(); }

    /** @param {import("./code/hw-tracker").SortConfig} sortConfig */
    updateSorting(sortConfig) {
        console.log("!!UPDATING SORTING",sortConfig);
        this.setState({sorting:sortConfig});
        this.closePopup();
    }


    render() {
        return (<div className="HomeworkTracker">
            <Header nameKey="!!hw-tracker" />
            <div role="main">
                <Button action={()=>this.openPopup("add")} nameKey={"!!create"} />
                <Button action={()=>this.openPopup("sort")} nameKey={"!!change sorting"} />
                <div className="-Assignments">
                    {this.state.assignments.map(assignment=>
                        <AssignmentRow key={assignment.reactKey} assignment={assignment}
                            editing={this.state.editingAssignment && this.state.editingAssignment.reactKey === assignment.reactKey}
                            setEditing={editing=>this.setEditingAssignment(editing?assignment:null)}
                            update={()=>this.updateAssignmentState()}
                            remove={()=>this.removeAssignment(assignment)} />
                    )}
                </div>
            </div>
            { this.state.popup === "add" && 
                <AddPopup
                    done={assignment=>this.addAssignment(assignment)}
                    cancel={()=>this.closePopup()} /> }
            { this.state.popup === "sort" &&
                <SortPopup
                    done={sortConfig=>this.updateSorting(sortConfig)}
                    cancel={()=>this.closePopup()} /> }
        </div>);
    }
}

export default HomeworkTracker;