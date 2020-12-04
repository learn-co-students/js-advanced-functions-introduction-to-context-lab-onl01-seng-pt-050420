// Your code here
function createEmployeeRecord(record) {
    let result = {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
    }
   return result
}

function createEmployeeRecords(arrOfRecord) {
    return arrOfRecord.map(record => createEmployeeRecord(record))  
}

function createTimeInEvent(record, time) {
    const timeIn = {
        type: "TimeIn",
        date: time.split(" ")[0],
        hour: parseInt(time.split(" ")[1])
    }
     record.timeInEvents.push(timeIn)
     return record
}

function createTimeOutEvent(record, time) {
    const timeOut = {
        type: "TimeOut",
        date: time.split(" ")[0],
        hour: parseInt(time.split(" ")[1])
    }
     record.timeOutEvents.push(timeOut)
     return record
}

function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(event => event.date === date)
    const timeOut = record.timeOutEvents.find(event => event.date === date)

return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, date) {
    return parseInt(hoursWorkedOnDate(record, date) * record.payPerHour)
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(event => event.date)
    return dates.reduce((wage, date) => wage + wagesEarnedOnDate(record, date), 0)
}

function calculatePayroll(records) {
    return records.reduce((wage, record) => wage + allWagesFor(record), 0)
    
}

function findEmployeeByFirstName(srcArray, firstNam){
  return srcArray.find(record =>record.firstName === firstNam)
}
  



// x = [["Gray", "Worm", "Security",1],["Blue", "Worm", "Security",1]]

// y = createEmployeeRecords(x)
// z = findEmployeeByFirstName(y, "Blue")
// u = findEmployeeByFirstName(y, "Gray")

// a = createTimeInEvent(z, "1998-01-02 1100")
// b = createTimeOutEvent(z, "1998-01-02 1600")
// c = createTimeInEvent(u, "1998-01-03 1100")
// d = createTimeOutEvent(u, "1998-01-03 1600")
// e = allWagesFor(z)
// f = calculatePayroll(y)

// console.log(f)


