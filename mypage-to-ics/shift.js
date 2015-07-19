import days from 'days';
import dateMath from 'date-arithmetic';

export default class Shift {
  static _days = function() {
    return days.unshift(days.pop());
  }

  constructor(date, dayOfWeek, startTime, endTime) {
    const daysToAdd = Shift._days().indexOf(dayOfWeek);

    const startDate = new Date(`${date} ${Shift.timeFormatter(startTime)}`);
    const start = dateMath.add(startDate, daysToAdd, "day");

    const endDate = new Date(`${date} ${Shift.timeFormatter(endTime)}`);
    let end = dateMath(endDate, daysToAdd, "day");

    if (end < start) end = dateMath.add(end, 1, "day");

    this.start = start;
    this.end = end;
  }

  static _timeFormatter(time) {
    return `${time.slice(0, -2)} ${time.slice(-2)}`;
  }
}
