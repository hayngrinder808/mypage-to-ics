import ICS from 'ics-js';
import Shift from './shift';

export default class App {
  constructor() {
    this.state = {
      calendar: this.createCalendar()
    };
  }

  createCalendar() {
    const cal = new ICS.VCALENDAR();
    cal.addProp("VERSION", 2);
    cal.addProp("PRODID", "Angelo Ashmore");
    return cal;
  }

  execute() {
    try {
      const { calendar } = this.state;

      App.validateLocation();

      const shifts = App.getShifts();
      shifts.each((_, element) => this.addEventFromElement(element));

      ICS.toBase64(calendar.toString())
        .then(result => window.location = result);

    } catch (e) {
      console.error(e);

      if (e instanceof URIError) {
        alert("Please run this script on MyPage Schedule.");
        return;
      }

      alert("An error occured while parsing your schedule.");
    }
  }

  addEventFromElement(element) {
    const { calendar } = this.state;

    const baseDate = App.getBaseDate();
    const { day, start, end } = App.extractShiftData(element);
    const shift = new Shift(baseDate, day, start, end);

    const event = new ICS.VEVENT();
    event.addProp("UID");
    event.addProp("DTSTAMP", new Date(Date.now()));
    event.addProp("SUMMARY", `You work ${start}–${end}`);
    event.addProp("LOCATION", "Apple Store");
    event.addProp("DTSTART", shift.start);
    event.addProp("DTEND", shift.end);

    const alarm_1d = new ICS.VALARM();
    alarm_1d.addProp("ACTION", "DISPLAY");
    alarm_1d.addProp("TRIGGER", "-P1D");
    alarm_1d.addProp("DESCRIPTION", "Event reminder");

    const alarm_12h = new ICS.VALARM();
    alarm_12h.addProp("ACTION", "DISPLAY");
    alarm_12h.addProp("TRIGGER", "-PT12H");
    alarm_12h.addProp("DESCRIPTION", "Event reminder");

    const todo = new ICS.VTODO();
    todo.addProp("UID");
    todo.addProp("DTSTAMP", shift.start);
    todo.addProp("DUE", shift.end);
    todo.addProp("SUMMARY", `Clock out for ${start}–${end} shift`);
    todo.addProp("CATEGORIES", "WORK");

    const alarm_todo = new ICS.VALARM();
    alarm_todo.addProp("ACTION", "DISPLAY");
    alarm_todo.addProp("TRIGGER", "-PT5M");
    alarm_todo.addProp("DESCRIPTION", "To do reminder");

    event.addComponent(alarm_1d);
    event.addComponent(alarm_12h);
    todo.addComponent(alarm_todo);
    calendar.addComponent(todo);
    calendar.addComponent(event);
  }

  static validateLocation() {
    const { host, pathname } = window.location;
    if (host != "mypage.apple.com" &&
        (pathname != "/myPage/myTime.action" ||
         pathname != "/myPage/kronosSchedule.action")) {
      throw new URIError("Not on MyPage Schedule");
    }
  }

  static getScheduleContainer() {
    return $("#pane1 > table:nth-child(2) > tbody > tr:first > td:nth-child(2)");
  }

  static getShifts() {
    const query = "table:nth-child(2) > tbody > tr:not(.disable)";
    return App.getScheduleContainer().find(query);
  }

  static getBaseDate() {
    const query = "table:first > tbody > tr:nth-child(2) > td:first";
    const header = App.getScheduleContainer().find(query);
    return header.text().slice(15).trim();
  }

  static extractShiftData(element) {
    const day = $(element).children("td.day:first").text().trim();
    const start = $(element).children("td.time:first").text().trim();
    const end = $(element).children("td.time:nth-child(5)").text().trim();
    return { day, start, end };
  }
}
