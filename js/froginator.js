let frogArray = [];
let score = 0;
let activeFrogs = 0;
let lives = 3;
let fire;
let weatherData;
let colorSun;
let jungle;
let cursorTarget;
let hart;
let myFont;
let myFly;
let xoff = 0;
let yoff = 2;
let bonusTime = false;
let bonusTimer = 0;
const bonusDuration = 10; // Bonus time duration in seconds
let angle = 0;



function preload() {
  jungle = loadImage("js/assets/jungle.png");
  hart = loadImage("js/assets/hart2.png")
}

function setup() {
  createCanvas(1000, 600);
  myFly = new Fly(100, 100)
  cursor(CROSS, 0, 0)
  myFont = loadFont("js/assets/gameFont.ttf")
  
  fire = document.getElementById("fire-audio");
  loadJSON(
    "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=80bb45745fad93410447e2ac0b16c781",
    gotWeatherData
  );

  // Draw the jungle image as the background
  // image(jungle, 0, 0, width, height);
}

function gotWeatherData(data) {
  weatherData = data;
}

function setColorSun() {
  if (weatherData) {
    colorSun = weatherData.main.temp - 68;
  } else {
    colorSun = 245;
  }
}
function drawHarts() {
  if (lives == 3){
    image(hart, width - 100, 50)
  }
  if(lives >= 2) {
    image(hart, width -150, 50)
  }
  if(lives >= 1) {
    image(hart, width -200, 50)
  }
}

function draw() {
  image(jungle, 0, 0, width, height);
  drawHarts()
  drawText();
  myFly.display()
  myFly.move()
  

  for (let i = frogArray.length - 1; i >= 0; i--) {
    frogArray[i].display();
    frogArray[i].move();
    frogArray[i].frogSurviveTest();

    if (frogArray[i].isHit || frogArray[i].posx > width) {
      frogArray.splice(i, 1);
      activeFrogs--;
    }
  }

  // Regenerate frogs if active frogs < 5
  if (activeFrogs < 3) {
    for (let i = 0; i < 5 - activeFrogs; i++) {
      frogArray.push(new Frog(random(-1000, -10), random(100, height - 100), random(1, 7)));
      activeFrogs++;
    }
  }
}

function drawText() {
  textSize(50);
  textFont(myFont);
  fill(0);
  
  text("score: " + score, 30, 83);
}

function mouseClicked() {
  fire.play();

  for (let i = 0; i < frogArray.length; i++) {
    frogArray[i].hitTest(mouseX, mouseY);
  }
  if (myFly.hitTest(mouseX, mouseY)) {
    activateBonusTime();
    myFly = null;
  }
}
class Fly {
  constructor(flyx=0, flyy=0) {
    this.flyx = flyx;
    this.flyy = flyy;
    this.flyHit = false;
    this.flyActive = true
  }
  display() {
    push();
    translate(this.flyx, this.flyy);

    if(this.flyHit) {
      fill(0)
    }
    else {
      fill(100);
circle(10, 16, 12.5);
ellipse(10, 7.5, 10, 7.5);
fill(255);
circle(7.5, 4, 4);
circle(12.5, 4, 4)
smooth()
strokeWeight(0.4)
strokeCap(ROUND)
strokeJoin(ROUND)
beginShape();
curveVertex(8, 9);
curveVertex(8, 9);
curveVertex(1, 17.5);
curveVertex(1, 25);
curveVertex(3, 29);
curveVertex(8, 20);
curveVertex(10, 10);
curveVertex(8, 9);
curveVertex(8, 9);
endShape();

beginShape();
curveVertex(20 - 8, 9);
curveVertex(20 - 8, 9);
curveVertex(20 - 1, 17.5);
curveVertex(20 - 1, 25);
curveVertex(20 - 3, 29);
curveVertex(20 - 8, 20);
curveVertex(20 - 10, 10);
curveVertex(20 - 8, 9);
curveVertex(20 - 8, 9);
endShape();

noFill();
beginShape();
vertex(7, 3.5);
vertex(7, 4.5);
vertex(8, 4.5);
vertex(8, 3.5);
endShape();

beginShape();
vertex(13, 3.5);
vertex(13, 4.5);
vertex(12, 4.5);
vertex(12, 3.5);
endShape();
}
    
    pop();
  }
  move() {
    this.flyx = noise(xoff)*width;
    this.flyy = noise(yoff)*height;
    // With each cycle, increment xoff
    xoff += 0.015;
    yoff += 0.015;
  }
  hitTest(x, y) {
    const f = dist(x, y, this.flyx, this.flyy);
    if (f <= 20 && this.flyActive) {
      this.flyHit = true;
      score += 1000;
      this.flyActive = false
      this.flyx += 10000
    }
}
}
class Frog {
  constructor(posx = 100, posy = 100, speed = 1, color = 153) {
    this.posx = posx;
    this.posy = posy;
    this.speed = speed;
    this.color = color;
    this.isHit = false;
    this.angle = this.angle
  }

  display() {
    push();
    translate(this.posx, this.posy);
    

    if (this.isHit) {
      fill(0);
    } else {
      noStroke();
      fill(0, 123, 0);
      beginShape();
      vertex(0, 80);
      vertex(20, 60);
      vertex(20, 50);
      vertex(30, 35);
      vertex(60, 35);
      vertex(55, 20);
      vertex(55, 80);
      vertex(0, 80);
      endShape(CLOSE);
      
      fill(70);
      quad(20, 35, 30, 20, 80, 20, 70, 35);
      quad(0, 80, 15, 60, 40, 60, 30, 80);
      quad(50, 60, 60, 60, 65, 80, 55, 80);
      
      fill(255);
      circle(60, 10, 20);
      
      fill(0);
      quad(50, 10, 60, 6, 70, 10, 60, 14);
      
      fill(200, 200, 0);
      quad(25, 32, 26, 28, 33, 28, 31, 32);
      
      strokeWeight(3);
      fill(0);
      line(70, 30, 50, 30);
    }
    

    pop();
  }

  move() {
      this.posx += this.speed;
      this.posy = height - 200 -abs(sin(this.posx * 0.01)) * 60;
    }
  
  

  hitTest(x, y) {
    const d = dist(x-20, y, this.posx, this.posy);
    if (d <= 80) {
      this.isHit = true;
      score += 100;
      if (bonusTime) {
        score += 100
      }
    }
  }

  frogSurviveTest() {
    if (this.posx > width) {
      lives -= 1;
      if (lives <= 0) {
        gameOver();
      }
    }
  }
}

function gameOver() {
  noLoop();
  textSize(60);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
  text(score, width / 2, height / 2 + 80);
}

function activateBonusTime() {
  if (!bonusTime) {
    bonusTime = true;
    bonusTimer = bonusDuration * 60;
  }
}

