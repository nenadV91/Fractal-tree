let tree;
let canvas;
let grid;
let config = {
  tree: {
    color: 255,
    length: 100,
    branchLength: 0.75,
    diameter: 10,
    fractalLevel: 6,
    leftAngle: 6,
    rightAngle: 5,
    angleDeviation: 0.8
  }
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  grid = new Grid(10, 5);
  tree = new Tree({
    ...config.tree,
    x: width / 2,
    y: height
  });
}


function draw() {
  background(0);
  tree.show();
  grid.show();
}


new Control({
  text: "Left angle",
  type: "slider",
  min: 3,
  max: 20,
  value: config.tree.leftAngle,
  onChange: value => {
    tree.props.leftAngle = +value;
    tree.map(branch => {
      branch.leftAngle = +value;
      branch.updatePosition();
    })
  }
}).render()


new Control({
  text: "Right angle",
  type: "slider",
  min: 3,
  max: 20,
  value: config.tree.rightAngle,
  onChange: value => {
    tree.map(branch => {
      branch.rightAngle = +value;
      branch.updatePosition();
    })
  }
}).render()

new Control({
  text: "Fractal level",
  type: "slider",
  min: 0,
  max: 15,
  value: config.tree.fractalLevel,
  onChange: value => {
    tree.map(branch => {
      branch.fractalLevel = Math.floor(value);
      branch.updateBranches();
    })
  }
}).render()


new Control({
  text: "Angle deviation",
  type: "slider",
  min: 0,
  max: 1,
  step: 0.01,
  value: config.tree.angleDeviation,
  onChange: value => {
    tree.map(branch => {
      branch.angleDeviation = +value;
      branch.updatePosition();
    })
  }
}).render()


new Control({
  text: "Branch Length",
  type: "slider",
  min: 0.4,
  max: 0.9,
  step: 0.01,
  value: config.tree.branchLength,
  onChange: value => {
    tree.map(branch => {
      branch.branchLength = +value;
      branch.updatePosition();
    })
  }
}).render()