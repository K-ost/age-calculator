
// Nodes
const formAge = document.querySelector('#formAge')
const formBtn = document.querySelector('#formBtn')
const inputDay = document.querySelector('#inputDay')
const inputMonth = document.querySelector('#inputMonth')
const inputYear = document.querySelector('#inputYear')
const nodeYears = document.querySelector('.result_information-years')
const nodeMonths = document.querySelector('.result_information-months')
const nodeDays = document.querySelector('.result_information-days')

// State
let valueDay = ''
let valueMonth = ''
let valueYear = ''

// Current year
const averageDaysYear = 365.25
const averageDaysMonth = 30.4375
const currentYear = new Date().getFullYear()


// Change Function
function changeFunction(el, value, num, string) {
  if (Number(value) > num) {
    el.closest('.form-line').classList.add('error')
    el.nextElementSibling.textContent = `Must be ${string}`
  } else if (isNaN(value)) {
    el.closest('.form-line').classList.add('error')
    el.nextElementSibling.textContent = `Must be only numbers`
  } else if (!value) {
    el.closest('.form-line').classList.add('error')
    el.nextElementSibling.textContent = 'This field is required'
  } else {
    el.closest('.form-line').classList.remove('error')
    return value
  }
}

// Change events
inputDay.addEventListener('input', e => {
  valueDay = changeFunction(inputDay, e.target.value, 31, 'a valid day')
})
inputMonth.addEventListener('input', e => {
  valueMonth = changeFunction(inputMonth, e.target.value, 12, 'a valid month')
})
inputYear.addEventListener('input', e => {
  valueYear = changeFunction(inputYear, e.target.value, currentYear, 'in the past')
})



// Animate
function animateNumbers(result, node) {
  let duration = Math.floor(1000 / result)
  let start = 0
  const animate = setInterval(() => {
    start += 1
    node.innerHTML = start
    if (start >= result) {
      clearInterval(animate)
    }
  }, duration)
}



// Submit event
formAge.addEventListener('submit', e => {
  e.preventDefault()

  // remove errors
  // document.querySelectorAll('.form-line').forEach(el => el.classList.remove('error'))

  // if clause
  if (!valueDay.length || !valueMonth.length || !valueYear.length) {
    if (!valueDay.length) {
      inputDay.closest('.form-line').classList.add('error')
    }
    if (!valueMonth.length) {
      inputMonth.closest('.form-line').classList.add('error')
    }
    if (!valueYear.length) {
      inputYear.closest('.form-line').classList.add('error')
    }
    return false
  }

  // Months and days errors
  if (
    valueMonth === '02' && valueDay > 29 || valueDay === '31' && (valueMonth === '04' || 
    valueMonth === '06' || valueMonth === '09' || valueMonth === '11') ||
    valueMonth === '2' && valueDay > 29 || valueDay === '31' && (valueMonth === '4' || 
    valueMonth === '6' || valueMonth === '9' || valueMonth === '11')
  ) {
    inputDay.closest('.form-line').classList.add('error')
    inputDay.nextElementSibling.textContent = 'Incorrect date'
    return false
  }

  // Get dates
  const typedDate = new Date(`${valueMonth}-${valueDay}-${valueYear}`)
  const currentDate = new Date(Date.now())

  // Future date
  if (typedDate > currentDate) {
    inputDay.closest('.form-line').classList.add('error')
    inputDay.nextElementSibling.textContent = 'Must be in the past'
    inputMonth.closest('.form-line').classList.add('error')
    inputMonth.nextElementSibling.textContent = 'Must be in the past'
    return false
  }

  // Calculate dates
  const resultInDays = Math.ceil(Math.abs(currentDate.getTime() - typedDate.getTime()) / (1000 * 3600 * 24))
  const typedDay = Number(inputDay.value)
  const currentDay = currentDate.getDate()
  const typedMonth = Number(inputMonth.value)
  const currentMonth = currentDate.getMonth() + 1
  let resultDays = resultFunction(resultInDays).daysRest
  let resultMonths = resultFunction(resultInDays).months
  let resultYears = resultFunction(resultInDays).years

  
  // Show results
  if (resultInDays <= 365) {
    nodeYears.innerHTML = 0
   } else {
    animateNumbers(resultYears, nodeYears)
  }

  if (resultInDays <= 30 || typedMonth === currentMonth) {
    nodeMonths.innerHTML = 0
  } else {
    animateNumbers(resultMonths, nodeMonths)
  }

  if (resultInDays <= 1 || typedDay === currentDay) {
    nodeDays.innerHTML = 0
  } else {
    animateNumbers(resultDays - 1, nodeDays)
  }

})


// resultFunction
function resultFunction(days) {
  let daysRest = 0
  let months = 0
  let years = 0

  if (days <= 30) {
    daysRest = days
  }
  if (days > 30 && days <= averageDaysYear) {
    months = Math.floor(days / averageDaysMonth)
    daysRest = days - (months * averageDaysMonth)
  }
  if (days > 365) {
    years = Math.floor(days / averageDaysYear)
    restDays = days - years * averageDaysYear
    months = Math.floor(restDays / averageDaysMonth)
    daysRest = restDays - (months * averageDaysMonth)
  }
  return { daysRest, months, years }
}



