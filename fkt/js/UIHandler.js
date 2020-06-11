
function handleForm(){
    console.log("we made it")
    let normalWaketime = document.getElementById("normalWaketime").value
    let normalBedTime = document.getElementById("normalBedTime").value
    let normalTimeZone = document.getElementById("normalTimeZone").value
    let destinationTimeZone = document.getElementById("destinationTimeZone").value
    let flightDatLatestWake = document.getElementById("flightDatLatestWake").value
    let prefferedWakeTime = document.getElementById("prefferedWakeTime").value
    let prefferedBedTime = document.getElementById("prefferedBedTime").value
    let arrivalDayEarliestBedTime = document.getElementById("arrivalDayEarliestBedTime").value
    let flight1Depart = document.getElementById("flight1Depart").value
    let flight1Arrival = document.getElementById("flight1Arrival").value
    let flight2DepartZone = document.getElementById("flight2DepartZone").value
    let flight2Depart = document.getElementById("flight2Depart").value
    let flight2Arrival = document.getElementById("flight2Arrival").value

    //constructor(departure, arrival, homeTimeZone, departureTimeZone, arrivalTimeZone)
    let flight1 = new Flight(flight1Depart, flight1Arrival, normalTimeZone, normalTimeZone, destinationTimeZone)
    var flights = [flight1]
    if(flight2DepartZone != "N/A"){
        flights.push(new Flight(flight2Depart,flight2Arrival, normalTimeZone , flight2DepartZone, destinationTimeZone))
    }
    var order = new NapOrder(normalWaketime, normalBedTime, flightDatLatestWake,
        prefferedWakeTime,prefferedBedTime,arrivalDayEarliestBedTime,normalTimeZone,destinationTimeZone,flights)
    //need to use the latest flight to see what day we land
    if(flight2DepartZone == "N/A"){
        order.checkIfBedTimeIsNextDay(flight1.arrival)
    }else{
        order.checkIfBedTimeIsNextDay(flights[1].arrival)
    }
    console.log("flight 1 - " + flight1.departure)
    
    
    var flight = new  Flight(16.75, 11.25, -7, -7, +1)
    
    var testNapOrder = new NapOrder(7, 23, 7.5,
        9,1,23.5,-7,+1,[flight])
    testNapOrder.checkIfBedTimeIsNextDay(flight.arrival)
    
    let napDetails = getNapStartAndEnd(order)

    console.log("nap details - " + napDetails)
    var napStart = document.getElementById("napStart")
    var napEnd = document.getElementById("napEnd")
    if(napDetails.length == 0){
        napStart.innerHTML = "No Valid Nap Available"
    }else{
        napStartStr = numberToTimeStr(napDetails[0])
        napEndStr = numberToTimeStr(napDetails[1])
        altNapStartStr = numberToTimeStr(cleanHourNum(convertTimeZone(napDetails[0], normalTimeZone, destinationTimeZone)))
        altNapEndStr = numberToTimeStr(cleanHourNum(convertTimeZone(napDetails[1], normalTimeZone, destinationTimeZone)))
        napStart.innerHTML = "Nap Start " + napStartStr + " GMT " + normalTimeZone +  " / " + altNapStartStr + " GMT " + destinationTimeZone
        napEnd.innerHTML = "Nap End " + napEndStr + " GMT " + normalTimeZone + " / " + altNapEndStr + " GMT " + destinationTimeZone
    }
  }