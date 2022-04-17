//DOM items
const clockDisplay = document.getElementById('clockTime')
const clockDisplayDate = document.getElementById('clockDate')
const clockAmOrPm = document.getElementById('clockAmOrPm')
const styleButton = document.getElementById('styleChanger')
const body = document.getElementById('body')
const alarmAlertText = document.getElementById('alarmAlertText')

//Variables
let today
let hours
let minutes
let seconds
let day
let month
let year
let stopWatchMinutes
let stopWatchSeconds
let stopWatchTrigger = 0
let stopwatchTime
let alarmTime = null
let alarmTimeout = null
let audio = new Audio('./audio/alarm.mp3')
audio.loop = true
let changeStyle = 0
let alarmString

//Aray to convert month number to month name
let monthNames = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']


// function to get the current time and keep the HTML always up to date
function clock(){
    //Get time
    today = new Date()
    hours = addZero(today.getHours());
    minutes = addZero(today.getMinutes());
    seconds = addZero(today.getSeconds());

    //Get date
    day = addZero(today.getDay() + 10);
    month = today.getMonth();
    year = today.getFullYear();

    //decide if the time is AM or PM
    if (hours >= 12){
        clockAmOrPm.innerHTML = 'PM'
    }
    if (hours >= 0 && hours < 12){
        clockAmOrPm.innerHTML = 'AM'
    }

    //Write in html
    clockDisplayDate.innerText = `${day}/${monthNames[month]}/${year}`
    clockDisplay.innerText = `${hours}:${minutes}:${seconds}`

}

//Function to add zero to the number if it is less than 10
function addZero(time){
    if(time < 10){
        return '0' + time
    }
    return time
}

//Function to change page style to dark or light mode
function styleChange(){
    changeStyle ++
    changeStyle = changeStyle % 2
    //Change style of the page case is pair to dark theme
    if (changeStyle == 0){
        body.style.backgroundColor = '#000000'
        clockDisplay.style.color = '#d4d41e'
        clockDisplayDate.style.color = '#ffffff'
        clockAmOrPm.style.color = '#aaaaaa'
        alarmAlertText.style.color = '#e94040'
        styleButton.innerText = 'Light mode'
    }
    //Change style of the page case ir odd from light theme
    if (changeStyle != 0){
        body.style.backgroundColor = '#ffffff'
        clockDisplay.style.color = '#bbbb19'
        clockDisplayDate.style.color = '#000000'
        alarmAlertText.style.color = '#790000'
        clockAmOrPm.style.color = '#000000'
        styleButton.innerText = 'Dark mode'
    }
}
//Function to take alarm timer
function alarm(value){
    alarmTime = value
    alarmString = alarmTime
    toString(alarmString)
}

//Function to make alarm work
function setAlarm(){
    //To show alarm date and time
    alarmAlertText.innerText = `ALARM SET TO: ${alarmString.slice(8,10)}/${alarmString.slice(5,7)}/${alarmString.slice(0,4)} AT ${alarmString.slice(11,16)}`
    if(alarmTime){
        const current = new Date()
        const timeToAlarm = new Date(alarmTime)

        if(timeToAlarm > current){
            const timeout = timeToAlarm.getTime() - current.getTime()
            alarmTimeout = setTimeout(() => audio.play(), timeout)
            }
        }
    }


//Function to clear Alarm and stop sound
function clearAlarm(){
    audio.pause()
    if (alarmTimeout){
        clearTimeout(alarmTimeout)
        alarmAlertText.innerText = ''
    }
}

//Interval to make clock all the time updated
setInterval(clock,1000)
