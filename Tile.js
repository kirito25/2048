class Tile {
  constructor(i, j) {
    var x = j;
    var y = i;
    this.moving = false;
    this.position = createVector(x * tile_size + tile_width, y * tile_size + tile_height, 0);
    this.value = 0;
    this.speed = createVector(0, 0, 0);
    this.newposition = this.position.copy();
  }
  
  setPosition(i, j) {
    //if (this.moving) { return; }
    var x = j;
    var y = i;
    this.position.set(x * tile_size + tile_width, y * tile_size + tile_height, 0);
    this.newposition.set(x * tile_size + tile_width, y * tile_size + tile_height, 0);
    this.speed.set(0,0,0);
  }
  
  setValue(value)  { this.value = value; }
  setEmpty()       { this.value = 0; }
  isEmpty()        { return this.value == 0; }
  isMoving()       { return this.moving; }
  
  drawEmpty() {
    fill(238,238,238);
    rect(this.position.x, this.position.y, tile_size - tile_spacing , tile_size - tile_spacing, 10);
  }
  
  draw() {
    if (this.isEmpty()) { this.drawEmpty(); }
    else {
      if (!(this.position.equals(this.newposition))) {
        this.moving = true;
        this.position.add(this.speed);
      }
      else { this.moving = false; }
      fill(124,181,226);
      rect(this.position.x, this.position.y, tile_size - tile_spacing , tile_size - tile_spacing, 10);
      textSize(32);
      fill('white');
      textAlign(CENTER, CENTER);
      text(this.value, this.position.x, this.position.y, tile_size - tile_spacing, tile_size - tile_spacing);
    }
  }
  
  init() {
    if (random(1) < chances_four) {
      this.setValue(4);
    }
    else {
      this.setValue(2);
    }
  }
  
  canMerge(tile) {
    return ( (this.value == tile.value) && !this.merged && !tile.merged ) || tile.isEmpty();
  }
  
  merge(tile) {
    if (!this.isEmpty() && !tile.isEmpty()) {
      this.merged = true;
    }
    this.value = this.value + tile.value;
    tile.setEmpty();
  }
  
  moveLeft(i, j) {
    var x = j;
    var y = i;
    this.newposition.set(x * tile_size + tile_width, y * tile_size + tile_height, 0);
    this.speed.set(speed * -1, 0, 0);
  }
  
  moveRight(i, j) {
    var x = j;
    var y = i;
    this.newposition.set(x * tile_size + tile_width, y * tile_size + tile_height, 0);
    this.speed.set(speed, 0, 0);
  }
  
  moveUp(i, j) {
    var x = j;
    var y = i;
    this.newposition.set(x * tile_size + tile_width, y * tile_size + tile_height, 0);
    this.speed.set(0, speed * -1 , 0);
  }
  
  moveDown(i, j) {
    var x = j;
    var y = i;
    this.newposition.set(x * tile_size + tile_width, y * tile_size + tile_height, 0);
    this.speed.set(0, speed, 0);
  }
}
