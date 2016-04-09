import { VALARM } from 'ics-js'
import { ALARM } from 'constants'

export default (trigger) => {
  const alarm = new VALARM()

  alarm.addProp('ACTION', ALARM.ACTION)
  alarm.addProp('TRIGGER', trigger)
  alarm.addProp('DESCRIPTION', ALARM.DESCRIPTION)

  return alarm
}
