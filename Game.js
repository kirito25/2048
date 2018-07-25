class Game {
  constructor(n, m) {
    this.n = n;
    this.m = m;
    this.tiles = [];
    this.moving = false;
    for (var i = 0; i < n; i++) {
      this.tiles[i] = [];
      for (var j = 0; j < m; j++) {
        this.tiles[i][j] = new Tile(i, j);
      }
    }
    this.addNTiles(2);
  }
  
  addNTiles(n) {
    if (this.isGameOver()) {
      return;
    }
    var i = 0;
    while (i < n) {
      var row = Math.floor(random(0, this.n));
      var column = Math.floor(random(0, this.m));
      if (this.tiles[row][column].isEmpty()) {
        this.tiles[row][column] = new Tile(row, column);
        this.tiles[row][column].init();
        i++;
      }
    }
  }
  
  moveUp() {

    
  }
  
  moveDown() {

  }
  
  moveLeft() {
    
    for (var z = 0; z < 4; z++) {
    
      for (var i = 0; i < this.n; i++) {
        for (var j = 0; j < this.m; j++) {
          for (var k = j - 1; k >= 0; k--) {
            if (this.tiles[i][k].isEmpty()) {
              this.tiles[i][j].moveLeft(i, k);
              this.tiles[i][k].moveRight(i, j);
              this.swap(i, j, i, k);
            }
          }
        }
      }
    
    }
  }
  
  moveRight() {

  }
  
  draw() {
    this.moving = false;
    this.full = false;
    // Draw ALL
    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.m; j++) {
        this.moving = (this.moving || this.tiles[i][j].isMoving());
        var t = new Tile(i, j);
        // make sure to draw the background as it moves in
        t.draw();
        var t = new Tile(i, j);
        this.tiles[i][j].draw();
      }
    }
    

    // Draw only active so they are on top 
    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.m; j++) {
        if (!this.tiles[i][j].isEmpty()) {
          this.tiles[i][j].draw();
        }
      }
    }
    
  }
  
  isGameOver() {
    return false;
  }
  
  isMoving() { return this.moving; }
  
  swap(i, j, u, v) {
    // Put [i][j] in [u][v];
    var temp = this.tiles[u][v];
    this.tiles[u][v] = this.tiles[i][j];
    this.tiles[i][j] = temp;
    //this.tiles[i][j].setPosition(i, j);
  }
  
  
}
