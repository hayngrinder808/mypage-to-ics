import ICS from 'ics-js';
import {CALENDAR} from 'constants';
import {
  buildEvent,
  getShifts,
  validateLocation
} from 'actions';

try {
  validateLocation();

  const calendar = new ICS.VCALENDAR();

  calendar.addProp('VERSION', CALENDAR.VERSION);
  calendar.addProp('PRODID', CALENDAR.PRODID);

  const shifts = getShifts();

  shifts.forEach((shift) => {
    calendar.addComponent(buildEvent(shift));
  });

  calendar.toBase64()
    .then((result) => {
      window.location = result;
    });
} catch (error) {
  console.error(error); // eslint-disable-line no-console

  if (error instanceof URIError) {
    alert('Please run this script on MyPage Schedule.'); // eslint-disable-line no-alert
  } else {
    alert('An error occured while parsing your schedule.'); // eslint-disable-line no-alert
  }
}
