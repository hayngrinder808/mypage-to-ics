import ICS from 'ics-js';
import Shift from 'shift';

export default class App {
  constructor() {
    this.cal = new ICS.components.VCALENDAR();
    this.baseDate = null;
  }

  validWindowLocation() {
    const l = window.location;

    if (l.host == "mypage.apple.com" &&
        (l.pathname == "/myPage/myTime.action" ||
         l.pathname == "/myPage/kronosSchedule.action")) {
      return true;
    } else {
      return false;
    }
  }

  createEventFromElement(element) {
    const dayOfWeek = $(element).children("td.day:first").text().trim();
    const startTime = $(element).children("td.time:first").text().trim();
    const endTime = $(element).children("td.time:nth-child(5)").text().trim();

    const shift = new Shift(this.baseDate, dayOfWeek, startTime, endTime);

    const event = new ICS.component.VEVENT();
    event.addProp(new ICS.Property("SUBJECT", `You work at ${startTime}`));
    event.addProp(new ICS.Property("LOCATION", `Apple Store`));
    event.addProp(new ICS.Property("DTSTART", shift.start));
    event.addProp(new ICS.Property("DTEND", shift.end));

    this.cal.addComponent(event);
  }

  execute() {
    if (!this.validWindowLocation()) {
      alert("Please run this script on the MyPage Schedule page.");
      return;
    }

    const scheduleContainer = $("#pane1 > table:nth-child(2) > tbody > tr:first > td:nth-child(2)");
    const header = scheduleContainer.find("table:first > tbody > tr:nth-child(2) > td:first");
    const shifts = scheduleContainer.find("table:nth-child(2) > tbody > tr:not(.disable)");

    this.baseDate = header.text().slice(15).trim();

    shifts.each((_, element) => this.createEventFromElement(element));

    ICS.toBase64(this.cal.toString())
      .then(result => window.location = result);
  }
}
