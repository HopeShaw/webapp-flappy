// the Game object used by the phaser.io library
var stateActions = {preload: preload, create: create, update: update};

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var i =0;
var Score = [0, 15, 30, 40, "D", "A"];
var ScoreLabel;
var player;
var pipes = [];
var levels = [ "court", "castle", "wood"];
var p = 20;
var a;
var b;
var clicks = 0;
var c = -12;
var sets = 0;
var k = 0;
var back;



function generatepipe(p, a, b) {
    for (var count = 0; count < 8; count += 1) {
        if (count != a && count != b) {
            var pipe = game.add.sprite(p, 50 * count, "pipe")
            game.physics.arcade.enable(pipe);
            pipe.body.velocity.x = -90
            pipes.push(pipe);
        }
    }
    //ScoreUpdate();
}

jQuery("#greeting-form").on("submit", function(event_details) {
    game.add.text(200,10,"Hello " + jQuery("#fullName").val(), {font: "40px Chiller", fill: "#B2CC80"});
});
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("bat", "../assets/Scarybat.png");
    game.load.image("pipe", "../assets/pipe_green.png");
    game.load.image("wall", "../assets/wall.jpg");
    game.load.image("wood", "../assets/woods.jpg");
    game.load.image("castle", "../assets/castle.jpg");
    game.load.image("court", "../assets/court.jpg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#421965");
    game.add.text(180, 180, "BEWARE OF VAMPIRES\n          Click to start", {font: "40px Chiller", fill: "#B2CC80"});
    game.input
        .onDown
        .add(clickHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    player = game.add.sprite(10, 270, "bat");
    player.width = 100;
    player.height = 50;
    //game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.physics.arcade.enable(player);
    //player.body.gravity.y = 100;

    /**for (var count = 250; count < 1000; count += 200) {
        a = game.rnd.integerInRange(1, 5);
        b = a + 1;
        generatepipe(count, a, b);
    }**/
    ScoreLabel = game.add.text(10, 10, "Points=" + Score[i].toString(), {font: "40px Chiller", fill: "#B2CC80"});
    SetLabel = game.add.text(10, 60, "Sets =" + sets.toString(), {font: "40px Chiller", fill: "#B2CC80"});

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player, pipes, gameOver);
    if (player.y > 400 || player.y < 0) {
        gameOver();
    }

}

function gameOver (){
    clicks = 0;
    $("#score").val(Score[i].toString());
    $("#set").val(sets.toString());
    $("#greeting").show();
    game.destroy();

}

function clickHandler(event){
    game.add.image(0,0,"wall")
    player = game.add.sprite(10, 270, "bat");
    player.width = 60;
    player.height = 25;
    ScoreLabel = game.add.text(10, 10, "Points =" + Score[i].toString(), {font: "40px Chiller", fill: "#421965"});
    SetLabel = game.add.text(10, 60, "Set =" + sets.toString(), {font: "40px Chiller", fill: "#421965"});
    ScoreLabel.setText("Points =" + Score[i].toString());
    SetLabel.setText("Set =" + sets.toString());
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 100;
    if (clicks <= 1){
    for (var count = 370; count < 2220; count += 370) {
        a = game.rnd.integerInRange(1, 5);
        b = a + 1;
        generatepipe(count, a, b);
        clicks ++;}
        if (clicks > 1){
            gameOver;
        }
        }
    game.time.events.loop(4.1*Phaser.Timer.SECOND, ScoreUpdate);
    game.time.events.loop(4.1*6*Phaser.Timer.SECOND, setUpdate);

}

function spaceHandler() {
    player.body.velocity.y = -100;
}
function ScoreUpdate () {
    i = (i + 1) % 6;
    ScoreLabel.setText("Point=" + Score[i].toString());


}


function setUpdate () {
    sets = (sets +1);
    SetLabel.setText("Sets=" + sets.toString());
    backdropChange();
}

function backdropChange(){
    back = game.add.image(0,0,levels[k]);
    back.width = 400
    back.width = 790
    k++;
    player = game.add.sprite(10, 270, "bat");
    player.width = 60+10*k;
    player.height = 26+5*k;
    ScoreLabel = game.add.text(10, 10, "Points =" + Score[i].toString(), {font: "40px Chiller", fill: "#421965"});
    SetLabel = game.add.text(10, 60, "Set =" + sets.toString(), {font: "40px Chiller", fill: "#421965"});
    ScoreLabel.setText("Points =" + Score[i].toString());
    SetLabel.setText("Set =" + sets.toString());
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 100;
    for (var count = 370; count < 2220; count += 370) {
        clicks = 0;
        a = game.rnd.integerInRange(1, 5);
        b = a + 1;
        generatepipe(count, a, b);
        clicks ++;}
    if (clicks > 1){
        gameOver;
    }
}

$.get("/score", function(scores){
 scores.sort(function (scoreA, scoreB){
 var difference = scoreB.score - scoreA.score;
 return difference;
 });



 for (var i = 0; i < 3; i++) {
 $("#scoreBoard").append(
 "<li>" +
 scores[i].name + ": " + scores[i].set + ", " + scores[i].score +
 "</li>");
 }


 });
