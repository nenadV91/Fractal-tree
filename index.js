let tree;
let canvas;
let grid;
let config = {
  view: {
    x: null,
    y: null
  },
  tree: {
    color: "rgb(255, 255, 255)",
    flowerColor: "rgb(5, 251, 254)",
    rootLength: 120,
    branchLength: 0.7,
    diameter: 20,
    fractalLevel: 9,
    leftAngle: 7,
    rightAngle: 7,
    angleDeviation: 0.4,
    lengthDeviation: 0.2,
    diameterDeviation: 0.7,
    treeAlpha: 100,
    showFlowers: true
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  config.view = {x: width / 2.5, y: height}
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
  config.view = {x: width / 2.5, y: height}
}