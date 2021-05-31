// @ts-check

class DayDate {
    backbone = DayDate.nowDate;

    /** Construct a new DayDate, if the parameters are invalid or unused, it defaults to today.
     * @param {number} [day] Day of the month 1-31
     * @param {number} [month] Month index (zero-indexed) 
     * @param {number} [year] Full 4-digit year */
    constructor(day,month,year) {
        if (DayDate.isDayMonthYearValid(day,month,year))
            this.set(day,month,year);
    }

    set json(data) {
        var day, month, year;
        day = data % 31 + 1; data /= 31;
        month = data % 12; data /= 12;
        year = data;
        this.set(day,month,year);
    }
    get json() {
        var {day, month, year} = this.get();
        return year*12*31 + 31*month + day - 1;
    }

    /** Set the date of the dayDate object.
     * @param {number} day Day of the month 1-31
     * @param {number} month Month index (zero-indexed) 
     * @param {number} year Full 4-digit year */
    set(day,month,year) {
        this.backbone = new Date(Date.UTC(year,month,day));
    }
    /** Get the full date information from this. */
    get() {
        var year = this.year, month = this.month, day = this.day;
        return {day,month,year};
    }
    /** The date's 4-digit year. */
    get year() { return this.backbone.getUTCFullYear() }
    /** The date's month index (zero-indexed) */
    get month() { return this.backbone.getUTCMonth() }
    /** The date's day-of-the-month (ranged 1-31 inclusive)*/
    get day() { return this.backbone.getUTCDate() }

    /** Get a DayDate object representing today. */
    static get today() { return new DayDate(); }

    /** @private */
    static get nowDate() {
        var now = new Date();
        return new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()));
    }
    /** @private @param {number} day @param {number} month @param {number} year */
    static isDayMonthYearValid(day,month,year) {
        return (
            typeof(year)==="number" &&
            typeof(month)==="number" &&
            typeof(day)==="number" && 
            month < 12 && month >= 0 && 
            day <= 31 && day > 0 &&
            year >= 1000
        );
    }
}

export default DayDate;