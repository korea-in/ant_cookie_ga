# ant_cookie_ga

유전 알고리즘(Genetic Algorithm)을 활용해 **개미가 장애물을 피해 과자를 찾아가는 시뮬레이션** 프로젝트입니다.  
p5.js 기반으로 구현되며, 개미는 세대를 거듭할수록 점점 더 효율적으로 목표(과자)에 도달하도록 진화합니다.

---

## 프로젝트 개요
- **환경**: 2D 캔버스 위에 개미집(시작점), 과자(목표), 랜덤 장애물을 배치  
- **개미(Agent)**: 
  - 유전자로 표현된 각도 배열(angle sequence)을 기반으로 움직임  
  - 각 스텝마다 일정 거리 전진하면서 각도만큼 회전  
- **유전자(DNA)**: 
  - 고정 길이(예: 100 스텝)의 각도 배열  
  - crossover와 mutation을 통해 다음 세대로 전달  
- **적합도(Fitness)**: 
  - 과자와의 거리 (가까울수록 유리)  
  - 이동 거리가 짧을수록 가산점  
  - 과자에 도달하면 큰 보너스  

---

## 사용 알고리즘
- **Genetic Algorithm (GA)**  
  1. 초기 개체군(랜덤 DNA) 생성  
  2. 개미 이동 및 Fitness 평가  
  3. 상위 개체를 선택(selection)  
  4. 교차(crossover)와 돌연변이(mutation)로 새로운 세대 생성  
  5. 목표에 도달할 때까지 반복  

---

## 실행 방법
1. 레포지토리를 클론
   ```bash
   git clone https://github.com/korea-in/ant_cookie_ga.git
