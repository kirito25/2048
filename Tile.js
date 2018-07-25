function drawEmptyTile(i, j) {
    var x = j;
    var y = i;
    push();
    stroke(1);
    fill(238,238,238);
    var position = createVector(x * tile_size + tile_width, y * tile_size + tile_height, 0);
    rect(position.x, position.y, tile_size - tile_spacing , tile_size - tile_spacing, 10);
    pop();
}

function tileVector(i, j) {
  var x = j;
  var y = i;
  return createVector(x * tile_size + tile_width, y * tile_size + tile_height, 0)
}

class Tile {
  constructor(i, j) {
    this.moving = false;
    this.position = tileVector(i, j);
    this.value = 0;
    this.speed = createVector(0, 0, 0);
    this.newposition = this.position.copy();
    this.textColor = 'white';
    this.background = 'rgb(124,181,226)';
  }
  
  setValue(value)  { this.value = value; }
  setEmpty()       { this.value = 0; }
  isEmpty()        { return this.value == 0; }
  isMoving()       { return this.moving; }
  
  draw() {
    push();
    if (!(this.position.equals(this.newposition))) {
      this.moving = true;
      this.position.add(this.speed);
    }
    else { this.moving = false; }
    fill(this.background);
    rect(this.position.x, this.position.y, tile_size - tile_spacing , tile_size - tile_spacing, 10);
    textSize(32);
    fill(this.textColor);
    textAlign(CENTER, CENTER);
    text(this.value, this.position.x, this.position.y, tile_size - tile_spacing, tile_size - tile_spacing);
    pop();
  }
  
  init() {
    if (random(1) < chances_four) { this.setValue(4); }
    else { this.setValue(2); }
  }
  
  canMerge(tile) {
    return (this.value == tile.value) && !this.merged && !tile.merged;
  }
  
  merge(tile) {
    this.value = this.value + tile.value;
  }
  
  moveLeft(i, j) {
    var x = j;
    var y = i;
    this.newposition = tileVector(i, j);
    this.speed.set(speed * -1, 0, 0);
  }
  
  moveRight(i, j) {
    var x = j;
    var y = i;
    this.newposition = tileVector(i, j);
    this.speed.set(speed, 0, 0);
  }
  
  moveUp(i, j) {
    var x = j;
    var y = i;
    this.newposition = tileVector(i, j);
    this.speed.set(0, speed * -1 , 0);
  }
  
  moveDown(i, j) {
    var x = j;
    var y = i;
    this.newposition = tileVector(i, j);
    this.speed.set(0, speed, 0);
  }
}
