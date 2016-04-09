export default class Shift {
  static days = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ];

  constructor (date, day, startTime, endTime) {
    let end;

    const daysToAdd = Shift.days.indexOf(day);
    const startDate = new Date(date + ' ' + Shift.timeFormatter(startTime));
    const endDate = new Date(date + ' ' + Shift.timeFormatter(endTime));

    const start = Shift.addDays(startDate, daysToAdd);

    end = Shift.addDays(endDate, daysToAdd);

    if (end < start) {
      end = Shift.addDays(end, 1);
    }

    this.start = start;
    this.end = end;
    this.startTimeRaw = startTime;
    this.endTimeRaw = endTime;
  }

  static timeFormatter (time) {
    return time.slice(0, -2) + ' ' + time.slice(-2);
  }

  static addDays (date, qty) {
    return new Date(date.getTime() + qty * 86400000);
  }
}
