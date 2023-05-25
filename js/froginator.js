let frogArray = [];
let score = 0;
let activeFrogs = 0;
let lives = 3;
let fire;
let weatherData;
let colorSun;

function setup() {
  createCanvas(1000, 600);
  fire = document.getElementById("fire-audio");
  loadJSON(
    "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=80bb45745fad93410447e2ac0b16c781",
    gotWeatherData
  );
}

function gotWeatherData(data) {
  weatherData = data;
  }

function setColorSun() {
  if (weatherData) {
    colorSun = weatherData.main.temp - 68;
    } 
  else {
    colorSun = 245
    }
}

function draw() {
  drawBackground();
  drawText()
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
  if (activeFrogs < 5) {
    for (let i = 0; i < 5 - activeFrogs; i++) {
      frogArray.push(
        new Frog(random(-1000, -10), random(height), random(1, 4))
      );
      activeFrogs++;
    }
  }
}

function drawText() {
  fill(0);
  textSize(30);
  text("score: " + score, 24, 60);
  text("lives: " + lives, 24, 180);
  text("active frogs: " + activeFrogs, 24, 120);
}



function mouseClicked() {
  fire.play();

  for (let i = 0; i < frogArray.length; i++) {
    frogArray[i].hitTest(mouseX, mouseY);
  }
}

function drawBackground() {
  // background(map(weer.main.temp, -10, 40, 0, 255)); // Mapping temperature to background color
  background(20, 132, 202);
  
  // Brown counter
  fill(164, 116, 73);
  noStroke();
  rect(0, (2 / 3) * height, width, (1 / 3) * height);
  
  setColorSun(); // Call the setColorSun() function
  
  fill(colorSun, 150, 41);
  circle((3 / 4) * width, 100, 200);
  
  stroke(0, 0, 0);
}


class Frog {
  constructor(posx = 100, posy = 100, speed = 1, color = 153) {
    this.posx = posx;
    this.posy = posy;
    this.speed = speed;
    this.color = color;
    this.isHit = false;
  }

  display() {
    push();
    translate(this.posx, this.posy);

    if (this.isHit) {
      fill(0);
    } else {
      fill(0, this.color, 0);
      strokeWeight(1);
      circle(0, 0, 50);
      ellipse(0, -35, 60, 35);
      fill(250);
      circle(-15, -50, 15);
      circle(15, -50, 15);
      fill(0);
      circle(-12, -46, 6);
      circle(12, -46, 6);
    }

    pop();
  }

  move() {
    this.posx += this.speed;
  }

  hitTest(x, y) {
    const d = dist(x, y, this.posx, this.posy);
    if (d <= 50) {
      this.isHit = true;
      score += 100;
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
