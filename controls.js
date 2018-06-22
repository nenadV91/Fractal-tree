new Control({
  text: "Left angle",
  type: "slider",
  min: 3,
  max: 20,
  value: config.tree.leftAngle,
  onChange: value => {
    tree.props.leftAngle = +value;
    config.tree.leftAngle = +value;
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
    tree.props.rightAngle = +value;
    config.tree.rightAngle = +value;
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
  step: 1,
  value: config.tree.fractalLevel,
  onChange: value => {
    tree.fractalLevel = +value;
    tree.props.fractalLevel = +value;
    tree.map(branch => {
      branch.fractalLevel = +value;
      branch.updateBranches();
    })
  }
}).render()


new Control({
  text: "Angle deviation",
  type: "slider",
  min: 0,
  max: 0.6,
  step: 0.01,
  value: config.tree.angleDeviation,
  onChange: value => {
    tree.props.angleDeviation = +value;
    tree.map(branch => {
      branch.angleDeviation = +value;
      branch.updatePosition();
    })
  }
}).render()

new Control({
  text: "Length deviation",
  type: "slider",
  min: 0,
  max: 0.5,
  step: 0.01,
  value: config.tree.lengthDeviation,
  onChange: value => {
    tree.props.lengthDeviation = +value;
    tree.map(branch => {
      branch.lengthDeviation = +value;
      branch.updatePosition();
    })
  }
}).render()


new Control({
  text: "Diameter deviation",
  type: "slider",
  min: 0,
  max: 1,
  value: config.tree.diameterDeviation,
  onChange: value => {
    tree.props.diameterDeviation = +value;
    tree.map(branch => {
      branch.diameterDeviation = +value;
      branch.updateDiameter();
    })
  }
}).render()


new Control({
  text: "Tree alpha",
  type: "slider",
  min: 1,
  max: 255,
  value: config.tree.treeAlpha,
  onChange: value => {
    tree.props.treeAlpha = +value;
    tree.map(branch => {
      branch.treeAlpha = +value;
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
    tree.props.branchLength = +value;
    tree.map(branch => {
      branch.branchLength = +value;
      branch.updatePosition();
    })
  }
}).render()


new Control({
  text: "Show flowers",
  type: "toggle",
  value: config.tree.showFlowers,
  onChange: value => {
    tree.props.showFlowers = value;
    tree.map(branch => branch.showFlowers = value)
  }
}).render()


new Control({
  text: "Generate",
  type: "button",
  onClick: event => {
    tree.generate();
  }
}).render()