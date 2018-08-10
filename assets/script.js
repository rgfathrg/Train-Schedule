$(document).ready(function(){

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


var cTime = function() {
    $("#runClock").text(moment().format("h:mm:ss a"));
}

setInterval(cTime, 1000);


$("#sbtn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#formTrain").val().trim();
    var tDestination = $("#formDestination").val().trim();
    var firstDep = $("#formFD").val().trim();
    var tFreq = $("#formFreq").val().trim();
    

    var newTrain = {
        name: trainName,
        destination: tDestination,
        firstDepart: firstDep,
        frequency: tFreq
    };

    database.ref().push(newTrain);
    console.log(newTrain);

    $("#formTrain").val("");
    $("#formDestination").val("");
    $("#formFD").val("");
    $("#formFreq").val("");

});



database.ref().on("child_added", function(childSnapshot) {
    
        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tFirstDepart = childSnapshot.val().firstDepart;
        var tFrequency = childSnapshot.val().frequency;

        var firstTimeConvert = moment(tFirstDepart, "HH:mm").subtract(1, "years");
        
        var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
        var remainder = diffTime % tFrequency;
        var minTillTrain = tFrequency - remainder;
        var arrivalTime = moment().add(minTillTrain, "minutes");
        
    
        function test() {
            tFirstDepart = childSnapshot.val().firstDepart;
            tFrequency = childSnapshot.val().frequency;
            firstTimeConvert = moment(tFirstDepart, "HH:mm").subtract(1, "years");
            diffTime = moment().diff(moment(firstTimeConvert), "minutes");
            remainder = diffTime % tFrequency;
            minTillTrain = tFrequency - remainder;
            arrivalTime = moment().add(minTillTrain, "minutes");
                 
              
        }
        setInterval(test, 60000);

        

        var newRow = $("<tr>").append(
            $("<td>").text(tName),
            $("<td>").text(tDestination),
            $("<td>").text(tFirstDepart),
            $("<td>").text(tFrequency + " minutes"),
            $("<td>").addClass("arriveTime").text(arrivalTime.format("hh:mm")),
            $("<td>").addClass("tillTrain").text(minTillTrain + " minutes")
        );
        $("#tbody").append(newRow);
    });

    console.log(database.length);

});