// @ts-check
import Translate from "../../../common/lang/Translate";
import DayDate from "../../../common/util/DayDate";

class Assignment {
    name = Assignment.defaultName;
    due = Assignment.defaultDue;
    subject = Assignment.defaultSubject;
    description = Assignment.defaultDescription;
    link = Assignment.defaultLink;
    
    reactKey = Math.floor(Math.random()*0x1fffffffffffff).toString(36);

    get json() { return {
        name:    this.name,
        subject: this.subject,
        link:    this.link,
        description:    this.description,
        due:     this.due.json
    }; }
    set json(data) {
        var { name, subject, link, due, description } = data;
        this.name        = name           ? name.trim()           : Assignment.defaultName;
        this.subject     = subject        ? subject.trim()        : Assignment.defaultSubject;
        this.link        = link           ? link.trim()           : Assignment.defaultLink;
        this.description = description    ? description.trim()    : Assignment.defaultDescription;
        this.due.json = due;
    }

    validate() {
        var {name, due, link, subject, description} = this;
        if (typeof(name)!=="string"||typeof(link)!=="string"||typeof(description)!=="string"||typeof(subject)!=="string" || !due || !(due instanceof DayDate))
            return ["!!type mismatch or missing data"];
        /** @type {string[]} */
        var errors = [];
        if (name.length === 0 || name.length > 25) errors.push("!!name len 1-25");
        if (subject.length > 25) errors.push("!!subject len must be <= 25");
        if (name.length > 200) errors.push("!!name len must be <= 200");
        if (description.length > 200) errors.push("!!name len must be <= 200");
        return errors;
    }

    static get defaultName() { return Translate.text("hw-tracker.default-name"); }
    static get defaultDue() { return DayDate.today; }
    static get defaultSubject() { return ""; }
    static get defaultDescription() { return ""; }
    static get defaultLink() { return ""; }
}


export default Assignment;