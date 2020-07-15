const buttonColors = ["red", "blue", "green", "yellow"];
// const sound = ["sounds/red.mp3", "sounds/blue.mp3", "sounds/green.mp3", "sounds/yellow.p3"];
const gamePattern = [];
const userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(document).keydown(function() {
    if(!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    let correct = checkAnswer(userClickedPattern.length);
    if(!correct) {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        restart();
    }
    else if(userClickedPattern.length == gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }

    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
});

function nextSequence() {
    level++;
    userClickedPattern.splice(0, userClickedPattern.length);

    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(color) {
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);

}

function checkAnswer(len) {
    if(userClickedPattern[len - 1] == gamePattern[len - 1]) {
        return true;
    }
    else {
        return false;
    }
}

function restart() {
    level = 0;
    gameStarted = false;
    gamePattern.splice(0, gamePattern.length);
}
