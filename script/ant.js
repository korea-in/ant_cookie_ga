class Ant {
  // 개미의 각도 유전자
  angle_gen = [];
  // 개미의 최초 시작 지점
  current_x = 50;
  current_y = 50;
  // 개미의 최초 각도
  current_angle = 0;
  // 개미의 걸음 수
  step = 0;
  
  ended = false;

  // 생성자 함수, 부모 유전자가 없으면 랜덤 생성
  constructor(gen_a, gen_b) {
    if (gen_a == null && gen_b == null) {
      this.current_angle = random(0, 360);
      for (let i = 0; i < ONE_GEN_ANGLE_COUNT; i++) {
        let n = Math.random() * (ANT_ROTATE_ANGLE * 2 + 1) - ANT_ROTATE_ANGLE;
        this.angle_gen.push(n);
      }
    } else {
      let cut = Math.floor(Math.random() * ONE_GEN_ANGLE_COUNT);
      for (let i = 0; i < ONE_GEN_ANGLE_COUNT; i++) {
        if (Math.random() < MUTATION_COEFFICIENT) {
          let n = Math.random() * (ANT_ROTATE_ANGLE * 2 + 1) - ANT_ROTATE_ANGLE;
          this.angle_gen.push(n);
        } else {
          // 정상 교차
          if (i < cut) {
            this.angle_gen.push(gen_a.angle_gen[i]);
          } else {
            this.angle_gen.push(gen_b.angle_gen[i]);
          }
        }
      }
      this.current_angle = this.angle_gen[0];
    }
  }

  // 쿠키와 거리 측정하여 정수형으로 반환
  get_weight(cookie) {
    let d = dist(this.current_x, this.current_y, cookie.x, cookie.y);
    let maxDist = dist(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 대각선 거리 = 최대 거리
    let w = maxDist - d;
    return Math.max(1, floor(w));
  }

  // 개미 한 걸음 움직이기 함수
  move() {
    if (this.step >= this.angle_gen.length) {
      this.ended = true;
      return;
    }
    this.current_angle += this.angle_gen[this.step];
    let rad = radians(this.current_angle);
    this.current_x += cos(rad) * ANT_SETP_SIZE;
    this.current_y += sin(rad) * ANT_SETP_SIZE;
    this.step++;
  }

  // 현재 개미 각도와 위치를 기반하여 그림 그리기 함수
  show() {
    noStroke();
    fill(0);

    let rad = radians(this.current_angle);

    let front_x = this.current_x + cos(rad) * 2;
    let front_y = this.current_y + sin(rad) * 2;
    ellipse(front_x, front_y, 3, 3);

    ellipse(this.current_x, this.current_y, 2, 2);

    let back_x = this.current_x - cos(rad) * 2;
    let back_y = this.current_y - sin(rad) * 2;
    ellipse(back_x, back_y, 3, 3);
  }
}