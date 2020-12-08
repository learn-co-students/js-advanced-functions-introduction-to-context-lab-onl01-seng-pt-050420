// Your code here
function createEmployeeRecord(arr){
     let empObj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
return empObj
}

function createEmployeeRecords(arr){
   return  arr.map(createEmployeeRecord)
}
 function createTimeInEvent(obj, dateStamp){
    
     const date = dateStamp.split(" ")[0]
     const hour = parseInt(dateStamp.split(" ")[1])
     const newRec = {type: "TimeIn", date: date, hour: hour}
     obj.timeInEvents.push(newRec)
     return obj

 }
 function createTimeOutEvent(obj, dateStamp){
    
    const date = dateStamp.split(" ")[0]
    const hour = parseInt(dateStamp.split(" ")[1])
    const newRec = {type: "TimeOut", date: date, hour: hour}
    obj.timeOutEvents.push(newRec)
    return obj

}

function hoursWorkedOnDate(obj, date){
    const timeIn = obj.timeInEvents.find((e) => e.date === date).hour
    const timeOut = obj.timeOutEvents.find((e) => e.date === date).hour
    return (timeOut - timeIn)/100
   
}

function wagesEarnedOnDate(obj, date){
   
   return (hoursWorkedOnDate(obj,date) * obj.payPerHour)
   
    // const pay = obj.payPerHour
    // const hrs =  hoursWorkedOnDate(obj,date) 

    // return (pay * hrs)
}
 function allWagesFor(obj){
    const allWages = obj.timeInEvents.map((day) => {return wagesEarnedOnDate(obj, day.date)})
   return allWages.reduce(function(total, el){
        return total + el
    }, 0)
 }

 function findEmployeeByFirstName(srcArray, first_Name){
    return srcArray.find((record) => record.firstName === first_Name)
}

 function calculatePayroll(arr){
     const payAll =  arr.map(empl => allWagesFor(empl))

     return payAll.reduce(function(total, el){
        return total + el
    }, 0)
 }