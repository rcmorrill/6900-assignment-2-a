console.log('Homework 2-A...')

d3.csv('./data/hubway_trips_reduced.csv',parse,dataLoaded);


var trips;

function dataLoaded(err,rows){

   // console.log(rows);

    trips = crossfilter(rows);

    var tripsByTime = trips.dimension(function(row){return row.startTime;});
    var tripsByGender = trips.dimension(function(row){return row.gender;});
    var tripsByStation = trips.dimension(function(row){return row.startStation;})
    var tripsByDuration = trips.dimension(function(row){return row.duration;})
    var tripsByAge = trips.dimension(function(row){return row.age});


        //console.log(tripsByTime.top(Infinity).length);

tripsByTime.filter([new Date(2012,1,1),new Date(2012,12,31)]);

        console.log("total number of trips in 2012: " + tripsByTime.top(Infinity).length);

tripsByGender.filter("Male");

        console.log("total number of trips in 2012 AND taken by male, registered users: "+  tripsByTime.top(Infinity).length);

tripsByGender.filter(null);
tripsByStation.filter("5");

        console.log("total number of trips in 2012, by all users (male, female, or unknown), starting from Northeastern: "
            +  tripsByTime.top(Infinity).length);

tripsByTime.filter(null);
tripsByStation.filter(null);

        console.log("top 50 trips, in all time, by all users, regardless of starting point, in terms of trip duration: ")
           console.log(tripsByDuration.top(50));



var tripsByAgeGroup = tripsByAge.group(function(d){return Math.floor(d/10);});


console.log("group all trips into 10-year age buckets: ")

console.log(tripsByAgeGroup.all());


}




function parse(d){
    if(+d.duration<0) return;

    //console.log(new Date (d.birth_date));

    var age = d.birth_date==""?99:_calculateAge(new Date (d.birth_date),parseDate(d.start_date));
    //var age = d.birth_date==""?99:parseDate(d.start_date) - birth;
    var gender = d.birth_date==""?"undefined": d.gender;

    return {
        duration: +d.duration,
        startTime: parseDate(d.start_date),
        endTime: parseDate(d.end_date),
        startStation: d.strt_statn,
        endStation: d.end_statn,
        age: age,
        gender: gender
    }


function _calculateAge(birthday,date) { // birthday is a date
    var ageDifMs = date - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

}

function parseDate(date){
    var day = date.split(' ')[0].split('/'),
        time = date.split(' ')[1].split(':');

    return new Date(+day[2],+day[0]-1, +day[1], +time[0], +time[1]);
}

