// @ts-check
import Translate from "../../../common/lang/Translate";

/** Put https:// before a link if it is missing
 * @param {string} link */
function httpifyLink(link) {
    if (/^https?:\/\//.test(link)) return link;
    else return "https://"+link;
}

/** @param {{ label: string; data: string; linkify?:boolean }} props */
function AssignmentDataRow(props) {
    return (
        <div className="-row">
            <label><Translate text={props.label}/></label>
            { props.linkify ?
                <a href={httpifyLink(props.data)}>{props.data}</a> :
                <span>{props.data}</span>
            }
        </div>
    );
}

export default AssignmentDataRow;