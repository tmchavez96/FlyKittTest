//class for maintainign the data about the nap
//constructor converts all times into home time zone to make the logic easier

//time zones are int values of zone relative to GMT (i.e GMT +7 = 7, GMT -1 = -1)

class NapOrder {
    constructor(homeWakeTime, homeBedTime, flightDayLatestWakeTime,
        prefferedWakeTimeDestination,prefferedBedTimeDestination,arrivalDayEarliestBedTime,homeTimeZone,DestinationTimeZone,flights) {
        this.homeWakeTime = homeWakeTime;
        this.homeBedTime = homeBedTime;
        this.flightDayLatestWakeTime = flightDayLatestWakeTime;
        this.prefferedWakeTimeDestination = convertTimeZone(prefferedWakeTimeDestination, DestinationTimeZone, homeTimeZone);
        this.prefferedBedTimeDestination = convertTimeZone(prefferedBedTimeDestination, DestinationTimeZone, homeTimeZone);
        this.arrivalDayEarliestBedTime = convertTimeZone(arrivalDayEarliestBedTime, DestinationTimeZone, homeTimeZone);
        this.homeTimeZone = homeTimeZone;
        this.DestinationTimeZone = DestinationTimeZone;
        this.flights = flights;
      }

      checkIfBedTimeIsNextDay(arrivalTime){
        console.log(" ---processing bed times ")
        let bedTime = this.arrivalDayEarliestBedTime > this.prefferedBedTimeDestination ? this.arrivalDayEarliestBedTime : this.prefferedBedTimeDestination
        if(arrivalTime + 2 > bedTime){
          console.log("bed times were moved to the next day")
          this.arrivalDayEarliestBedTime += 24
          this.prefferedBedTimeDestination += 24
        }else{
          console.log(" no problems found ")
        }
      }
}