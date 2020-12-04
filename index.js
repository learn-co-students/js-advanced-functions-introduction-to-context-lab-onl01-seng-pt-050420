function createEmployeeRecord(arr){
    let obj = {}
    obj.firstName = arr[0]
    obj.familyName = arr[1]
    obj.title = arr[2]
    obj.payPerHour = arr[3]
    obj.timeInEvents = []
    obj.timeOutEvents = []
    return obj
}

function createEmployeeRecords(empArr){
    return empArr.map(function(array){
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(empObj, dateStamp){
    let obj = {}
    obj.type = "TimeIn"
    obj.date = dateStamp.slice(0, 10)
    obj.hour = Number(dateStamp.slice(-4))
    empObj.timeInEvents.push(obj)
    return empObj
}

function createTimeOutEvent(empObj, dateStamp){
    let obj = {}
    obj.type = "TimeOut"
    obj.date = dateStamp.slice(0, 10)
    obj.hour = Number(dateStamp.slice(-4))
    empObj.timeOutEvents.push(obj)
    return empObj
}

function hoursWorkedOnDate(empObj, date){
    let timeIn = empObj.timeInEvents.find(element => element.date === date).hour
    let timeOut = empObj.timeOutEvents.find(element => element.date === date).hour
    let hoursWorked = (timeOut - timeIn)/100
    return hoursWorked
}

function wagesEarnedOnDate(empObj, date){
    let hoursWorked = hoursWorkedOnDate(empObj, date)
    let payOwed = hoursWorked * empObj.payPerHour
    return parseFloat(payOwed)
}

function allWagesFor(empObj){
    let datesWorked = empObj.timeOutEvents.map(element => element.date)
    let wagesArray = datesWorked.map(element => wagesEarnedOnDate(empObj, element))
    let payOwed = wagesArray.reduce((acc, val) => acc + val, 0)
    return parseFloat(payOwed)
}

function findEmployeeByFirstName(empArr, firstName){
    return empArr.find(emp => emp.firstName === firstName)
}

function calculatePayroll(empArr){
    let payrollArr = empArr.map(emp => allWagesFor(emp))
    let totalPayroll = payrollArr.reduce((acc, val) => acc + val, 0)
    return totalPayroll
}