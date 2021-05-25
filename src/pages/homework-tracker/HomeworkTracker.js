// @ts-check
import React from "react";
import { Link } from "react-router-dom";

class HomeworkTracker extends React.Component {
    render() {
        return (<>
            <p>At homework tracker <Link to="/">to main</Link></p>
        </>);
    }
}

export default HomeworkTracker;