class Ant {
  // 개미의 각도 유전자
  angle_gen = [];
  // 개미의 최초 시작 지점
  current_x = PADDING;
  current_y = PADDING;
  // 개미의 최초 각도
  current_angle = 0;
  // 개미의 걸음 수
  step = 0;
  // 가장 가까운 움직임
  shortest_dist = 9999;
  
  ended = false;
  deaded = false;
  arrived = false;

  // 생성자 함수, 부모 유전자가 없으면 랜덤 생성
  constructor(gen_a, gen_b) {
    if (gen_a == null && gen_b == null) {
      this.current_angle = random(0, 360);
      for (let i = 0; i < ONE_GEN_STEP_COUNT; i++) {
        let n = Math.random() * (ANT_ROTATE_ANGLE * 2 + 1) - ANT_ROTATE_ANGLE;
        this.angle_gen.push(n);
      }
    } else {
      let cut = Math.floor(Math.random() * ONE_GEN_STEP_COUNT);
      for (let i = 0; i < ONE_GEN_STEP_COUNT; i++) {
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
    let maxDist = dist(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 기본 점수는 가장 가까웠던 순간 기준
    let w = maxDist - this.shortest_dist;

    let survival = this.step / ONE_GEN_STEP_COUNT;

    // 1) 너무 빨리 죽은 개미는 낮게 평가
    if (this.deaded) {
      w = w * survival;
    }

    // 2) 빨리 쿠키에 도착한 개미는 높게 평가
    if (this.arrived) {
      w = w * (1 / survival);
    }

    // 3) 현재 거리가 최단 거리보다 멀어졌다면 페널티 적용
    if (d > this.shortest_dist) {
      let penalty = 1 / (1 + (d - this.shortest_dist)); 
      w = w * penalty;
    }

    return Math.max(1, floor(w));
  }


  // 개미 한 걸음 움직이기 함수
  move() {
    if (this.ended) return;
    if (this.step >= this.angle_gen.length) {
      this.ended = true;
      return;
    }
    this.current_angle += this.angle_gen[this.step];
    let rad = radians(this.current_angle);
    this.current_x += cos(rad) * ANT_SETP_SIZE;
    this.current_y += sin(rad) * ANT_SETP_SIZE;

    // 나무 충돌 확인
    for (let tree of trees) {
      let d = dist(this.current_x, this.current_y, tree.x, tree.y);
      if (d < tree.size / 2) {
        this.ended = true;
        this.deaded = true;
        return;
      }
    }

    // 벽 충돌 확인
    if (
      this.current_x < 0 ||
      this.current_x > CANVAS_WIDTH ||
      this.current_y < 0 ||
      this.current_y > CANVAS_HEIGHT
    ) {
      this.ended = true;
      this.deaded = true;
      return;
    }

    // 쿠키 충돌 확인
    let d = dist(this.current_x, this.current_y, cookie.x, cookie.y);
    if(this.shortest_dist > d) this.shortest_dist = d;
    if (d < cookie.size / 2) {
      this.ended = true;
      this.arrived = true;
      return;
    }


    this.step++;
  }

  // 현재 개미 각도와 위치를 기반하여 그림 그리기 함수
  show() {
    noStroke();
    if (this.deaded) {
      fill(150);  // 죽은 개미 → 회색
    } else if (this.arrived) {
      fill(255, 0, 0);   // 빨간색
    } else {
      fill(0);    // 살아있는 개미 → 검은색
    }

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