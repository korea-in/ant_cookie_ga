class Tree {
  x = 0;
  y = 0;
  size = 0;

  constructor() {
    this.size = int(Math.random() * TREE_SIZE) + TREE_SIZE;

    this.x = Math.random() * (CANVAS_WIDTH - 4 * PADDING) + 2 * PADDING;
    this.y = Math.random() * (CANVAS_HEIGHT - 4 * PADDING) + 2 * PADDING;
  }

  show() {
    // 테두리 (짙은 갈색)
    stroke(101, 67, 33);
    strokeWeight(4);

    // 안쪽 (나무색)
    fill(160, 82, 45);
    ellipse(this.x, this.y, this.size, this.size);

    // 나이테 (안쪽 원 여러 개)
    noFill();
    stroke(120, 70, 30);
    strokeWeight(1);
    for (let r = this.size * 0.2; r < this.size / 2; r += this.size * 0.1) {
      ellipse(this.x, this.y, r * 2, r * 2);
    }
  }
}
