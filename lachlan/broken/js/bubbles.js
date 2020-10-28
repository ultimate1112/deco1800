const BUBBLE = ".bubble";
const BUBBLETEXT = "#bubble-text_";
var enlarge = false;

function beginBubbles(dataset) {
    var center = [[]];
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
    var bubbleColors = ["images/gradients/deep-orange.png",
        "images/gradients/green.png",
        "images/gradients/lightBlue-darkBlue.png",
        "images/gradients/lightBlue-purple.png",
        "images/gradients/lightPurple-reddishPurple.png",
        "images/gradients/maroony-purple.png",
        "images/gradients/pinkish-purple.png",
        "images/gradients/purple.png",
        "images/gradients/purplish-blue.png",
        "images/gradients/red-purple.png",
        "images/gradients/turqoise-blue.png",
        "images/gradients/yellow-orange.png"
    ];
    bubbleValues.sort(function (a, b) {
        return a.crimeValue - b.crimeValue;
    });
    var round = 0;
    var len = bubbleValues.length;
    while(round < len){
        bubbleValues[round].crimeValue = Math.round(bubbleValues[round].crimeValue);
        round++
    }
    // console.log(bubbleValues);
    hoverBubble(bubbleValues, BUBBLETEXT);
    for (var i = 0; i < $('.bubble').length; i++) {
        center[i] = getMiddleCoor(BUBBLE + i);
        setbubbles(bubbleValues[i].crimeValue, BUBBLE + i, bubbleValues[0].crimeValue, bubbleColors[i]);
        setText(bubbleValues[i].crime, bubbleValues[i].crimeValue, BUBBLETEXT + i, bubbleValues[0].crimeValue);
    }
    setInterval(function() {bubbleMovement(center);}, 1400);
    if (enlarge == true) {
        modifyBubbles("expand");
    }
    hoverPopup();
    // setTimeout(function() {
    //     alert('hello world!');
    //
    //     alert('Rendering from BUBBLE%20script.js: ' + options['date'] + ' & ' + options['lga']);
    // }, 10000);  // 10 seconds to timeout.

}

function setbubbles(crimeValue, element, smallestValue, color) {
    var height = getBubbleSize(crimeValue, element, smallestValue);
    $(element).css({"height":height + "px", "width":height + "px", "background-image":"url(" + color + ")"});
}

function getBubbleSize(crimeValue, element, smallestValue) {
    var minHeight = 40;
    var standardArea = Math.PI * Math.pow(minHeight, 2);
    var modifiedarea = crimeValue/smallestValue * standardArea;
    // Area of circle is pi * r^2
    if (crimeValue == 0) {
        return 0;
    }
    return Math.sqrt(modifiedarea / Math.PI) * 2;
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
    var BUBBLE = "#bubble_";
    for (var i = 0; i < 12; i++) {
        startingLocation[0] += bubbles[i];
        startingLocation[1] += bubbles[i];
        $(BUBBLE + i).css({"top":startingLocation[0] + "px", "left":startingLocation[1] + "px"});
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
        var BUBBLE = "#bubble_";
        // Repeat for each BUBBLE
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
            $(BUBBLE + i).css({left: moveCSSx, top: moveCSSy});
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

function hoverBubble(bubbles) {
    globalBubble = bubbles;
    for (var i = 0; i < bubbles.length; i++) {
        //     bubblecounter = i;
        // console.log(globalBubble[bubblesCounter[bubblecounter]].crimeValue);
        // This prevents hover over popup changing the bubble as well
        if (i === 7) {
            $("#popup-separator").hover(function(){
                // strip the words in front of the class till numbers
                var counter = $(this).attr("class").match(/\d+/);
                // alert(counter);
                $(this).find("span").text(globalBubble[counter].crime + "\n" +
                    globalBubble[counter].crimeValue);
                $(this).find("span").css({fontWeight: "bold"});

                // $("#popup-content").toggleClass("popup");
                // $("#popup-content").toggleClass("collapse");
                $("#popup-content").css({width: "0px"});
                $("#popup-content").find("strong").text("");
            }, function(){
                var counter = $(this).attr("class").match(/\d+/);
                $(this).find("span").text(globalBubble[counter].crime);
                $(this).find("span").css({fontWeight: "normal"})
            });
        } else {
            $("#bubble_" + i).hover(function(){
                // strip the words in front of the class till numbers
                var counter = $(this).attr("class").match(/\d+/);
                $(this).find("span").text(globalBubble[counter].crime + "\n" +
                    globalBubble[counter].crimeValue);
                $(this).find("span").css({fontWeight: "bold"})
            }, function(){
                var counter = $(this).attr("class").match(/\d+/);
                $(this).find("span").text(globalBubble[counter].crime);
                $(this).find("span").css({fontWeight: "normal"})
            });
        }
    }
}

function modifyBubbles(type) {
    for (var i = 0; i < $('.bubble').length; i++) {
        var element = BUBBLE + i;
        var elementText = BUBBLETEXT + i;
        var height, font;
        if ($(element).height() !== 0) {
            if (type == "expand") {

                height = $(element).height() + 0.04 * $(window).height();
                // Returns with px, converting to int selects only the first few numbers
                font = parseInt($(elementText).css("font-size"))  + 3;
                $("#content-container").css({gridTemplateColumns: "min-content 90vw"});
                // $("#bubble-container").css({paddingLeft: "40vw"});

                enlarge = true;


            } else if (type == "shrink") {
                height = $(element).height() - 0.04 * $(window).height();
                font = parseInt($(elementText).css("font-size")) - 3;
                $("#content-container").css({gridTemplateColumns: "min-content min-content"});
                // $("#bubble-container").css({paddingLeft: "0"});
                enlarge = false;
            } else {
                return;
            }
            console.log(font + "px");

            $(element).css({"height":height + "px", "width":height + "px"});
            $(elementText).css({"font-size":font + "px"})
        }
    }
}

function hoverPopup() {
    $("#popup-content").hover(function(){
        $(this).find("strong").text("The bubble!");
    }, function(){
        $(this).find("strong").text("Hover over me!");
    });
}

// function updateContainer() {
//     $("#bubbles-container").css({gridTemplateRows: "max-content min-content min-content",
//         gridTemplateColumns:
//             "minmax(100px, max-content) minmax(100px, 500px) minmax(100px, 500px) minmax(100px,\n" +
//             "            500px) minmax(100px, 500px)"})
// }

$(document).ready(function() {

    // Listen for dataset updates.
    $(document).on('datasetReady', function() {
        var dataset = JSON.parse(sessionStorage.getItem('dataset'));
        console.log('Regenerating bubbles for '+ sessionStorage.getItem('lga'));
        beginBubbles(dataset);
    });

});
