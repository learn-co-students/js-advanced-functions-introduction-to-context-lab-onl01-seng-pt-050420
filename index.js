// Your code here


const createEmployeeRecord = function(row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = function(rowData) {
  return rowData.map(function(row) {
    return createEmployeeRecord(row)
  })
}

const createTimeInEvent = function(empRecord, dateStamp) {
  let [date, hour] = dateStamp.split(" ")
  
  empRecord.timeInEvents.push(
    {
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    })
  return empRecord
}

const createTimeOutEvent = function(empRecord, dateStamp) {
  let [date, hour] = dateStamp.split(" ")
  
  empRecord.timeOutEvents.push(
    {
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    })
    return empRecord
}

const hoursWorkedOnDate = function(empRecord, foundDate) {
  let inEvent = empRecord.timeInEvents.find(function(event) {
    return event.date === foundDate
  })
  
  let outEvent = empRecord.timeOutEvents.find(function(event) {
    return event.date === foundDate
  })
  
  return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(empRecord, foundDate) {
  let wageEarned = hoursWorkedOnDate(empRecord, foundDate) * empRecord.payPerHour
  
  return parseFloat(wageEarned.toString())
}

const allWagesFor = function(empRecord) {
  let dates = empRecord.timeInEvents.map(function(event){
    return event.date
  })
  
  let pay = dates.reduce(function(memo, data){
    return memo + wagesEarnedOnDate(empRecord, data)
  }, 0)
  
  return pay
}

const findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(record){
    return record.firstName === firstName
  })
}

const calculatePayroll = function(empArray) {
  return empArray.reduce(function(memo, empPay){
    return memo + allWagesFor(empPay)
  }, 0)
}








