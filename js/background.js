export function drawBackground() {
    background(weatherData.main.temp * 10);
  
    // Brown counter
    fill(164, 116, 73);
    noStroke();
    rect(0, 2 / 3 * height, width, 1 / 3 * height);
  
    // Red curtain
    fill(255, 0, 0);
    stroke(0, 0, 0);
    beginShape();
    curveVertex(0, 0);
    curveVertex(1 / 4 * width, 0);
    curveVertex(0, 3 / 4 * height);
    curveVertex(0, 0);
    endShape(CLOSE);
  
    beginShape();
    curveVertex(width, 0);
    curveVertex(3 / 4 * width, 0);
    curveVertex(width, 3 / 4 * height);
    curveVertex(width, 0);
    endShape(CLOSE);
  }
  