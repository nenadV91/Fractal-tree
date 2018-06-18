class Grid {
  constructor(rows, cols) {
    this.size = size;

    this.xSize = width / rows;
    this.ySize = height / cols;

    this.create();
  }

  create() {
    this.rows = [];
    this.cols = [];

    for(var i = 0; i < width; i += this.xSize) {
      this.rows.push(i);
    }

    for(var i = 0; i < height; i += this.ySize) {
      this.cols.push(i);
    }
  }

  show() {
    stroke(color(255, 255, 255, 20));
    strokeWeight(1);

    this.rows.forEach(i => line(i, height, i, 0));
    this.cols.forEach(i => line(0, i, width, i));
  }
}