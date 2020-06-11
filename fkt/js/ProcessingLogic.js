//These steps do nothing since the angorithm is already supposed to take the earliest wake time and the latest bed time

//2. If (1) doesn’t work, move the Flight Day Wake Time earlier or later by up to 1.5 hours, 
//but not later than the Flight Day Latest Wake Time and see if this creates an allowed time block. 
//3. If (2) doesn’t work, move the Arrival Day Bed Time earlier or later by up to 1.5 hours, 
//but not earlier than the Arrival Day Earliest Bed Time and see if it this creates and allowed time block


function getFlightDayWakeUp(napOrder){
    let wakeTime = napOrder.homeWakeTime < napOrder.flightDayLatestWakeTime ? napOrder.homeWakeTime : napOrder.flightDayLatestWakeTime
    return wakeTime
}

function getArrivalDayBedTime(napOrder){
    let bedTime = napOrder.prefferedBedTimeDestination > napOrder.prefferedBedTimeDestination ? napOrder.prefferedBedTimeDestination : napOrder.prefferedBedTimeDestination
    return bedTime
}


function getNapLength(waketime, bedtime){
    let totalWakeness = bedtime - waketime
    if(totalWakeness <= 20){
        return 0
    }else if(totalWakeness <= 24 ){
        return 1
    }else if(totalWakeness <= 28){
        return 2
    }else if (totalWakeness <= 36){
        return 4
    }else if (totalWakeness <= 42){
        return 6
    }else {
        return 8
    }
}

//helper function to get distance of nap start from day wake

function getDistanceFromWakeTimeForNapStart(napLength){
    if(napLength == 1){
        return 4
    }else if(napLength == 2){
        return 6
    }else if(napLength == 4){
        return 9
    }else if(napLength == 9){
        return 12
    }else if(napLength == 12){
        return 14
    }
}

//helper function to get distance of nap end from day end

function getDistanceFromBedTimeForNapStart(napLength){
    if(napLength == 1){
        return 6
    }else if(napLength == 2){
        return 8
    }else if(napLength == 4){
        return 10
    }else if(napLength == 9){
        return 12
    }else if(napLength == 12){
        return 12
    }
}


//helper fucntion to contain windowChecking logic
function checkWindow(napStart, napEnd, windowStart, windowEnd){
    if(napStart < windowEnd && napStart > windowStart){
        return false
    }else if(napEnd < windowEnd && napEnd > windowStart){
        return false
    }else{
        return true
    }
}

//returns true if nap has no issues with flights
function checkFlights(napOrder, napStart, napEnd){
    //first checkout layover
    //console.log(" in check flights")
    if(napOrder.flights.length > 1){
        let flight1 = napOrder.flights[0]
        let flight2 = napOrder.flights[1]
        if(checkWindow(napStart,napEnd,flight1.arrival,flight2.departure) == false){
            //console.log("nap was during the layover")
            return false
        }

    }
    for (i = 0; i < napOrder.flights.length; i++){
        //console.log("iterating check flight")
        let curFlight = napOrder.flights[i]
        // 4 hours before take off until 1 hour after take-off  b
        if(checkWindow(napStart, napEnd, curFlight.departure-4, curFlight.departure+1) == false){
            //console.log("too close to flight takeoff")
            return false
        }
        //1 hours before landing until 2 hours after landing
        if(checkWindow(napStart, napEnd, curFlight.arrival-1, curFlight.arrival+2) == false){
            //console.log("too close to flight arrival")
            return false
        }  
    }
    return true
}

//
function checkWakeAndBed(napStart, napEnd, flightDayWake, flightDayBed){
    let minDistanceFromWake = getDistanceFromWakeTimeForNapStart(napEnd-napStart)
    let minDistanceFromBedTime = getDistanceFromBedTimeForNapStart(napEnd-napStart)
    
    if(checkWindow(napStart, napEnd, flightDayWake, flightDayWake+minDistanceFromWake) == false){
        //console.log("was too close to day wake")
        return false
    }else if(checkWindow(napStart, napEnd, flightDayBed - minDistanceFromBedTime, flightDayBed) == false){
        //console.log("was too close to day sleep")
        return false
    }else{
        return true
    }
}

