// JavaScript dependencies
const dependencies = {
  "moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js",
  "ics": "https://cdn.rawgit.com/angeloashmore/ics-js/master/ics.es5.min.js"
};

// Load dependencies and run app();
$.getScript(dependencies["moment"], () => {
  $.getScript(dependencies["ics"], () => {
    const app = new App();
    app.execute();
  });
});

class App {
  constructor() {
    this.ics = new ICS();
    this.baseDate = null;
  }

  createEventFromElement(element) {
    const dayOfWeek = $(element).children("td.day:first").text().trim();
    const startTime = $(element).children("td.time:first").text().trim();
    const endTime = $(element).children("td.time:nth-child(5)").text().trim();

    const shift = new Shift(this.baseDate, dayOfWeek, startTime, endTime);

    const event = new ICSEvent();
    event.subject = `You work at ${startTime}`;
    event.description = "";
    event.location = "Apple Store Ala Moana";
    event.start = shift.start;
    event.end = shift.end;

    this.ics.events.push(event);
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

class Shift {
  static momentFormat = "MMM D, YYYY h:mmA";

  constructor(date, dayOfWeek, startTime, endTime) {
    const weekdays = moment.weekdays();
    weekdays.unshift(weekdays.pop());

    const start = moment(`${date} ${startTime}`, Shift.momentFormat);
    start.add(weekdays.indexOf(dayOfWeek), "days");

    const end = moment(`${date} ${endTime}`, Shift.momentFormat);
    end.add(weekdays.indexOf(dayOfWeek), "days");
    if (end.isBefore(start)) end.add(1, "days");

    this.start = start.toDate();
    this.end = end.toDate();
  }
}
