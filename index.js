let createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(records) {
    return records.map(function(array) {
        return createEmployeeRecord(array)
    })
}

let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, theDate) {
    let clockIn = employee.timeInEvents.find(function(e) {
        return e.date === theDate
    })
    let clockOut = employee.timeOutEvents.find(function(e) {
        return e.date === theDate
    })
    return (clockOut.hour - clockIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, theDate) {
    let grossWage = hoursWorkedOnDate(employee, theDate) * employee.payPerHour
    return parseFloat(grossWage.toString())
}

let allWagesFor = function(employee) {
    let daysWorked = employee.timeInEvents.map(function(e) {
        return e.date
    })
    let payable = daysWorked.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

let findEmployeeByFirstName = function(firstArray, firstName) {
    return firstArray.find(function(rec) {
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(employeeRecordArray) {
    return employeeRecordArray.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}