class Tree {
  constructor(props) {
    this.props = props;
    this.x = props.x;
    this.y = props.y;
    this.length = props.length;
    this.fractalLevel = props.fractalLevel;

    this.createRoot();
    this.createBranches();
  }

  createRoot() {
    let start = new p5.Vector(this.x, this.y);
    let end   = new p5.Vector(this.x, this.y - this.length);

    this.root = new Branch({start, end, ...this.props});
  }

  createBranches() {
    this.branches = this.root.branch(this.fractalLevel);
  }

  show() {
    this.root.show();
    this.branches.forEach(branch => branch.show());
  }
}