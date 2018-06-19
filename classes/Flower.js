class Flower {
  constructor(position, width, height) {
    this.x = position.x;
    this.y = position.y;

    this.height = height || Math.random() * 5;
    this.width = width || Math.random() * 20;
  }

  show() {
    strokeWeight(2)
    fill('rgba(5, 251, 254, 0.4)');
    stroke('rgba(5, 251, 254, 0.2)');
    // noFill()
    //rgb(139, 4, 92)rgb(228, 146, 225)rgb(5, 251, 254)
    push()
    
    translate(this.x, this.y);
    for (var i = 0; i < 3; i++) {
      ellipse(0, 0, this.height, this.width);
      rotate(PI / 3);
    }
    
    pop()
  }
}