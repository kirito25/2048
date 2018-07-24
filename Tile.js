class Tile {
  constructor(i, j) {
    this.x = j;
    this.y = i;
    this.position = createVector(this.x * tile_size + tile_width, this.y * tile_size + tile_height);
    this.value = 0;
    this.drawEmpty();
  }
  
  drawEmpty() {
    noStroke()
    fill(238,238,238);
    rect(this.position.x, this.position.y, tile_size - tile_spacing , tile_size - tile_spacing, 10);

  }
  
  draw() {
    if (this.value == 0) {
      this.drawEmpty();
    }
    else {
      noStroke()
      fill(124,181,226);
      rect(this.position.x, this.position.y, tile_size - tile_spacing , tile_size - tile_spacing, 10);
      textSize(32);
      fill('white');
      textAlign(CENTER, CENTER);
      text(this.value, this.position.x, this.position.y, tile_size - tile_spacing, tile_size - tile_spacing);
    }
  }
  
  setValue(value) {
    this.value = value;
    this.draw();
  }
  
  init() {
    if (random(1) < chances_four) {
      this.setValue(4);
    }
    else {
      this.setValue(2);
    }
  }
  
  setEmpty() {
    this.value = 0;
  }
  
  isEmpty() {
    return this.value == 0; 
  }
  
  canMerge(tile) {
    return ( (this.value == tile.value) && !this.merged && !tile.merged );
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
    var position = createVector(x * tile_size + tile_width, y * tile_size + tile_height);
    var speed = createVector(1, 0);
    while (this.position.x < position.x) {
      this.position = this.position + speed;
      this.draw();
    }
  }
  
}
