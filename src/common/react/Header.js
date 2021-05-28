// @ts-check
import React from "react";
import { Link } from "react-router-dom";
import Translate from "../lang/Translate";

/** @extends {React.Component<{nameKey:string,isMainMenu?:boolean},{},{}>} */
class Header extends React.Component {
    render() {
        return (<header className="Header">
            {(!this.props.isMainMenu)&&<Link to="/" className="-back !!button">!!back</Link>}
            <span className="-title"><Translate key={this.props.nameKey}/></span>
        </header>);
    }
}

export default Header;