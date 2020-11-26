// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(function(inner_arr) {
        return createEmployeeRecord(inner_arr)
    })
}

function createTimeInEvent(employee, dt) {
    let [date, hour] = dt.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}


function createTimeOutEvent(employee, dt) {
    let [date, hour] = dt.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let inE = employee.timeInEvents.find(function(e) { return e.date === date })
    let outE = employee.timeOutEvents.find(function(e) { return e.date === date })
    return (outE.hour - inE.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(employee) {
    let work = employee.timeInEvents.map(function(e) { return e.date })
    let payment = work.reduce(function(x, date) {
        return x + wagesEarnedOnDate(employee, date)
    }, 0)
    return payment
}

function findEmployeeByFirstName(array, firstName) {
    return array.find(function(rec) {
        return rec.firstName === firstName
    })
}

function calculatePayroll(array) {
    return array.reduce(function(x, r) {
        return x + allWagesFor(r)
    }, 0)
}