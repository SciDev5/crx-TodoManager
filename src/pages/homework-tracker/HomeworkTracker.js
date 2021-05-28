// @ts-check
import React from "react";
import NamespacedStorage from "../../common/storage/NamespacedStorage";
import Header from "../../common/react/Header";
import Button from "../../common/react/button/Button";
import AddPopup from "./react/AddPopup";
import SortPopup from "./react/SortPopup";

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

/** @extends {React.Component<{},{popup?:"add"|"sort",sorting:any},{}>} */
class HomeworkTracker extends React.Component {

    closePopup() { console.log("!!CLOSING POPUP") }
    /** @param {import("./code/hw-tracker").Assignment} assignment */
    addAssignment(assignment) { console.log("!!ADDING ASSIGNMENT",assignment); this.closePopup(); }
    /** @param {import("./code/hw-tracker").SortConfig} sortConfig */
    updateSorting(sortConfig) { console.log("!!UPDATING SORTING",sortConfig); this.closePopup(); }

    render() {
        return (<div className="HomeworkTracker">
            <Header nameKey="!!hw-tracker" />
            <div role="main">
                <Button action={console.log.bind(console,"!!TEST")} nameKey={"!!yeet"} />
            </div>
            { this.state.popup === "add" && 
                <AddPopup
                    done={assignment=>this.addAssignment(assignment)}
                    cancel={()=>this.closePopup()} /> }
            { this.state.popup === "sort" &&
                <SortPopup
                    done={(sortConfig)=>this.updateSorting(sortConfig)}
                    cancel={()=>this.closePopup()} /> }
        </div>);
    }
}

export default HomeworkTracker;