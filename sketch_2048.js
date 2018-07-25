var tile_width = 100;
var tile_height = 100;
var tile_size = 100;
var tile_spacing = 10;
var speed = 20;
var k = 0;
var chances_two = 0.9;
var chances_four = 0.1;
var game;

function setup() {
  var canvas = createCanvas(720, 720);
  stroke(10);
  game = new Game(4,4);
  frameRate(60);
}

function draw() {
  background(255);
  game.draw();

}

function keyPressed() {
  if (game.isMoving()) { return; }
  switch (keyCode) {
    case LEFT_ARROW:
      game.moveLeft();
      game.addNTiles(1);
      break;
    case RIGHT_ARROW:
      game.moveRight();
      //game.addNTiles(1);
      break;
    case UP_ARROW:
      game.moveUp();
      //game.addNTiles(1);
      break;
    case DOWN_ARROW:
      game.moveDown();
      //game.addNTiles(1);
      break;
    default:
      break;
  }
}
