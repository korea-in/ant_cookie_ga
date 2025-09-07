class Cookie {
  x = 0;
  y = 0;
  size = 30;
  chips = []; // 초콜릿칩 배열

  constructor() {
    this.x = Math.random() * (CANVAS_WIDTH - (PADDING * 2)) + PADDING;
    this.y = Math.random() * (CANVAS_HEIGHT - (PADDING * 2)) + PADDING;

    // 초콜릿칩 고정 생성
    let chipCount = 10;
    for (let i = 0; i < chipCount; i++) {
      let angle = (TWO_PI / chipCount) * i;  
      let r = random(this.size * 0.15, this.size * 0.4); // 중심에서 떨어진 거리
      let cx = this.x + cos(angle) * r;
      let cy = this.y + sin(angle) * r;
      let chipSize = this.size * 0.1;

      this.chips.push({ x: cx, y: cy, s: chipSize });
    }
  }

  show() {
    noStroke();

    // 1. 쿠키 반죽
    fill(222, 184, 135); // BurlyWood
    ellipse(this.x, this.y, this.size, this.size);

    // 2. 초콜릿칩 (생성 시 저장된 위치 고정)
    fill(80, 40, 20);
    rectMode(CENTER);
    for (let chip of this.chips) {
      rect(chip.x, chip.y, chip.s, chip.s);
    }
  }
}
