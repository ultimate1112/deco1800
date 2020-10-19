$(document).ready(function() {


});

function beginBubbles(values) {
    var center = [[]];
    var bubble = ".bubble";
    var bubbleText = "#bubble-text_";
    var bubbleValues = [];
    var counter = 0;
    $.each(dataset, function(offence, value) {
        if(counter >= 12) {
            return;
        }
        var object = {};
        object.crime = offence;
        object.crimeValue = value;
        bubbleValues.push(object);
        counter++;
    });
    // var testValues = [{crime: "Some crime", crimeValue: 100 },
    //     {crime: "Arson", crimeValue: 200 },
    //     {crime: "Rape", crimeValue: 300 },
    //     {crime: "Murder", crimeValue: 500 },
    //     {crime: "Assault", crimeValue: 400 },
    //     {crime: "Some crime", crimeValue: 50 },
    //     {crime: "Some crime", crimeValue: 100 },
    //     {crime: "Some crime", crimeValue: 200 },
    //     {crime: "Some crime", crimeValue: 300 },
    //     {crime: "Some crime", crimeValue: 250 },
    //     {crime: "Some crime", crimeValue: 300 },
    //     {crime: "Some crime", crimeValue: 50 }];
    bubbleValues.sort(function (a, b) {
        return a.crimeValue - b.crimeValue;
    });
    var round = 0;
    var len = bubbleValues.length;
    while(round < len){
        bubbleValues[round].crimeValue = Math.round(bubbleValues[round].crimeValue);
        round++
    }
    console.log(bubbleValues);
    hoverBubble(bubbleValues, bubbleText);
    for (var i = 0; i < $('.bubble').length; i++) {
        center[i] = getMiddleCoor(bubble + i);
        getBubbleSize(bubbleValues[i].crimeValue, bubble + i, bubbleValues[0].crimeValue);
        setText(bubbleValues[i].crime, bubbleValues[i].crimeValue, bubbleText + i, bubbleValues[0].crimeValue);
    }
    setInterval(function() {bubbleMovement(center);}, 1400);
    // create a interval that moves each bubble
    // updateContainer();




    // setTimeout(function() {
    //     alert('hello world!');
    //
    //     alert('Rendering from bubble%20script.js: ' + options['date'] + ' & ' + options['lga']);
    // }, 10000);  // 10 seconds to timeout.

}

function getBubbleSize(crimeValue, element, smallestValue) {
    var minHeight = 40;
    var standardArea = Math.PI * Math.pow(minHeight, 2);
    var modifiedarea = crimeValue/smallestValue * standardArea;
    // Area of circle is pi * r^2
    var height = Math.sqrt(modifiedarea / Math.PI) * 2;
    $(element).css({"height":height + "px", "width":height + "px"});
}

function setText(text, crimeValue, element, smallestValue) {
    var fontSize = 15 + crimeValue/smallestValue;
    if (crimeValue == 0) {
        $(element).text("");
    } else {
        $(element).text(text);
    }
    $(element).css({"font-size":fontSize + "px"});

}

function placeBubblesOnPage(bubbles) {
    // Suppose we store the height & width according to the correct order
    // We need to set a specific location to start
    var startingLocation = [100, 100];
    var bubble = "#bubble_";
    for (var i = 0; i < 12; i++) {
        startingLocation[0] += bubbles[i];
        startingLocation[1] += bubbles[i];
        $(bubble + i).css({"top":startingLocation[0] + "px", "left":startingLocation[1] + "px"});
    }
}

// Element has to be a string
function getMiddleCoor(element) {
    try {
        // var y = $(element).position().top;
        // var x = $(element).position().left;
        // var y = $(element).offset().top;
        // var x = $(element).offset().left;
        // var trueY = y + yOffset;
        // var trueX = x + xOffset;
        var height = $(element).height();
        var width = $(element).width();
        var centerY = height / 2;
        var centerX = width / 2;
        // alert(x + " " + y);
        return {centerX, centerY}
    } catch (ns) {
        alert("getMiddleCoor has received a variable that is not a string!");
    }
}

function bubbleMovement(center) {
    try {
        var bubble = "#bubble_";
        // Repeat for each bubble
        for (var i = 0; i < $('.bubble').length; i++) {
            var centerX = center[i].centerX;
            var centerY = center[i].centerY;
            var moveX;
            var moveY;
            do {
                moveX = 3 + Math.floor(Math.random() * 6);
                moveY = 3 + Math.floor(Math.random() * 6);
                moveX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                moveY *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            } while ((moveX + centerX) > (centerX + 20) ||
            (moveX + centerX) < (centerX - 20) ||
            (moveY + centerY) > (centerY + 20) ||
            (moveY + centerY) < (centerY - 20));
            // simple if else statement, if random == 1, positive movement else negative movement

            var moveCSSx = moveX + "px";
            var moveCSSy = moveY + "px";
            $(bubble + i).css({left: moveCSSx, top: moveCSSy});
        }

    } catch (e) {
        alert("bubbleMovement did not receive an array");
        return;
    }
}

// I had no choice...
// These values should only be used in hoverBubble and NO WHERE ELSE
var bubblecounter = 0;
var globalBubble = [];
var globalBubbleText;

function hoverBubble(bubbles, bubbleText) {
    globalBubble = bubbles;
    for (var i = 0; i < bubbles.length; i++) {
        //     bubblecounter = i;
        // console.log(globalBubble[bubblesCounter[bubblecounter]].crimeValue);
        var bubble = $("#bubble_" + i).hover(function(){
            var counter = $(this).attr("class").match(/\d+/);
            console.log(counter);
            $(this).find("span").text(globalBubble[counter].crime + "\n" +
                globalBubble[counter].crimeValue);
        }, function(){
            var counter = $(this).attr("class").match(/\d+/);
            $(this).find("span").text(globalBubble[counter].crime);
        });
    }
}

// function updateContainer() {
//     $("#bubbles-container").css({gridTemplateRows: "max-content min-content min-content",
//         gridTemplateColumns:
//             "minmax(100px, max-content) minmax(100px, 500px) minmax(100px, 500px) minmax(100px,\n" +
//             "            500px) minmax(100px, 500px)"})
// }