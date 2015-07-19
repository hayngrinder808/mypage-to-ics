import ICS from 'ics-js';
import Shift from 'shift';

export default class App {
  constructor() {
    this.state = {
      cal: null,
      baseDate: null
    };

    this.setupCal();
  }

  setupCal() {
    const cal = new ICS.components.VCALENDAR();
    cal.addProp(new ICS.property.VERSION(2));
    cal.addProp(new ICS.property.PRODID("Angelo Ashmore"));

    this.state.cal = cal;
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

    const event = new ICS.components.VEVENT();
    event.addProp(new ICS.properties.UID(Date.now()));
    event.addProp(new ICS.properties.DTSTAMP(Date.now()));
    event.addProp(new ICS.properties.SUMMARY(`You work at ${startTime}`));
    event.addProp(new ICS.properties.LOCATION("Apple Store"));
    event.addProp(new ICS.properties.DTSTART(shift.start));
    event.addProp(new ICS.properties.DTEND(shift.end));

    this.state.cal.addComponent(event);
  }

  execute() {
    if (!this.validWindowLocation()) {
      alert("Please run this script on the MyPage Schedule page.");
      return;
    }

    const scheduleContainer = $("#pane1 > table:nth-child(2) > tbody > tr:first > td:nth-child(2)");
    const header = scheduleContainer.find("table:first > tbody > tr:nth-child(2) > td:first");
    const shifts = scheduleContainer.find("table:nth-child(2) > tbody > tr:not(.disable)");

    this.state.baseDate = header.text().slice(15).trim();

    shifts.each((_, element) => this.createEventFromElement(element));

    ICS.toBase64(this.state.cal.toString())
      .then(result => window.location = result);
  }
}
