var game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {preload: preload, create: create, update: update});

var ball;
var paddle;
//create a group of bricks
var bricks;
//a new brick object added to the group
var newBrick;
//brickInfo object will store all the information we need
var brickInfo;

var scoreText;
var score = 0;

var lives = 3;
var livesText;
var lifeLostText;

var playing = false;
var startButton;


//Preloading the assets
function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
    game.load.image('ball', 'img/ball.png');
    game.load.image('paddle', 'img/paddle.png');
    game.load.image('brick', 'img/brick.png');
    game.load.spritesheet('ball', 'img/wobble.png', 20, 20);
    game.load.spritesheet('button', 'img/button.png', 120, 40);
}

function ballLeaveScreen() {
    lives--;
    if(lives) {
        livesText.setText('Lives: '+lives);
        lifeLostText.visible = true;
        ball.reset(game.world.width*0.5, game.world.height-55);
        ball.body.gravity.y = 0;
        paddle.reset(game.world.width*0.5, game.world.height-5);
        game.input.onDown.addOnce(function(){
            lifeLostText.visible = false;
            ball.body.gravity.y = 50;
            ball.body.velocity.set(100,-200);
        }, this);
    }
    else {
        alert('You lost, game over!');
        location.reload();
    }
}

function startGame() {
    // startButton.destroy();
    ball.body.velocity.set(100, -200);
    ball.body.gravity.y = 50;
    playing = true;
}

//The code is executed once when everything is loaded and ready
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //set the ball position
  ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
  ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24);
  ball.anchor.set(0.5);
  //enable physics on ball
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);

  paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
  paddle.anchor.set(0.5,1);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  paddle.body.immovable = true;
  //disable ball's collision with the bottom edge of the screen
  game.physics.arcade.checkCollision.down = false;
  //make the ball check the world (canvas) bounds and execute alert if onOutOfBounds
  ball.checkWorldBounds = true;

  //define what happens whenthe ball leaves the canvas
  // ball.events.onOutOfBounds.add(function(){
  //     alert('Game over!');
  //     location.reload();
  // }, this);
  ball.events.onOutOfBounds.add(ballLeaveScreen, this);

  //drawing the bricks
  initBricks();

  //define text styling
  textStyle = { font: '18px Arial', fill: '#0095DD' };

  //score
  scoreText = game.add.text(5, 5, 'Points: 0', textStyle);

  //define a position on the screen, the actual text to display, and the font styling
  livesText = game.add.text(game.world.width-5, 5, 'Lives: '+lives, textStyle);
  livesText.anchor.set(1,0);
  lifeLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Life lost, click to continue', textStyle);
  lifeLostText.anchor.set(0.5);
  //lifeLostText will be shown only when the life is lost, so its visibility is initially set to false
  lifeLostText.visible = false;

  startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);
  startButton.anchor.set(0.5);

}

function ballHitBrick(ball,brick) {
    // brick.kill();
    // var killTween = game.add.tween(brick.scale);
    // killTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
    // killTween.onComplete.addOnce(function(){
    //   brick.kill();
    // }, this);
    // killTween.start();
    //tween will double the brick's scale in half a second using Elastic easing, will start automatically, and have a delay of 100 miliseconds
    game.add.tween(brick.scale).to({x:0,y:0}, 200, Phaser.Easing.Linear.Out, true, 100);

    score += 10;
    //display the current score
    scoreText.setText('Points: '+score);

    var count_alive = 0;
    //loop through the bricks group using bricks.children, checking for aliveness of each breick with each brick's .alive()
    for (i = 0; i < bricks.children.length; i++) {
      if (bricks.children[i].alive == true) {
        count_alive++;
      }
    }
    //if no more brick is left alive, show a winning message, restart the game
    if (count_alive == 0) {
      alert('You won the game, congratulations!');
      location.reload();
    }
};



function ballHitPaddle(ball, paddle) {
    ball.animations.play('wobble');
    ball.body.velocity.x = -1*5*(paddle.x-ball.x);
}

//The code inside it is executed on every frame
function update() {
  // ball.x += 1;
  // ball.y += 1;
  // checking for collision
  game.physics.arcade.collide(ball, paddle, ballHitPaddle);
  //ball's position is calculated against the positions of all the bricks in the group
  game.physics.arcade.collide(ball, bricks, ballHitBrick);
  //set position of paddle
  if(playing) {
    paddle.x = game.input.x || game.world.width*0.5;
  }
}

function initBricks() {
  brickInfo = {
    width: 50,
    height: 20,
    count: {
        row: 7,
        col: 3
    },
    offset: {
        top: 50,
        left: 60
    },
    padding: 10
  };

  //create an empty bricks group to contain the new bricks later
  bricks = game.add.group();

  //loop through the rows and columns to create new brick on each iteration
  for(c=0; c<brickInfo.count.col; c++) {
    for(r=0; r<brickInfo.count.row; r++) {
      var brickX = (r*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
      var brickY = (c*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
        newBrick = game.add.sprite(brickX, brickY, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
    }
  }




}
