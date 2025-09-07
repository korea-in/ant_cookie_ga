total_ant_step = 0;
generation = 1;

$(document).ready(function() {
  $("#submit-btn").on("click", function() {
    console.log($("#ONE_GEN_STEP_COUNT").val());
    console.log($("#ONE_GEN_ANT_COUNT").val());
    console.log($("#TREE_COUNT").val());
    console.log($("#ANT_ROTATE_ANGLE").val());
    console.log($("#ANT_SETP_SIZE").val());
    console.log($("#MUTATION_COEFFICIENT").val());
    console.log($("#DAEDED_COEFFICIENT").val());
    console.log($("#ARRIVED_COEFFICIENT").val());

    ONE_GEN_STEP_COUNT   = $("#ONE_GEN_STEP_COUNT").val();
    ONE_GEN_ANT_COUNT    = $("#ONE_GEN_ANT_COUNT").val();
    TREE_COUNT           = $("#TREE_COUNT").val();
    ANT_ROTATE_ANGLE     = $("#ANT_ROTATE_ANGLE").val();
    ANT_SETP_SIZE        = $("#ANT_SETP_SIZE").val();
    MUTATION_COEFFICIENT = $("#MUTATION_COEFFICIENT").val();
    DAEDED_COEFFICIENT   = $("#DAEDED_COEFFICIENT").val();
    ARRIVED_COEFFICIENT  = $("#ARRIVED_COEFFICIENT").val();
    
    ants = [];
    trees = [];
    total_ant_step = 0;
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
  });
});

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
  generation += 1;
}

function updateScoreBoard() {
  // 현재 세대
  document.getElementById("s-gen").textContent = generation;

  // 죽은 개미 수
  let dead = ants.filter(a => a.ended && !a.arrived).length;
  document.getElementById("s-daed").textContent = dead;

  // 도착한 개미 수
  let succ = ants.filter(a => a.arrived).length;
  document.getElementById("s-succ").textContent = succ;

  // 생존 개미 수 (아직 살아있는 개미)
  let alive = ONE_GEN_ANT_COUNT - dead - succ;
  document.getElementById("s-alive").textContent = alive;
}


// p5js 초기화
function setup() {
  let cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  cnv.parent("sketch-container");
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

  updateScoreBoard();
}
