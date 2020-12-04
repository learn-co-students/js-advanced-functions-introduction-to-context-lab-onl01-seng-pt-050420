function createEmployeeRecord(array){
    let obj = {}
    obj.firstName = array[0]
    obj.familyName = array[1]
    obj.title = array[2]
    obj.payPerHour = array[3]
    obj.timeInEvents = []
    obj.timeOutEvents = []
    return obj
}

function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(function(array){
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(employeeObject, dateStamp){
    let obj = {}
    obj.type = "TimeIn"
    obj.date = dateStamp.slice(0, 10)
    obj.hour = Number(dateStamp.slice(-4))
    employeeObject.timeInEvents.push(obj)
    return employeeObject
}

function createTimeOutEvent(employeeObject, dateStamp){
    let obj = {}
    obj.type = "TimeOut"
    obj.date = dateStamp.slice(0, 10)
    obj.hour = Number(dateStamp.slice(-4))
    employeeObject.timeOutEvents.push(obj)
    return employeeObject
}

// let danielObj = 
// {
//     firstName: "Daniel",
//     familyName: "Kwon",
//     title: "IT Analyst",
//     payPerHour: "25"
//     timeInEvents: [{
//         type: "TimeIn",
//         date: "YYYY-MM-DD",
//         hour: 1200
//     }]
//     timeOutEvents: [{
//         type = "TimeOut",
//         date: "YYYY-MM-DD",
//         hour: 1200
//     }]
// }

function hoursWorkedOnDate(employeeObject, date){
    let timeIn = employeeObject.timeInEvents.find(element => element.date === date).hour
    let timeOut = employeeObject.timeOutEvents.find(element => element.date === date).hour
    let hoursWorked = (timeOut - timeIn)/100
    return hoursWorked // integer
}

function wagesEarnedOnDate(employeeObject, date){
    hoursWorked = hoursWorkedOnDate(employeeObject, date)
    payOwed = hoursWorked * employeeObject.payPerHour
    return payOwed
}

function allWagesFor(employeeObject){
    datesWorked = employeeObject.timeOutEvents.map(element => element.date)
    wagesArray = datesWorked.map(element => wagesEarnedOnDate(employeeObject, element))
    payOwed = wagesArray.reduce((accumulator, currentVal) => accumulator + currentVal, 0)
    return payOwed
}