function checkForTimeAwake(napStart, napEnd, flightDayWake, flightDayBed){
    if((napStart - flightDayWake) > 20){
        return false;
    }
    if((flightDayBed - napEnd) > 20){
        return false;
    }
    return true
}


function checkValidNap(napStart, napEnd, napOrder, flightDayWake, flightDayBed){
    //first check nap relative to the flights
    if(checkFlights(napOrder, napStart, napEnd) == false){
        console.log("nap was rejected due to flight constraints")
        return false;
    }
    if(checkWakeAndBed(napStart, napEnd, flightDayWake, flightDayBed) == false){
        console.log("nap was rejected due to wake/bed time constraints")
        return false
    }
    if(checkForTimeAwake(napStart, napEnd, flightDayWake, flightDayBed) == false){
        console.log("passenger was awake for more than 20 hours")
        return false
    }
    console.log("got a valid nap")
    return true
}

//get the intial nap start and end points
//js doesnt have tuples so I return an array
function generateNapStartAndEndOnMidPoint(napLength, flightDayWake, flightDayBed) {
    let midPoint = (flightDayBed - flightDayWake)/2
    return [midPoint-(napLength/2),midPoint+(napLength/2)]
}


//the main of the logic
//returns either an array contiang the start time and end time, or an empty
function getNapStartAndEnd(napOrder){
    console.log("in processing main")
    //get necesary times from the order
    var travelDayWake = getFlightDayWakeUp(napOrder)
    var travelDayBed = getArrivalDayBedTime(napOrder)
    var napLength = getNapLength(travelDayWake, travelDayBed)
    travelDayWake = parseInt(travelDayWake)
    travelDayBed = parseInt(travelDayBed)
    napLength = parseInt(napLength)
    //iterate till the nap length is less than 1 hour
    //console.log(" day wake - " + travelDayWake + " day end " + travelDayBed + " napLength " + napLength)
    while(napLength > 0){
        //console.log("in main iteration")
        //get the new nap start and ends points from the midpoint
        
        let points = generateNapStartAndEndOnMidPoint(napLength, travelDayWake, travelDayBed)
        var napStart = points[0]
        var napEnd = points[1]
        //console.log("nap length - " + napLength + " napSTart " + napStart + " napEnd - " + napEnd)
        console.log("testing midpoint ")
        if(checkValidNap(napStart, napEnd, napOrder, travelDayWake, travelDayBed)){
            return [napStart,napEnd]
        }
        var earlierStart = napStart - .25
        var earlierEnd = napEnd - .25
        //try all earlier possibilites
        //naps cant start till at least 4 hours after wake, so save some time
        console.log("testing earlier times")
        while(earlierStart > travelDayWake+4){
            if(checkValidNap(earlierStart, earlierEnd, napOrder, travelDayWake, travelDayBed)){
                return [earlierStart,earlierEnd]
            }
            earlierStart -= .25
            earlierEnd -= .25
        }
        //try all later possibilites
        //naps must end at least 6 hours before bed, so save some time
        console.log("testing later times")
        var laterStart = napStart - .25
        var laterEnd = napEnd - .25
        while(laterEnd < travelDayBed-6){
            if(checkValidNap(laterStart, laterEnd, napOrder, travelDayWake, travelDayBed)){
                return [laterStart,laterEnd]
            }
            laterStart += .25
            laterEnd += .25
        }

        //decrement nap length
        if(napLength > 2) {
            napLength -= 2
        }else{
            napLength -= 1
        }
    }
    console.log("returning empty array")
    //return an empty array if we didnt find any nap times
    return []
}