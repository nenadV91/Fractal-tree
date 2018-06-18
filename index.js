let tree;
let canvas;
let grid;
let config = {
  view: {},
  tree: {
    color: 255,
    length: 100,
    branchLength: 0.75,
    diameter: 10,
    fractalLevel: 10,
    leftAngle: 7.5,
    rightAngle: 6.5,
    angleDeviation: 0.8,
    lengthDeviation: 0.4
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  config.view = {x: width / 2, y: height}
  grid = new Grid(10, 5);
  tree = new Tree({...config.tree});
}

function draw() {
  translate(config.view.x, config.view.y)
  background(0);
  tree.show();
  grid.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  grid.create();
  config.view = {x: width / 2, y: height}
}