import buildCalendar from './buildCalendar'

const hrefRegExp = /^https:\/\/mypage.apple.com\/myPage\/myTime.*/

if (!window.location.href.match(hrefRegExp)) {
  window.alert('Please run this script on myPage Time Overview.')
} else {
  try {
    const schDataEl = document.getElementById('schData')
    const schData = JSON.parse(schDataEl.value)

    const calendar = buildCalendar(schData)
    const base64Data = window.btoa(calendar.toString())

    window.location = `data:text/calendar;base64,${base64Data}`
  } catch (error) {
    window.alert('An error occured while parsing your schedule.')
    console.error(error)
  }
}
