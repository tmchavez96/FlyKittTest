//test the first example
function testGivenExmaple(){
    //constructor(homeWakeTime, homeBedTime, flightDayLatestWakeTime,
    //prefferedWakeTimeDestination,prefferedBedTimeDestination,arrivalDayEarliestBedTime,
    //homeTimeZone,DestinationTimeZone,flights)



    var flight = new  Flight(16.75, 11.25, -7, -7, +1)

    var testNapOrder = new NapOrder(7, 23, 7.5,
        9,1,23.5,-7,+1,[flight])
    testNapOrder.checkIfBedTimeIsNextDay(flight.arrival)

    let napDetails = getNapStartAndEnd(testNapOrder)

    console.log("nap details - " + napDetails)

}

//test the second example
function testSecondExmaple() {
  var flight = new  Flight(21, 13.25, -7, -7, +1)

  var testNapOrder = new NapOrder(7.5, 23, 6.5,
      7,23,23.5,-7,+1,[flight])
  testNapOrder.checkIfBedTimeIsNextDay(flight.arrival)

  let napDetails = getNapStartAndEnd(testNapOrder)

  console.log("nap details - " + napDetails)
}

function testTimeZoneConversion(){
    console.log(" 01:00 from +1 to -7 " + convertTimeZone(1, +1, -7))
    console.log(" 11:15 from +1 to -7 " + convertTimeZone(11.25, +1, -7))
}

function testStringToNumberFunctions(){
    let test1 = "11:45"
    let test2 = 11.75
    console.log( test1 + " to num - " +  timeStrToNum(test1))
    console.log( test2 + "to str - " + numberToTimeStr(test2))
}
