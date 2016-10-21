import { Component, Property } from 'immutable-ics'
import values from 'lodash.values'
import capitalize from 'lodash.capitalize'
import guid from 'simple-guid'

const PRODID = 'angeloashmore/mypage-to-ics'

const buildAlarm = (trigger) => new Component({
  name: 'VALARM',
  properties: [
    new Property({ name: 'ACTION', value: 'DISPLAY' }),
    new Property({ name: 'TRIGGER', value: trigger }),
    new Property({ name: 'DESCRIPTION', value: 'Event Reminder' })
  ]
})

const buildEvent = (segments) => {
  const { startDate, startTime } = segments[0]
  const { endDate, endTime } = segments[segments.length - 1]

  const start = new Date(`${startDate} ${startTime}`)
  const end = new Date(`${endDate} ${endTime}`)

  const summary = ` ${startTime} - ${endTime}`

  const description = segments.map((segment) => {
    const {
      endTime,
      shiftSegmentDisplayName: name,
      shiftSegmentType: type,
      startTime
    } = segment

    return `${startTime} - ${endTime}: ${name || capitalize(type)}`
  }).join('\n')

  return new Component({
    name: 'VEVENT',
    properties: [
      new Property({ name: 'UID', value: guid() }),
      new Property({ name: 'SUMMARY', value: summary }),
      new Property({ name: 'DESCRIPTION', value: description }),
      new Property({ name: 'LOCATION', value: 'Apple Store' }),
      new Property({ name: 'DTSTAMP', value: start }),
      new Property({ name: 'DTSTART', value: start }),
      new Property({ name: 'DTEND', value: end })
    ],
    components: [
      buildAlarm('-P1D'),
      buildAlarm('-PT12H')
    ]
  })
}

const buildCalendar = (schData) => (
  new Component({
    name: 'VCALENDAR',
    properties: [
      new Property({ name: 'VERSION', value: 2 }),
      new Property({ name: 'PRODID', value: PRODID })
    ],
    components: values(schData).map(buildEvent)
  })
)

export default buildCalendar
