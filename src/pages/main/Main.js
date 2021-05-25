// @ts-check
import React from "react";
import { Link } from "react-router-dom";

class Main extends React.Component {
    render() {
        return (<>
            <p>At main <Link to="/homework-tracker/">to hw tracker</Link></p>
        </>);
    }
}

export default Main;