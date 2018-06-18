class Branch {
  constructor(props) {
    this.props = props;
    this.parent = props.parent;
    this.start = props.start;
    this.end = props.end;
    this.color = props.color;

    this.diameter = props.diameter;
    this.fractalLevel = props.fractalLevel;
    this.branchLength = props.branchLength;
    this.leftAngle = props.leftAngle;
    this.rightAngle = props.rightAngle;
    this.length = props.length;
    this.angleDeviation = props.angleDeviation;
    this.lengthDeviation = props.lengthDeviation;
  }

  show() {
    stroke(this.color);
    strokeWeight(this.diameter);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  run(callback) {
    callback(this);
    if(this.branches && this.branches.length) {
      this.branches.forEach(branch => branch.run(callback));
    }
  }

  rand() {
    return random(2) - 1;
  }

  rand2(n) {
    return this.rand() * n;
  }

  branch(limit, level = 0) {
    let branches = [];
    this.level = level;
    this.maxAngleDeviation = this.rand2(3);
    this.maxLengthDeviation = this.rand2(0.2);

    if(limit <= level) {
       return branches;
    }

    let left  = this.grow("left");
    let right = this.grow("right");

    left.direction = "left";
    right.direction = "right";

    branches.push(left, right);
    left.branch(limit, level + 1)
    right.branch(limit, level + 1)

    this.branches = branches;
  }

  getAngle(direction) {
    return direction == "left" ? 
      (-PI / (this.leftAngle + this.maxAngleDeviation * this.angleDeviation)) : 
      (PI / (this.rightAngle + this.maxAngleDeviation * this.angleDeviation));
  }

  getLength() {
    return this.branchLength + this.maxLengthDeviation * this.lengthDeviation;
  }

  getPosition(angle) {
    let start = this.end;
    let length = this.getLength();
    let rotated = p5.Vector
      .sub(this.end, this.start)
      .rotate(angle)
      .mult(length)
  
    let end = p5.Vector.add(this.end, rotated);
    return {start, end}
  }

  getDiameter() {
    return this.diameter * 0.75;
  }

  grow(direction) {
    let angle = this.getAngle(direction);
    let position = this.getPosition(angle);
    let diameter = this.getDiameter();
    let branch = new Branch({...this.props, ...position, parent: this, diameter});

    return branch
  }

  updatePosition() {
    if(this.parent) {
      let angle = this.parent.getAngle(this.direction);
      let position = this.parent.getPosition(angle);
      this.end.x = position.end.x;
      this.end.y = position.end.y;
      this.start.x = position.start.x;
      this.start.y = position.start.y;
    }
  }

  updateBranches() {
    if(this.level > this.fractalLevel) {
      if(this.branches) this.branches = [];
    }

    if(this.level == this.fractalLevel - 1) {
      if(!this.branches || this.branches && !this.branches.length) {
        this.branch(this.fractalLevel, this.level);
      }
    }
  }
}