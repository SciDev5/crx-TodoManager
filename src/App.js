// @ts-check
import logo from "./logo.svg";
import "./App.scss";
import { Route } from "react-router";
import React from "react";
import { Link } from "react-router-dom";

/** @extends {React.Component<{},{_currentURL:string},{}>} */
class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Route path="/yeet/" exact>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p> Edit <code>src/App.js</code> and save to reload. </p>
                        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                            Learn React
                        </a>
                        <Link to="/">go back</Link>
                    </header>
                </Route>
                <Route path="/" exact>
                    root page lol
                    <Link to="/yeet">go to other</Link>
                </Route>
                <Route path="/index.html" exact>
                    root page lol
                    <Link to="/yeet">go to other</Link>
                </Route>
            </div>
        );
    }
}

export default App;