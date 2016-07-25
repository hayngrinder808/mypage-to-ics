import { Component, Property } from 'immutable-ics'
import values from 'lodash.values'
import flatMap from 'lodash.flatmap'
import guid from 'simple-guid'

const PRODID = 'angeloashmore/mypage-to-ics'

const buildAlarm = (startTime, trigger) => new Component({
  name: 'VALARM',
  properties: [
    new Property({ name: 'ACTION', value: 'DISPLAY' }),
    new Property({ name: 'TRIGGER', value: trigger }),
    new Property({ name: 'DESCRIPTION', value: `You work at ${startTime}` })
  ]
})

const buildEvent = (segment, index) => {
  const {
    endDate,
    endTime,
    shiftSegmentDisplayName: name,
    shiftSegmentType: type,
    startDate,
    startTime
  } = segment

  const start = new Date(`${startDate} ${startTime}`)
  const end = new Date(`${endDate} ${endTime}`)

  let event = new Component({
    name: 'VEVENT',
    properties: [
      new Property({ name: 'UID', value: guid() }),
      new Property({ name: 'SUMMARY', value: name || type }),
      new Property({ name: 'LOCATION', value: 'Apple Store' }),
      new Property({ name: 'DTSTAMP', value: start }),
      new Property({ name: 'DTSTART', value: start }),
      new Property({ name: 'DTEND', value: end })
    ]
  })

  if (index === 0) {
    event = event.pushComponent(buildAlarm(startTime, '-P1D'))
                 .pushComponent(buildAlarm(startTime, '-PT12H'))
  }

  return event
}

const buildCalendar = (schData) => (
  new Component({
    name: 'VCALENDAR',
    properties: [
      new Property({ name: 'VERSION', value: 2 }),
      new Property({ name: 'PRODID', value: PRODID })
    ],
    components: flatMap(
      values(schData),
      (segments) => segments.map(buildEvent)
    )
  })
)

export default buildCalendar
