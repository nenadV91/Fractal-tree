class Flower {
  constructor(position, color, width, height) {
    this.x = position.x;
    this.y = position.y;
    this.color = color;

    this.height = height || Math.random() * 5;
    this.width = width || Math.random() * 20;
  }

  show() {
    strokeWeight(2)

    let fillColor = color(this.color);
    let strokeColor = color(this.color);
    fillColor.setAlpha(100);
    strokeColor.setAlpha(50);

    fill(fillColor);
    stroke(strokeColor);
    
    push()
    
    translate(this.x, this.y);
    for (var i = 0; i < 3; i++) {
      ellipse(0, 0, this.height, this.width);
      rotate(PI / 3);
    }
    
    pop()
  }
}