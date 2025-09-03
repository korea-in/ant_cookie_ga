class Cookie {
  x = 0;
  y = 0;

  constructor() {
    this.x = Math.random() * (CANVAS_WIDTH - 60) + 30;
    this.y = Math.random() * (CANVAS_HEIGHT - 60) + 30;
  }

  show() {
    noStroke();
    fill(255, 0, 0);   // 빨간색
    ellipse(this.x, this.y, 5, 5); // 지름 5
  }
}
