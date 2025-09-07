let ONE_GEN_STEP_COUNT = 500; // 한 세대당 유전자에 걸음 수
let ONE_GEN_ANT_COUNT = 50; // 한 세대당 개미 마리 수

let TREE_SIZE = 40; // 장애물 평균 사이즈
let TREE_COUNT = 5; // 장애물 개수

let CANVAS_WIDTH = 400; // 캔버스의 가로 길이
let CANVAS_HEIGHT = 500; // 캔버스의 세로 길이
let PADDING = 50; // 쿠키, 개미가 생성되지 않는 폭의 너비

let ANT_ROTATE_ANGLE = 10; // 1 걸음당 회전 가능한 각도
let ANT_SETP_SIZE = 1.2; // 1 걸음당 거리
let ANT_START_DELAY = 6; // 개미 한 마리 출발 후 얼만큼 뒤에 다음 개미가 출발할 것인지 딜레이 계수

let MUTATION_COEFFICIENT = 0.005; // 돌연변이 유전자 생성 확률
let DAEDED_COEFFICIENT = 0.6; // 벽에 부딪힌 죽은 개미들을 얼만큼 배재할건가(0.0이면 모두 배재)
let ARRIVED_COEFFICIENT = 3.0; // 쿠키에 도달한 개미 가산 계수