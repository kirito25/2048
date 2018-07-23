class Game {
  constructor() {
    for (var i = 0; i < 4; i++) {
      tiles[i] = [];
      for (var j = 0; j < 4; j++) {
        tiles[i][j] = new Tile(j, i);
      }
    }
    
    this.addNTiles(1);
    this.gameOver = false;
  }
  
  addNTiles(n) {
    if (this.isGameOver()) {
      return;
    }
    var i = 0;
    while (i < n) {
      var row = Math.floor(random(0, 4));
      var column = Math.floor(random(0, 4));
      if (tiles[row][column].isEmpty()) {
        tiles[row][column].init();
        i++;
      }
    }
  }
  
  moveUp() {

    for (var i = 1; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        for (var k = i; k > 0; k--) {
          if (tiles[k][j].canMerge(tiles[k-1][j])) {
            tiles[k-1][j].merge(tiles[k][j]);
          }
        }
        
      }
    }
  }
  
  moveDown() {

    for (var i = 3; i >= 0; i--) {
      for (var j = 0; j < 4; j++) {
        
        for (var k = i; k < 3; k++) {
          if (tiles[k][j].canMerge(tiles[k+1][j])) {
            tiles[k+1][j].merge(tiles[k][j]);
          }
        }
        
      }
      
    }
  }
  
  moveLeft() {
  
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        for (var k = j; k > 0; k--) {
          if (tiles[i][k].canMerge(tiles[i][k - 1])) {
            tiles[i][k - 1].merge(tiles[i][k]);
          }
        }
      }
    }
  }
  
  moveRight() {
    
    for (var i = 0; i < 4; i++) {
      for (var j = 3; j >= 0; j--) {
        
        for (var k = j; k < 3; k++) {
          if (tiles[i][k].canMerge(tiles[i][k + 1])) {
            tiles[i][k + 1].merge(tiles[i][k]);
          }
        }
        
      }
    }
    
  }
  
  draw() {
   for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        tiles[i][j].draw();
      }
    } 
  }
  
  isGameOver() {
    var over = true;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        over = (over && !tiles[i][j].isEmpty() );
      }
    }
    this.gameOver = over;
    return over;
  }
  
  
}
