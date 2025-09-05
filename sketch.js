total_ant_step = 0;

// 다음 세대로 넘어가는 초기화 및 유전자 배합 함수
function next_generation() {
  console.log("next_generation");
  total_ant_step = 0;
  
  parents_ant_gen = [];
  
  // 현재 세대 개미들을 기반으로 부모 후보 pool 생성
  for (let i = 0; i < ONE_GEN_ANT_COUNT; i++) {
    let w = ants[i].get_weight(cookie);
    if(ants[i].deaded) w = w * DAEDED_COEFFICIENT
    if(ants[i].arrived) w = w * ARRIVED_COEFFICIENT
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
  grassLayer = createGraphics(width, height);
  ants = [];
  trees = [];
  cookie = new Cookie();
  for(var i=0; i<ONE_GEN_ANT_COUNT; i++) {
    tmp_ant = new Ant(null, null);
    ants.push(tmp_ant);
  }
  
  for(var i=0; i<TREE_COUNT; i++) {
    tmp_tree = new Tree();
    trees.push(tmp_tree);
  }
  
  drawGrassBackground(grassLayer);
}

// p5js 반복문 부분
function draw() {
  image(grassLayer, 0, 0);
  for(var i=0; i<TREE_COUNT; i++) {
    trees[i].show();
  }
  for(var i=0; i<ONE_GEN_ANT_COUNT; i++) {
    if(i >= total_ant_step/ANT_START_DELAY) break;
    if(!ants[i].ended) ants[i].move();
    ants[i].show();
  }
  total_ant_step++;// draw() 안에서
  let allEnded = true;
  for (let i = 0; i < ONE_GEN_ANT_COUNT; i++) {
    if (!ants[i].ended) {
      allEnded = false;
      break;
    }
  }

  if (allEnded) {
    next_generation(cookie);
  }
  
  cookie.show();
}
