let ONE_GEN_ANGLE_COUNT = 100;
let ONE_GEN_ANT_COUNT = 100;
let CANVAS_WIDTH = 300;
let CANVAS_HEIGHT = 300;
let ANT_START_DELAY = 4;
total_ant_step = 0;
class Ant {
  // 개미의 각도 유전자
  angle_gen = [];
  // 개미의 최초 시작 지점
  current_x = CANVAS_WIDTH / 2;
  current_y = CANVAS_HEIGHT / 2;
  // 개미의 최초 각도
  current_angle = random(0, 360);
  // 개미의 걸음 수
  step = 0;

  // 생성자 함수, 부모 유전자가 없으면 랜덤 생성
  constructor(gen_a, gen_b) {
    if (gen_a == null && gen_b == null) {
      for (let i = 0; i < ONE_GEN_ANGLE_COUNT; i++) {
        let n = Math.random() * 41 - 20;
        this.angle_gen.push(n);
      }
    }
  }

  // 개미 한 걸음 움직이기 함수
  move() {
    if (this.step >= this.angle_gen.length) return;
    this.current_angle += this.angle_gen[this.step];
    let rad = radians(this.current_angle);
    this.current_x += cos(rad) * 1;
    this.current_y += sin(rad) * 1;
    this.step++;
  }

  // 현재 개미 각도와 위치를 기반하여 그림 그리기 함수
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

// 다음 세대로 넘어가는 초기화 및 유전자 배합 함수
function next_generation() {
  console.log(next_generation);
  total_ant_step = 0;
  ants = [];

  for(var i=0; i<ONE_GEN_ANT_COUNT; i++) {
    tmp_ant = new Ant(null, null);
    ants.push(tmp_ant);
  }
}

// p5js 초기화
function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  ants = [];

  for(var i=0; i<ONE_GEN_ANT_COUNT; i++) {
    tmp_ant = new Ant(null, null);
    ants.push(tmp_ant);
  }

  console.log(ants[0].current_angle);
    
  background(220);
}

// p5js 반복문 부분
function draw() {
  background(220);
  for(var i=0; i<ONE_GEN_ANT_COUNT; i++) {
    if(i >= total_ant_step/ANT_START_DELAY) break;
    ants[i].move();
    ants[i].show();
  }
  total_ant_step++;
  if(ants[ONE_GEN_ANT_COUNT-1].step == ONE_GEN_ANGLE_COUNT) {
    next_generation();
  }
}
