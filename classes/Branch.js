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
    this.diameterDeviation = props.diameterDeviation;
    this.showFlowers = props.showFlowers;
  }

  show() {
    stroke(this.color);
    strokeWeight(this.diameter);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    if(this.flower) {
      if(this.showFlowers) this.flower.show();
    }
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

  rand3(min, max) {
    return random(min, max);
  }

  normalize(value, min, max) {
    return (value - min) / (max - min);
  }

  branch(limit, level = 0) {
    let branches = [];
    this.level = level;
    this.randDiameter = random(0.4, 1.3);
    this.randAngleDeviation = this.rand3(-this.level - 1, this.level + 1);
    this.randLengthDeviation = this.rand3(0.1, 0.6);
    this.growFlower()


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
      (-PI / (this.leftAngle + this.randAngleDeviation * this.angleDeviation)) : 
      (PI / (this.rightAngle + this.randAngleDeviation * this.angleDeviation));
  }

  getLength() {
    return this.branchLength + this.randLengthDeviation * this.lengthDeviation;
  }

  getDiameter() {
    let factor = map(this.diameterDeviation, 1, 0, this.randDiameter, 1);
    let diameter = map(this.level, 0, this.fractalLevel, 0.9, 0.5);
    return this.diameter * diameter * factor;
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

  grow(direction) {
    let angle = this.getAngle(direction);
    let position = this.getPosition(angle);
    let diameter = this.getDiameter();
    let showFlowers = this.showFlowers;
    let branch = new Branch({...this.props, ...position, parent: this, diameter, showFlowers});
    
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

      if(this.flower) {
        this.flower.x = this.end.x;
        this.flower.y = this.end.y;
      }
    }
  }

  updateBranches() {
    if(this.level > this.fractalLevel - 1) {
      if(this.branches) this.branches = [];
    }

    if(this.level == this.fractalLevel) {
      this.flower = new Flower(this.end);
    }

    if(this.level < this.fractalLevel) {
      this.flower = null;
    }

    if(this.level == this.fractalLevel - 1) {
      if(!this.branches || this.branches && !this.branches.length) {
        this.branch(this.fractalLevel, this.level);
      }
    }
  }

  updateDiameter() {
    if(this.parent) {
      this.diameter = this.parent.getDiameter();
    }
  }

  growFlower() {
    if(this.level == this.fractalLevel) {
      this.flower = new Flower(this.end);
    }
  }
}