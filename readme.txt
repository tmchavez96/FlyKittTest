Readme for Fly Kitt Coding Test

Breakdown of each file.

Index.html contains the form for the UI testing.

Flights.js is a class file for the Flight class.

NapOrder.js is a class file for all the data regarding the nap.
"checkIfBedTimeIsNextDay" is a class method that needs to be called before the nap NapOrder is passed to processing logic.
It takes the last flight arrival time and decides if the bedtimes need to be moved to the next day.
(i.e. normal wakeup, timezones, ect)

Helpr.js contains some helper functions that are used throughtout the codebase,
like time zone conversion.

ProcessingLogic.js contains all the business logic associated with finding a nap time.
"getNapStartAndEnd" is the main method of the logic, it takes a nap order as a parameter,
and a returns the nap start and end times in an array.
This is the only function that needs to be called outside of the file.

UIHandler.js gets the order information from the html and wraps it into the flights and NapOrder instances.
It then calls the ProcessingLogic and updates the UI.

UnitTest.js isnt a real unit test, just more of an open ended testing file.
