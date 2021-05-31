// @ts-check
import DayDate from "../../../common/util/DayDate";

class Assignment {
    name = Assignment.defaultName;
    due = Assignment.defaultDue;
    subject = Assignment.defaultSubject;
    link = Assignment.defaultLink;
    
    reactKey = Math.floor(Math.random()*0x1fffffffffffff).toString(36);

    get json() { return {
        name:    this.name,
        subject: this.subject,
        link:    this.link,
        due:     this.due.json
    }; }
    set json(data) {
        var { name, subject, link, due } = data;
        this.name     = name;
        this.subject  = subject;
        this.link     = link;
        this.due.json = due;
    }

    static get defaultName() { return "assignment"; }
    static get defaultDue() { return DayDate.today; }
    static get defaultSubject() { return ""; }
    static get defaultLink() { return ""; }
}


export default Assignment;