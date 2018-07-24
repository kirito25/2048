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
    this.tiles[3][3].moveLeft(3, 0);
  
  }
  
  moveRight() {
    
    
    
  }
  
  draw() {
    
  }
  
  isGameOver() {
    return false;
  }
}
