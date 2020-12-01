function createEmployeeRecord(employeeArray)
{
  let newEmployeeRecord = {
    "firstName": employeeArray[0],
    "familyName": employeeArray[1],
    "title": employeeArray[2],
    "payPerHour": employeeArray[3],
    "timeInEvents": [],
    "timeOutEvents": []
  };
  return newEmployeeRecord;
}

function createEmployeeRecords(arrayOfArrays)
{
  let arrayOfRecords = [];
  for (let i = 0; i < arrayOfArrays.length; i++)
  {
    arrayOfRecords.push(createEmployeeRecord(arrayOfArrays[i]));
  }
  return arrayOfRecords;
}

function createTimeInEvent(employeeRecord, dateStamp)
{
  let timeInEvent = {
    "type": "TimeIn",
    "hour": parseInt(dateStamp.substring(11, 15), 10),
    "date": dateStamp.substring(0, 10)
  };
  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp)
{
  let timeOutEvent = {
    "type": "TimeOut",
    "hour": parseInt(dateStamp.substring(11, 15), 10),
    "date": dateStamp.substring(0, 10)
  };
  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp)
{
  let dateIn = employeeRecord.timeInEvents.find(x => x.date === dateStamp);
  let dateOut = employeeRecord.timeOutEvents.find(x => x.date === dateStamp);
  
  let timeIn = dateIn.hour;
  let timeOut = dateOut.hour;
  
  let hoursWorked = (timeOut / 100) - (timeIn / 100);
  
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, dateStamp)
{
  let hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp);
  let payRate = employeeRecord.payPerHour;
  
  let wagesEarned = hoursWorked * payRate;
  
  return wagesEarned;
}

function allWagesFor(employeeRecord)
{
  let total = 0;
  for (let i = 0; i < employeeRecord.timeInEvents.length; i++)
  {
    let dateStamp = employeeRecord.timeInEvents[i].date;
    let wagesEarned = wagesEarnedOnDate(employeeRecord, dateStamp);
    
    total = total + wagesEarned;
  }
  return total;
}

function calculatePayroll(arrayOfRecords)
{
  let total = 0;
  for (let i = 0; i < arrayOfRecords.length; i++)
  {
    let allWagesForRecord = allWagesFor(arrayOfRecords[i]);
    
    total = total + allWagesForRecord;
  }
  return total;
}

function findEmployeeByFirstName(srcArray, firstName)
{
  let match = srcArray.find(record => record.firstName === firstName);
  return match;
}