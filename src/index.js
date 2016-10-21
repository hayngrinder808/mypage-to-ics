import buildCalendar from './buildCalendar'

const schDataEl = document.getElementById('schData')

if (!schDataEl) {
  window.alert('Please run this script on myPage Time Overview.')
} else {
  try {
    const schData = JSON.parse(schDataEl.value)

    const calendar = buildCalendar(schData)

    const blob = new Blob([calendar.toString()], { type: 'text/calendar' })

    const reader = new window.FileReader()

    const promise = new Promise((resolve, reject) => {
      reader.readAsDataURL(blob)
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = () => reject(reader.error)
      reader.onabort = () => reject()
    }).then((result) => {
      window.location = result
    })
  } catch (error) {
    window.alert('An error occured while parsing your schedule.')
    console.error(error)
  }
}
