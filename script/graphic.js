function drawGrassBackground(pg) {
  let noiseScale = 0.01;
  
  pg.loadPixels();
  for (let y = 0; y < pg.height; y++) {
    for (let x = 0; x < pg.width; x++) {
      let n = noise(x * noiseScale, y * noiseScale);

      let r = lerp(240, 200, n);
      let g = lerp(255, 210, n);
      let b = lerp(200, 170, n);

      let idx = 4 * (y * pg.width + x);
      pg.pixels[idx] = r;
      pg.pixels[idx + 1] = g;
      pg.pixels[idx + 2] = b;
      pg.pixels[idx + 3] = 255;
    }
  }
  pg.updatePixels();
}