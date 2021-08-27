// @ts-check
import React from "react";
import { Link } from "react-router-dom";
import Translate from "../lang/Translate";
import "./Header.scss";

/** @extends {React.Component<{nameKey:string,isMainMenu?:boolean},{},{}>} */
class Header extends React.Component {
    render() {
        return (<header className="Header">
            {(!this.props.isMainMenu)&&<Link to="/" className="-back !!button"><Translate text={"header.back"}/></Link>}
            <span className="-title"><Translate text={this.props.nameKey}/></span>
            <a className="-credit" href="https://github.com/SciDev5/crx-TodoManager" target="_blank" rel="noreferrer"><Translate text={"header.byScidev"}/></a>
        </header>);
    }
}

export default Header;