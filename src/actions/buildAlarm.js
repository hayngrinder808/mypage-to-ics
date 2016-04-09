import ICS from 'ics-js';
import {ALARM} from 'constants';

export default (trigger) => {
  const alarm = new ICS.VALARM();

  alarm.addProp('ACTION', ALARM.ACTION);
  alarm.addProp('TRIGGER', trigger);
  alarm.addProp('DESCRIPTION', ALARM.DESCRIPTION);

  return alarm;
};
