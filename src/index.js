import ICS from 'ics-js'
import { CALENDAR } from 'constants'
import { buildEvent, getShifts, validateLocation } from 'actions'

try {
  validateLocation()

  const calendar = new ICS.VCALENDAR()

  calendar.addProp('VERSION', CALENDAR.VERSION)
  calendar.addProp('PRODID', CALENDAR.PRODID)

  const shifts = getShifts()

  shifts.forEach((shift) => {
    calendar.addComponent(buildEvent(shift))
  })

  calendar.toBase64()
    .then((result) => {
      window.location = result
    })
} catch (error) {
  console.error(error)

  if (error instanceof URIError) {
    window.alert('Please run this script on MyPage Schedule.')
  } else {
    window.alert('An error occured while parsing your schedule.')
  }
}
