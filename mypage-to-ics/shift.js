import moment from 'moment';

export default class Shift {
  static momentFormat = "MMM D, YYYY h:mmA";

  static weekdays = function() {
    const weekdays = moment.weekdays();
    weekdays.unshift(weekdays.pop());
    return weekdays;
  }

  constructor(date, dayOfWeek, startTime, endTime) {
    const start = moment(`${date} ${startTime}`, Shift.momentFormat);
    start.add(Shift.weekdays().indexOf(dayOfWeek), "days");

    const end = moment(`${date} ${endTime}`, Shift.momentFormat);
    end.add(Shift.weekdays().indexOf(dayOfWeek), "days");
    if (end.isBefore(start)) end.add(1, "days");

    this.start = start.toDate();
    this.end = end.toDate();
  }
}
