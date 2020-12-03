// Your code here

function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
};

function createEmployeeRecords(employees){
    return employees.map(arr => createEmployeeRecord(arr));
};

function createTimeInEvent(employeeRecord, timeDate) {
    let timeInArr = timeDate.split(' ');
    const timeObj = {
        type: "TimeIn",
        hour: parseInt(timeInArr[1]),
        date: timeInArr[0]
    };
    employeeRecord.timeInEvents.push(timeObj);
    return employeeRecord;
};

function createTimeOutEvent(employeeRecord, timeDate) {
    let timeOutArr = timeDate.split(' ');
    const timeObj = {
        type: "TimeOut",
        hour: parseInt(timeOutArr[1]),
        date: timeOutArr[0]
    }
    employeeRecord.timeOutEvents.push(timeObj);
    return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(e => e.date == date);
    const timeOut = employeeRecord.timeOutEvents.find(e => e.date == date);
    return (timeOut.hour - timeIn.hour)/ 100
};

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
};

function allWagesFor(employeeRecord) {
    const availDates = employeeRecord.timeInEvents.map(e => e.date);

    return availDates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
};

function calculatePayroll(allEmployeeRecords) {
    return allEmployeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0)
};

function findEmployeeByFirstName(allEmployeeRecords, name) {
    return allEmployeeRecords.find(employee => employee.firstName == name);
};