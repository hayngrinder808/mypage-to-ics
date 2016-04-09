import ICS from 'ics-js';
import {EVENT} from 'constants';
import {buildAlarm} from 'actions';

const dtstamp = new Date(Date.now());

export default (shift) => {
  const {end, endTimeRaw, start, startTimeRaw} = shift;
  const event = new ICS.VEVENT();

  event.addProp('UID');
  event.addProp('DTSTAMP', dtstamp);
  event.addProp('SUMMARY', 'You work ' + startTimeRaw + '–' + endTimeRaw);
  event.addProp('LOCATION', EVENT.LOCATION);
  event.addProp('DTSTART', start);
  event.addProp('DTEND', end);

  event.addComponent(buildAlarm('-P1D'));
  event.addComponent(buildAlarm('-PT12H'));

  return event;
};
