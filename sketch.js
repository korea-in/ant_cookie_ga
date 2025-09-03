total_ant_step = 0;

// 다음 세대로 넘어가는 초기화 및 유전자 배합 함수
function next_generation() {
  console.log("next_generation");
  total_ant_step = 0;
  
  parents_ant_gen = [];
  
  // 현재 세대 개미들을 기반으로 부모 후보 pool 생성
  for (let i = 0; i < ONE_GEN_ANT_COUNT; i++) {
    let w = ants[i].get_weight(cookie);
    for (let j = 0; j < w; j++) {
      parents_ant_gen.push(ants[i]);
    }
  }

  // 새 세대 채우기
  ants = [];
  for (let i = 0; i < ONE_GEN_ANT_COUNT; i++) {
  let gen_a = parents_ant_gen[Math.floor(Math.random() * parents_ant_gen.length)];
  let gen_b = parents_ant_gen[Math.floor(Math.random() * parents_ant_gen.length)];
    let tmp_ant = new Ant(gen_a, gen_b);
    ants.push(tmp_ant);
  }
}

// p5js 초기화
function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  ants = [];
  cookie = new Cookie();

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
  if(ants[ONE_GEN_ANT_COUNT-1].ended) {
    next_generation(cookie);
  }
  cookie.show();
}
