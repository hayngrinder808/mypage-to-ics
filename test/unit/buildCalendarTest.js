import assert from 'assert'
import path from 'path'
import { readFileSync } from 'fs'
import { describe, it } from 'mocha'
import buildCalendar from '../../src/buildCalendar'

const fixturesPath = path.join(__dirname, '..', 'fixtures')

const removeUIDs = (string) => string.replace(/UID:[0-9A-Z-]*/g, 'UID:')

describe('buildCalendar', () => {
  it('should return valid iCalendar data from sample schedule data', () => {
    const schedulePath = path.join(fixturesPath, 'sample.json')
    const icsPath = path.join(fixturesPath, 'sample.ics')

    const schedule = JSON.parse(readFileSync(schedulePath, 'utf8'))
    const calendar = buildCalendar(schedule)

    const ics = readFileSync(icsPath, 'utf8')

    assert.equal(
      removeUIDs(calendar.toString()),
      removeUIDs(ics)
    )
  })
})
