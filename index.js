let tree;
let canvas;
let config = {
  tree: {
    length: 100,
    branchLength: 0.8,
    diameter: 10,
    fractalLevel: 3,
    leftAngle: 6,
    rightAngle: 5
  }
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  tree = new Tree({
    ...config.tree,
    x: width / 2,
    y: height
  });
}


function draw() {
  background(0);
  tree.show();
}







class Branch {
  constructor(props) {
    this.props = props;
    this.start = props.start;
    this.end = props.end;

    this.diameter = props.diameter;
    this.fractalLevel = props.fractalLevel;
    this.branchLength = props.branchLength;
    this.leftAngle = props.leftAngle;
    this.rightAngle = props.rightAngle;
    this.length = props.length;
  }

  show() {
    stroke(255)
    strokeWeight(this.diameter);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  setLevel(level) {
    this.level = level;
  }

  branch(limit, level = 0) {
    let branches = [];
    this.setLevel(level);

    if(limit <= level) {
       return branches;
    }

    let left  = this.grow("left");
    let right = this.grow("right");

    branches.push(left, right);
    branches.push(...left.branch(limit, level + 1));
    branches.push(...right.branch(limit, level + 1));

    return branches;
  }

  getAngle(direction) {
    return direction == "left" ? 
      (PI / this.leftAngle) : 
      (-PI / this.rightAngle);
  }

  getPosition(angle) {
    let start = this.end;
    let rotated = p5.Vector
      .sub(this.end, this.start)
      .rotate(angle)
      .mult(this.branchLength)
  
    let end = p5.Vector.add(this.end, rotated);
    return {start, end}
  }

  grow(direction) {
    let angle = this.getAngle(direction);
    let position = this.getPosition(angle);
    let diameter

    return new Branch({...this.props, ...position})
  }
}