function setup() {
    createCanvas(700, 400);
    
  }
  
  function draw() {
    background(220);
    
    //brown counter
    fill(164,116,73)
    stroke
    rect(0, 0.66*height, width, 0.33*height);
    
    fill(255, 0, 0)
    let posX = 0
    let diaCirc = 40
    for (let i = 0; i < 20 ;i++) {
      arc(posX, 0, diaCirc, diaCirc, 0, PI)
      posX += diaCirc
    
    //red curtain
    //right curtain
    fill(255, 0, 0);
    stroke(0, 0, 0)
    beginShape();
    curveVertex(0, 0);
    curveVertex(0.25*width, 0);
    curveVertex(0, 0.75 * height);
    curveVertex(0, 0);
    endShape(CLOSE);
    //left curtain
    beginShape();
    curveVertex(width, 0)
    curveVertex(0.75 *width, 0);
    curveVertex(width,0.75 * height);
    curveVertex(width, 0)
    endShape(CLOSE);
  }
  }
  
  