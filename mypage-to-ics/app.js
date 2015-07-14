import ICS from 'ics-js';
import Shift from 'shift';

export default class App {
  constructor() {
    console.log(require("ics-js"))
    this.ics = new ICS();
    this.baseDate = null;
  }

  createEventFromElement(element) {
    const dayOfWeek = $(element).children("td.day:first").text().trim();
    const startTime = $(element).children("td.time:first").text().trim();
    const endTime = $(element).children("td.time:nth-child(5)").text().trim();

    const shift = new Shift(this.baseDate, dayOfWeek, startTime, endTime);

    const event = new ICS.Event();
    event.subject = `You work at ${startTime}`;
    event.description = "";
    event.location = "Apple Store Ala Moana";
    event.start = shift.start;
    event.end = shift.end;

    this.ics.addEvent(event)
  }

  execute() {
    const scheduleContainer = $("#pane1 > table:nth-child(2) > tbody > tr:first > td:nth-child(2)");
    const header = scheduleContainer.find("table:first > tbody > tr:nth-child(2) > td:first");
    const shifts = scheduleContainer.find("table:nth-child(2) > tbody > tr:not(.disable)");

    this.baseDate = header.text().slice(15).trim();

    shifts.each((_, element) => this.createEventFromElement(element));

    this.ics.toBase64((result) => window.location = result);
  }
}
