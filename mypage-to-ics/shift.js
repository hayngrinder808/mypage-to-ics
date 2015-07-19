export default class Shift {
  static days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  constructor(date, day, startTime, endTime) {
    const daysToAdd = Shift.days.indexOf(day);

    const startDate = new Date(`${date} ${Shift._timeFormatter(startTime)}`);
    let start = Shift._addDays(startDate, daysToAdd);

    const endDate = new Date(`${date} ${Shift._timeFormatter(endTime)}`);
    let end = Shift._addDays(endDate, daysToAdd);

    if (end < start) end = Shift._addDays(end, 1);

    this.start = start;
    this.end = end;
  }

  static _timeFormatter(time) {
    return `${time.slice(0, -2)} ${time.slice(-2)}`;
  }

  static _addDays(date, qty) {
    return new Date(date.getTime() + qty * 86400000);
  }
}
