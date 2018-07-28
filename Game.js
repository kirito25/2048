class Game {
  constructor(n, m) {
    this.n = n;
    this.m = m;
    this.tiles = [];
    this.moving = false;
    this.full = false;
    this.addOne = false;
    
    // init matrix to all zeros
    for (var i = 0; i < n; i++) {
      this.tiles[i] = [];
      for (var j = 0; j < m; j++) {
        this.tiles[i][j] = 0;
      }
    }
    // start with 2 tiles
    this.addNTiles(2);
  }
  
  isGameOver() { return this.full; }
  
  addNTiles(n) {
    if (this.full) {
      return;
    }
    var i = 0;
    while (i < n) {
      var row = Math.floor(random(0, this.n));
      var column = Math.floor(random(0, this.m));
      if (this.tiles[row][column] == 0) {
        this.tiles[row][column] = new Tile(row, column);
        this.tiles[row][column].init();
        i++;
      }
    }
  }
  
  moveUp() {
    if (this.isMoving()) { return; }
    var k = 0;
    for (var z = 0; z < this.n; z++) { 
      for (var i = 0; i < this.n; i++) {
        for (var j = 0; j < this.m; j++) {
          k = i - 1;
          if (k >= 0) {
            // the tile above is empty and we are tile
            if (this.tiles[k][j] == 0 && this.tiles[i][j] != 0) {
              this.tiles[i][j].moveUp(k, j);
              this.swap(i, j, k, j);
            }
            else if (this.tiles[i][j] != 0 && this.tiles[k][j] != 0) { // both are tiles
              if (this.tiles[i][j].canMerge(this.tiles[k][j]) && k == i - 1) { // can merge and are next to each other
                this.tiles[i][j].moveUp(k, j);
                this.tiles[i][j].merge(this.tiles[k][j]);
                this.tiles[k][j] = 0;
                this.swap(i, j, k, j);
              }
            }
          }
        }
      }
    }
  }
  
  moveDown() {
    if (this.isMoving()) { return; }
    var k = 0;
    for (var z = 0; z < this.n; z++) { 
      for (var i = this.n - 1; i >= 0; i--) {
        for (var j = 0; j < this.m; j++) {
          k = i + 1;
          if (k < this.n) {
            // the tile below is empty and we are tile
            if (this.tiles[k][j] == 0 && this.tiles[i][j] != 0) {
              this.tiles[i][j].moveDown(k, j);
              this.swap(i, j, k, j);
            }
            else if (this.tiles[i][j] != 0 && this.tiles[k][j] != 0) { // both are tiles
              if (this.tiles[i][j].canMerge(this.tiles[k][j]) && k == i + 1) { // can merge and are next to each other
                this.tiles[i][j].moveDown(k, j);
                this.tiles[i][j].merge(this.tiles[k][j]);
                this.tiles[k][j] = 0;
                this.swap(i, j, k, j);
              }
            }
          }
        }
      }
    }
  }
  
  moveLeft() {
    if (this.isMoving()) { return; }
    for (var z = 0; z < this.m; z++) {
      for (var i = 0; i < this.n; i++) {
        for (var j = 0; j < this.m; j++) {
          var k = j - 1;
          if (k >= 0) {
            // the tile to the left is empty and we are a tile
            if (this.tiles[i][k] == 0 && this.tiles[i][j] != 0) {
              this.tiles[i][j].moveLeft(i, k);
              this.swap(i, j, i, k);
            }
            else if (this.tiles[i][j] != 0 && this.tiles[i][k] != 0) { // both are tiles
              if (this.tiles[i][j].canMerge(this.tiles[i][k]) && k == j - 1) { // can merge and are next to each other
                this.tiles[i][j].moveLeft(i, k);
                this.tiles[i][j].merge(this.tiles[i][k]);
                this.tiles[i][k] = 0;
                this.swap(i, j, i, k);
              }
            }
          }
        }
      }
    }
  }
  
  moveRight() {
    if (this.isMoving()) { return; }
    var k = 0;
    for (var z = 0; z < this.m; z++) {
      for (var i = 0; i < this.n; i++) {
        for (var j = this.m - 1; j >= 0; j--) {
          k = j + 1;
          if(k < this.m) {
            // the tile to the right is empty and we are tile
            if (this.tiles[i][k] == 0 && this.tiles[i][j] != 0) {
              this.tiles[i][j].moveRight(i, k);
              this.swap(i, j, i, k);
            }
            else if (this.tiles[i][j] != 0 && this.tiles[i][k] != 0) { // both are tiles
              if (this.tiles[i][j].canMerge(this.tiles[i][k]) && k == j + 1) { // can merge and are next to each other
                this.tiles[i][j].moveRight(i, k);
                this.tiles[i][j].merge(this.tiles[i][k]);
                this.tiles[i][k] = 0;
                this.swap(i, j, i, k);
              }
            }
          }
        }
      }
    }
  }
  
  draw() {
    this.full = false;
    var tileCount = 0;
    // Draw Background
    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.m; j++) {
        drawEmptyTile(i, j);
      }
    }

    // Draw active tiles
    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.m; j++) {
        if (this.tiles[i][j] != 0) {
          this.tiles[i][j].draw();
          tileCount++;
        }
      }
    }
    
    this.full = tileCount == (this.n * this.m);
    if (!this.isMoving() && this.addOne) {
      this.addOne = false;
      this.addNTiles(1);
    }

  }
  
  swap(i, j, u, v) {
    // Put [i][j] in [u][v];
    var temp = this.tiles[u][v];
    this.tiles[u][v] = this.tiles[i][j];
    this.tiles[i][j] = temp;
    this.addOne = true;
  }
  
  isMoving() {
    var tempMoving = false;
    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.m; j++) {
        if (this.tiles[i][j] != 0) {
          tempMoving = (tempMoving || this.tiles[i][j].isMoving());
        }
      }
    }
    return tempMoving;
  }
  
  
}
