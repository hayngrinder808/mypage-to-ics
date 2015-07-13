const DaysOfWeek = {
  Saturday: 0,
  Sunday: 1,
  Monday: 2,
  Tuesday: 3,
  Wednesday: 4,
  Thursday: 5,
  Friday: 6
}

const Meridiem = {
  AM: "AM",
  PM: "PM"
}

class Shift {
  constructor(dateString, dayOfWeek, startTimeString, endTimeString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + DaysOfWeek[dayOfWeek]);

    const start = new Date(date);
    const startTime = new Time(startTimeString);
    start.setTime(start.getTime() + startTime.millisecondsElapsed())
    this.start = start;

    const end = new Date(date);
    const endTime = new Time(endTimeString);
    end.setTime(end.getTime() + endTime.millisecondsElapsed());
    if (startTime.meridiem == Meridiem.PM && endTime.meridiem == Meridiem.AM) {
      end.setTime(end.getTime() + (24 * 60 * 60 * 1000));
    }
    this.end = end;
  }
}

class Time {
  constructor(time) {
    const splitTime = time.slice(0, -2).split(":");
    const meridiem = time.slice(-2).toUpperCase();

    this.hour = parseInt(splitTime[0]) + (meridiem == Meridiem.PM ? 12 : 0);
    this.minutes = parseInt(splitTime[1]);
    this.seconds = parseInt(splitTime[2] || 0);
  }

  meridiem() {
    return this.hour < 12 ? Meridiem.AM : Meridiem.PM;
  }

  secondsElapsed() {
    return this.hour * 60 * 60 + this.minutes * 60 + this.seconds;
  }

  millisecondsElapsed() {
    return this.secondsElapsed() * 1000;
  }
}

function app() {
  const scheduleContainer = $("#pane1 > table:nth-child(2) > tbody > tr:first > td:nth-child(2)");
  const header = scheduleContainer.find("table:first > tbody > tr:nth-child(2) > td:first");
  const shifts = scheduleContainer.find("table:nth-child(2) > tbody > tr:not(.disable)");

  const baseDate = header.text().slice(15).trim();

  const ics = new ICS();

  shifts.each(function() {
    const dayOfWeek = $(this).children("td.day:first").text().trim();
    const startTime = $(this).children("td.time:first").text().trim();
    const endTime = $(this).children("td.time:nth-child(5)").text().trim();

    const shift = new Shift(baseDate, dayOfWeek, startTime, endTime);

    const event = new ICSEvent();
    event.subject = `You work at ${startTime}`;
    event.description = "";
    event.location = "Apple Store, Ala Moana";
    event.start = shift.start;
    event.end = shift.end;

    ics.events.push(event);
  });

  ics.toBase64((result) => window.location = result);
}

const icsJSURL = "https://rawgit.com/angeloashmore/ics-js/master/ics.es5.min.js";
$.getScript(icsJSURL, () => app());
