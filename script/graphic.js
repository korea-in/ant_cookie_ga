function drawGrassBackground() {
  let noiseScale = 0.05; // noise 샘플링 간격 (값이 작을수록 부드럽게)
  
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let n = noise(x * noiseScale, y * noiseScale);

      // noise 값(0~1)에 따라 색상 보간
      let r = lerp(100, 50, n);   // 빨강 성분: 연한 녹색(100) → 짙은 녹색(50)
      let g = lerp(200, 120, n);  // 초록 성분: 밝은 녹색(200) → 짙은 초록(120)
      let b = lerp(100, 50, n);   // 파랑 성분: 연한 톤 유지

      let idx = 4 * (y * width + x);
      pixels[idx] = r;
      pixels[idx + 1] = g;
      pixels[idx + 2] = b;
      pixels[idx + 3] = 255;
    }
  }
  updatePixels();
}