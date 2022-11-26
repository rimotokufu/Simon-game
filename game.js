var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//function to start over
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



//function to check answer

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        playSound("wrong");
       
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any key to restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}


//detect key press

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level" + level);
        nextSequence();
        started = true;
    }
});

//detect click
$(".btn").click(function(){
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);  
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

//sound function

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
audio.play();
}


//function for sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level );

var randomNumber = Math.floor(Math.random()*4);
 var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


playSound(randomChosenColour);

}

//function to animate press

function animatePress(currentColor){
   
    $("#" + currentColor).addClass("pressed");

    setTimeout( function(){
        $("#" + currentColor).removeClass("pressed");
    },100);

}


