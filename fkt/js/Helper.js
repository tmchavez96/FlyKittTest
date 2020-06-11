//time is a number, and timezones are passed as their offset values (i.e. +1, -12)
function convertTimeZone(time, curTimeZone, desiredTimeZone){
    var retVal = 0
    if(curTimeZone < desiredTimeZone){
        var timeDiff = desiredTimeZone - curTimeZone
        retVal =  time + timeDiff
    }else{
        var timeDiff = curTimeZone - desiredTimeZone
        retVal  = time - timeDiff
    }
    //use next day timings as over 24 hours, since there is no other indication when a time would be the next day
    if(retVal < 0){
        retVal = 25 + retVal
    }
    return retVal
}

//string to number -- must be 5 digits i.e. 12:30
function timeStrToNum(str){
    let hourStr = str.substring(0, 2);
    let minuteStr = str.substring(3,5);
    let hours = parseInt(hourStr);
    var minutes = parseInt(minuteStr);
    minutes = minutes / 60
    return hours + minutes
}

//turn a number into a time string
function numberToTimeStr(timeNumber){
    let hours = Math.floor(timeNumber)
    var decimal = timeNumber - Math.floor(timeNumber)
    var minutes = "00"
    if(decimal == .25){
        minutes = "15"
    }else if(decimal == .5){
        minutes = "30"
    }else if(decimal == .75){
        minutes = "45"
    }
    return hours + ":" + minutes
}

function cleanHourNum(num){
    return num % 24
}