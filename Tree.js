class Tree {
  constructor(props) {
    this.props = props;
    this.x = props.x;
    this.y = props.y;
    this.length = props.length;
    this.fractalLevel = props.fractalLevel;

    this.generate();
  }

  createRoot() {
    let start = new p5.Vector(this.x, this.y);
    let end   = new p5.Vector(this.x, this.y - this.length);

    this.root = new Branch({start, end, ...this.props});
  }

  createBranches() {
    this.root.branch(this.fractalLevel);
  }

  show() {
    this.root.run(branch => branch.show());
  }

  map(callback) {
    this.root.run(branch => callback(branch));
  }

  generate() {
    this.createRoot();
    this.createBranches();
  }
}