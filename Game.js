class Game {
  constructor(n, m) {
    this.n = n;
    this.m = m;
    this.tiles = []
    for (var i = 0; i < n; i++) {
      this.tiles[i] = [];
      for (var j = 0; j < m; j++) {
        this.tiles[i][j] = new Tile(i, j);
      }
    }
    this.tiles[3][3].setValue(2);
    //this.addNTiles(1);
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
    this.tiles[3][3].moveLeft(3, 2);
    this.swap(3,3,3,2);
   
  
  }
  
  moveRight() {

  }
  
  draw() {
    // Draw ALL
    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.m; j++) {
        this.tiles[i][j].draw();
      }
    }
    
    // Draw only active so they are on top 
    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.m; j++) {
        if (!this.tiles[i][j].isEmpty()) {
          var t = new Tile(i, j);
          // make sure to draw the background as it moves in
          t.draw();
          this.tiles[i][j].draw();
        }
      }
    }
    
  }
  
  isGameOver() {
    return false;
  }
  
  swap(i, j, u, v) {
    // Put [i][j] in [u][v];
    var temp = this.tiles[u][v];
    this.tiles[u][v] = this.tiles[i][j];
    this.tiles[i][j] = temp;
    this.tiles[i][j].setPosition(i, j);
  }
  
}
