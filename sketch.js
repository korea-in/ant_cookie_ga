let ONE_GEN_ANGLE_COUNT = 100;
let CANVAS_WIDTH = 300;
let CANVAS_HEIGHT = 300;

class Ant {
  angle_gen = [];
  current_x = CANVAS_WIDTH / 2;
  current_y = CANVAS_HEIGHT / 2;
  current_angle = 0;
  step = 0;

  constructor(gen_a, gen_b) {
    if (gen_a == null && gen_b == null) {
      for (let i = 0; i < ONE_GEN_ANGLE_COUNT; i++) {
        let n = Math.random() * 41 - 20;
        this.angle_gen.push(n);
      }
    }
  }

  move() {
    if (this.step >= this.angle_gen.length) return;
    this.current_angle += this.angle_gen[this.step];
    let rad = radians(this.current_angle);
    this.current_x += cos(rad) * 1;
    this.current_y += sin(rad) * 1;
    this.step++;
  }

  show() {
    noStroke();
    fill(0);

    let rad = radians(this.current_angle);

    let front_x = this.current_x + cos(rad) * 5;
    let front_y = this.current_y + sin(rad) * 5;
    ellipse(front_x, front_y, 6, 6);

    ellipse(this.current_x, this.current_y, 4, 4);

    let back_x = this.current_x - cos(rad) * 5;
    let back_y = this.current_y - sin(rad) * 5;
    ellipse(back_x, back_y, 6, 6);
  }
}

let a;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  a = new Ant(null, null);
  background(220);
}

function draw() {
  background(220);
  a.move();
  a.show();
}
