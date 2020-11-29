function createEmployeeRecord(infoArray) {
    const obj = {
        firstName: infoArray[0],
        familyName: infoArray[1],
        title: infoArray[2],
        payPerHour: infoArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };

    return obj;
};

function createEmployeeRecords(arrays){
    let records = arrays.map(createEmployeeRecord);
    return records;
};

function createTimeInEvent(emp, date){
    const timeStamp = {
        type: "TimeIn", 
        hour: parseInt(date.split(' ')[1], 10), 
        date: date.split(' ')[0]
    };

    emp.timeInEvents.push(timeStamp); 
    
    return emp;
};

function createTimeOutEvent(emp, date){
    const timeStamp = {
        type: "TimeOut", 
        hour: parseInt(date.split(' ')[1]), 
        date: date.split(' ')[0]
    };

    emp.timeOutEvents.push(timeStamp); 
    
    return emp;
};

function hoursWorkedOnDate(emp, date){
    let timeIn = emp.timeInEvents.find(emp => {return emp.date === date});
    let timeOut = emp.timeOutEvents.find(emp => {return emp.date === date});

    return (timeOut.hour - timeIn.hour)/100;
};

function wagesEarnedOnDate(emp, date){
    return hoursWorkedOnDate(emp, date) * emp.payPerHour;
};

function allWagesFor(emp){
    let inPunches = emp.timeInEvents.map(arry => arry.date);

    return inPunches.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(emp, date)
    }, 0);
};

function calculatePayroll(emps){
    return emps.reduce(function(memo, emp) {
        return memo + allWagesFor(emp)
    }, 0)
};

function findEmployeeByFirstName(emps, firstName){
   return emps.find(emp => emp.firstName === firstName)
};