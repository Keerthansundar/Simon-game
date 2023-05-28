var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var count=0;
var i;
keyPress();
function keyPress(){
    $("body").one("keypress",function(){
        $("h1").text("level: "+count);
        nextSequence();
    });
}


$(".btn").click(function(event){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    i=userClickedPattern.length;
    checkAnswer(i-1);
});

function nextSequence(){
    userClickedPattern=[];
    count=count+1;
    $("h1").text("level: "+count);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    gamePattern.push(randomChosenColor);

    var audio = new Audio("sounds/"+ randomChosenColor +".mp3");
    audio.play();
}

var name;
function playSound(name){
    $("#"+name).fadeOut(100).fadeIn(100);
    var audio=new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+ currentColor ).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor ).removeClass("pressed")
    },10);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }else {
        $("h1").text("Game over, Press any key to restart");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
        keyPress();
    }
}

function startOver(){
    count=0;
    gamePattern=[]

}