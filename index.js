// Your code here
const createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(arr) {
    return arr.map(data => {
        return createEmployeeRecord(data)
    })
}

const createTimeInEvent = function(obj, date) {
    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.slice(11,15)),
        date: date.slice(0, 10)
    })
    return obj
}

const createTimeOutEvent = function(obj, date) {
    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.slice(11,15)),
        date: date.slice(0, 10)
    })
    return obj
}

const hoursWorkedOnDate = function(obj, date) {
    const timeIn = obj.timeInEvents.find(time => time.date === date)
    const timeOut = obj.timeOutEvents.find(time => time.date === date)

    return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = function(obj, date) {
    return hoursWorkedOnDate(obj, date) * obj.payPerHour
}

const allWagesFor = function(obj) {
    return obj.timeInEvents.reduce((total, timeIn) => {
        return total + wagesEarnedOnDate(obj, timeIn.date)
    }, 0)
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(data => data.firstName === firstName)
}

const calculatePayroll = function(arr) {
    return arr.reduce((total, employee) => {
        return total + allWagesFor(employee)
    }, 0)
}