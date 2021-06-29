// @ts-check
import React from "react";
import Header from "../../common/react/Header";
import Button from "../../common/react/button/Button";
import EditPopup from "./react/EditPopup";
import SortPopup from "./react/SortPopup";
import Assignment from "./code/Assignment";
import AssignmentRow from "./react/AssignmentRow";
import "./HomeworkTracker.scss"
import Translate from "../../common/lang/Translate";
import NamespacedStorage from "../../common/storage/NamespacedStorage";

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


const htStorage = new NamespacedStorage("homework-tracker");


/** @extends {React.Component<{},{popup?:"add"|"sort"|"edit",assignments:Assignment[],editingAssignment?:Assignment,sorting:import("./code/hw-tracker").SortConfig},any>} */
class HomeworkTracker extends React.Component {
    constructor(props) {
        super(props);
        htStorage.get("assignments").then(v=>{
            var data = v["assignments"];
            if (!data || data.length === 0) return;
            var assignments = new Array(data.length).fill().map(()=>new Assignment());
            assignments.forEach((assignment,i) => assignment.json = data[i]);
            if (this.mounted) this.setState({assignments});
            else this.state.assignments = assignments;
        });
        /** @type {import("./code/hw-tracker").SortConfig} */
        var sorting = {field:"due",dir:"asc"};
        this.state = {popup:null,sorting,assignments:[]};
    }

    openAddPopup() {
        var assignment = new Assignment();
        this.addAssignment(assignment);
        this.setState({editingAssignment:assignment,popup:"add"});
    }
    cancelEdit() {
        if (this.state.popup === "add")
            this.removeAssignment(this.state.editingAssignment);
        this.closePopup();
    }
    /** @param {boolean} isPopup */
    finishEdit(isPopup) {
        var assignments = this.state.assignments.map(v=>v.json);
        htStorage.set({assignments});
        if (isPopup) this.closePopup();
    }
    /** @param {Assignment} assignment */
    openEditPopup(assignment) { this.setState({editingAssignment:assignment,popup:"edit"}); }
    openSortPopup() { this.setState({popup:"sort"}); }
    closePopup() { this.setState({popup:null}); }

    /** @param {Assignment} assignment */
    addAssignment(assignment) {
        this.state.assignments.push(assignment);
        this.closePopup();
    }
    /** @param {this["state"]["assignments"][number]} assignment */
    removeAssignment(assignment) {
        var i = this.state.assignments.indexOf(assignment);
        if (i >= 0) this.state.assignments.splice(i,1);
        this.finishEdit(false);
        this.forceUpdate();
    }
    /** @param {this["state"]["assignments"][number]} assignment */
    setEditingAssignment(assignment) {
        this.setState({editingAssignment: assignment});
    }

    /** @param {import("./code/hw-tracker").SortConfig} sortConfig */
    updateSorting(sortConfig) {
        console.log("!!UPDATING SORTING",sortConfig);
        this.setState({sorting:sortConfig});
        this.closePopup();
    }

    mounted = false;
    componentDidMount() { this.mounted = true; }

    get sortedAssignments() {
        var sorting = this.state.sorting;
        // Get the correct sorting function for the property to be sorted by.
        var sortfunction = (/** @type {Assignment} */ a,/** @type {Assignment} */ b)=>0;
        switch(sorting.field) {
            case "name": sortfunction = (a,b)=>a.name>b.name?1:-1; break;
            case "subject": sortfunction = (a,b)=>a.subject>b.name?1:-1; break;
            case "due": sortfunction = (a,b)=>a.due.backbone.getTime()-b.due.backbone.getTime(); break;
            default: throw new Error("sorting field invalid, must be 'name', 'subject', or 'due', but was '"+sorting.field+"'");
        }
        // Get if the result is to be in ascending or descending order.
        var reverse = false;
        switch (sorting.dir) {
            case "asc": reverse = false; break;    case "dsc": reverse = true; break;
            default: throw new Error("sorting direction invalid, must be 'asc' or 'dsc', but was '"+sorting.dir+"'")
        }
        // Copy and sort the assignments
        var assignments = this.state.assignments.map(v=>v);
        assignments.sort(sortfunction);
        if (reverse) assignments.reverse();
        return assignments;
    }

    render() {
        return (<div className="HomeworkTracker">
            <Header nameKey="hw-tracker" isMainMenu={true}/>
            <div role="main">
                <Button action={()=>this.openAddPopup()} nameKey={"hw-tracker.popup.create"} className="-add-button" />
                <Button action={()=>this.openSortPopup()} nameKey={"hw-tracker.popup.sort"} className="-sort-button"/>
                <span className="-sort-current">
                    <Translate text="hw-tracker.popup.sort.current" subs={{
                        field: Translate.text("hw-tracker.popup.sort.field."+this.state.sorting.field),
                        dir: Translate.text("hw-tracker.popup.sort.dir."+this.state.sorting.dir)
                    }} />
                </span>
                <div className="-Assignments">
                    {this.state.assignments.length > 0 ?
                        this.sortedAssignments.map(assignment=>
                            <AssignmentRow key={assignment.reactKey} assignment={assignment}
                                edit={()=>this.openEditPopup(assignment)}
                                remove={()=>this.removeAssignment(assignment)} /> ) :
                        <span className="-empty-info"><Translate text="hw-tracker.no-assignments" /></span>
                    }
                </div>
            </div>
            { (this.state.popup === "add" || this.state.popup === "edit") && 
                <EditPopup
                    assignment={this.state.editingAssignment}
                    done={()=>this.finishEdit(true)}
                    cancel={()=>this.cancelEdit()} /> }
            { this.state.popup === "sort" &&
                <SortPopup
                    sorting={this.state.sorting}
                    done={sortConfig=>this.updateSorting(sortConfig)}
                    cancel={()=>this.closePopup()} /> }
        </div>);
    }
}

export default HomeworkTracker;