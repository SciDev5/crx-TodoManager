// @ts-check
import { Redirect, Route, Switch } from "react-router";
import React from "react";
import HomeworkTracker from "./pages/homework-tracker/HomeworkTracker";

/** @extends {React.Component<{},{_currentURL:string},{}>} */
class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/" exact><HomeworkTracker/></Route>
                    
                    <Route path="/index.html" exact><Redirect to="/"/></Route>
                </Switch>
            </div>
        );
    }
}

export default App;