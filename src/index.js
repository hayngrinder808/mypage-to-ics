import buildCalendar from './buildCalendar'

const schDataEl = document.getElementById('schData')

if (!schDataEl) {
  window.alert('Please run this script on myPage Time Overview.')
} else {
  try {
    const schData = JSON.parse(schDataEl.value)

    const calendar = buildCalendar(schData)
    const base64Data = window.btoa(calendar.toString())

    window.location = `data:text/calendar;base64,${base64Data}`
  } catch (error) {
    window.alert('An error occured while parsing your schedule.')
    console.error(error)
  }
}
