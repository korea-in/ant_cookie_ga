class Cookie {
  x = 0;
  y = 0;

  constructor() {
    this.x = Math.random() * (CANVAS_WIDTH - (COOKIE_PADDING * 2)) + COOKIE_PADDING;
    this.y = Math.random() * (CANVAS_HEIGHT - (COOKIE_PADDING * 2)) + COOKIE_PADDING;
  }

  show() {
    noStroke();
    fill(255, 0, 0);   // 빨간색
    ellipse(this.x, this.y, 5, 5); // 지름 5
  }
}
