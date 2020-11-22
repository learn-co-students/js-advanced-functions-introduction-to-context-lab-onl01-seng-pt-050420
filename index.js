function createEmployeeRecord(data) {
    let newEmployee = {}
    newEmployee.firstName = data[0]
    newEmployee.familyName = data[1]
    newEmployee.title = data[2]
    newEmployee.payPerHour = data[3]
    newEmployee.timeInEvents = []
    newEmployee.timeOutEvents = []
    return newEmployee
}

function createEmployeeRecords(data) {
    return data.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, datestamp) {
    let event = {}
    event.type = "TimeIn"
    event.date = datestamp.split(" ")[0]
    event.hour = parseInt(datestamp.split(" ")[1])
    employee.timeInEvents.push(event)
    return employee
}

function createTimeOutEvent(employee, datestamp) {
    let event = {}
    event.type = "TimeOut"
    event.date = datestamp.split(" ")[0]
    event.hour = parseInt(datestamp.split(" ")[1])
    employee.timeOutEvents.push(event)
    return employee
}

function hoursWorkedOnDate(employee, datestamp) {
    let timeIn = employee.timeInEvents.find(e => e.date == datestamp)
    let timeOut = employee.timeOutEvents.find(e => e.date == datestamp)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employee, datestamp) {
    return hoursWorkedOnDate(employee, datestamp) * employee.payPerHour
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(e => e.date)
    return dates.reduce(function(total, date) { 
        return wagesEarnedOnDate(employee, date) + total
    },0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(e => e.firstName == firstName)
}

function calculatePayroll(employees) {
    return  employees.reduce(function(total, employee) {
        return total + allWagesFor(employee)
    }, 0)
}