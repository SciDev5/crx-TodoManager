// @ts-check
import Translate from "../../../common/lang/Translate";

/** @param {{ label: string; data: string; }} props */
function AssignmentDataRow(props) {
    return (
        <div className="-row">
            <label><Translate text={props.label}/></label>
            <span>{props.data}</span>
        </div>
    );
}

export default AssignmentDataRow;