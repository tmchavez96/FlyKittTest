//flights object
//takes flight times in their time zones with their time zones, and adds

class Flight {
    constructor(departure, arrival, homeTimeZone, departureTimeZone, arrivalTimeZone) {
        this.departure = convertTimeZone(departure, departureTimeZone, homeTimeZone);
        this.departureTimeZone = departureTimeZone;
        this.arrival = convertTimeZone(arrival, arrivalTimeZone, homeTimeZone);
        this.moveUpTime()
      }

    //if the arrival time is before the departure time, it is on the next day
    moveUpTime(){
      console.log("flight times are being evaluated")
      if(this.arrival < this.departure){
        this.arrival += 24
      }
    }
    
}
