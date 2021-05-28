// @ts-check
import React from "react";
import NamespacedStorage from "../../common/storage/NamespacedStorage";
import Header from "../../common/react/Header";

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

class HomeworkTracker extends React.Component {
    render() {
        return (<div className="HomeworkTracker">
            <Header nameKey="!!hw-tracker" />
            <div role="main">main body</div>
        </div>);
    }
}

export default HomeworkTracker;