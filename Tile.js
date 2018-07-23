class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.position = createVector(x * tile_size + tile_width, y * tile_size + tile_height);
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
    return ( (this.value == tile.value) || this.isEmpty() || tile.isEmpty() );
  }
  
  merge(tile) {
    this.value = this.value + tile.value;
    tile.setEmpty();
  }
  
}
