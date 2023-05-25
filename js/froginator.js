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


function preload() {
  jungle = loadImage("js/assets/jungle.png");
  hart = loadImage("js/assets/hart2.png")
}

function setup() {
  createCanvas(1000, 600);
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
      frogArray.push(new Frog(random(-1000, -10), random(height), random(1, 4)));
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
  }

  hitTest(x, y) {
    const d = dist(x-20, y, this.posx, this.posy);
    if (d <= 80) {
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
