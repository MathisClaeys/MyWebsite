export class Frog {
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
