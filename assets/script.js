$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyA2R2jqcLElYFgqccWMZZb4j0mFTvdq6uQ",
        authDomain: "first-firebase-4e328.firebaseapp.com",
        databaseURL: "https://first-firebase-4e328.firebaseio.com",
        projectId: "first-firebase-4e328",
        storageBucket: "first-firebase-4e328.appspot.com",
        messagingSenderId: "649555136497"
    };

    firebase.initializeApp(config);
    var database = firebase.database();


    var cTime = function () {
        $("#runClock").text(moment().format("h:mm:ss a"));
    }

    setInterval(cTime, 1000);


    $("#sbtn").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#formTrain").val().trim();
        var tDestination = $("#formDestination").val().trim();
        var firstTrain = $("#formFT").val().trim();
        var tFreq = $("#formFreq").val().trim();


        var newTrain = {
            name: trainName,
            destination: tDestination,
            firstDepart: firstTrain,
            frequency: tFreq
        };

        database.ref().push(newTrain);
        console.log(newTrain);

        $("#formTrain").val("");
        $("#formDestination").val("");
        $("#formFT").val("");
        $("#formFreq").val("");

    });


    function snapShot() {
        $("#tbody").empty();
        database.ref().on("child_added", function (childSnapshot) {
            var tName = childSnapshot.val().name;
            var tDestination = childSnapshot.val().destination;
            var tFrequency = childSnapshot.val().frequency;
            var tFirstTrain = childSnapshot.val().firstDepart;

            var timeArr = tFirstTrain.split(":");
            var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
            var maxMoment = moment.max(moment(), trainTime);
            var firstTimeConvert = moment(tFirstTrain, "HH:mm").subtract(1, "years");
            var diffTime = moment().diff(moment(firstTimeConvert), "minutes");

            var remainder = diffTime % tFrequency;
            var tMinutes = tFrequency - remainder;
            var tArrival;
            var nextArrival;



            
            if (maxMoment === trainTime) {
                tArrival = tFirstTrain;
                //Need to figure out to how to display correct minutes till train arrives according to tFirstTrain
            }
            else {
                nextArrival = moment().add(tMinutes, "minutes");
                tArrival = moment(nextArrival).format("hh:mm");
            }

            var newRow = $("<tr>").append(
                $("<td>").text(tName),
                $("<td>").text(tDestination),
                $("<td>").text(tFirstTrain),
                $("<td>").text(tFrequency + " minutes"),
                $("<td>").text(tArrival),
                $("<td>").text(tMinutes + " minutes").attr("id", "redAlert").attr("id", "greenAlert")
            );
            $("#tbody").append(newRow);
        });

    }
    snapShot();
    setInterval(snapShot, 60000);

});



    //code warehouse

    // var miliSec = moment(tFirstTrain, "HH:mm").unix();
        // var unixT = moment().unix();
        // console.log(unixT);
        // console.log(miliSec);
        // console.log(unixT - miliSec);
        // console.log("----------------------------------");
        // var rMinutes = (unixT - miliSec) * 60;
        // console.log(rMinutes);
        // var testRemain = rMinutes % tFrequency;
        // console.log(testRemain);
        // console.log("-----------------------------------");


        //console.log(tFirstTrain);
        //tMinutes = moment.unix(moment()) - trainTime;
        //console.log(tMinutes);





        // console.log(minTillTrain, "var minTillTrain");
        // var arrivalTime = moment().add(minTillTrain, "minutes");


        // function test() {
        //     tFirstDepart = childSnapshot.val().firstDepart;
        //     tFrequency = childSnapshot.val().frequency;
        //     firstTimeConvert = moment(tFirstDepart, "HH:mm").subtract(1, "years");
        //     diffTime = moment().diff(moment(firstTimeConvert), "minutes");
        //     remainder = diffTime % tFrequency;
        //     minTillTrain = tFrequency - remainder;
        //     arrivalTime = moment().add(minTillTrain, "minutes");
        //     console.log(minTillTrain);
        //     $(".tillTrain").text(minTillTrain);

        // }
        // setInterval(test, 60000);

        //console.log(tArrival);
                // //console.log(moment().format("hh:mm a"));
                // var unixT = Math.floor(moment().unix(moment()) / 60);
                // console.log(unixT);
                // var tUnixTrain = Math.floor(moment().unix(tFirstTrain) / 60);
                // console.log(tUnixTrain);
                // //console.log(tUnixTrain - unixT);