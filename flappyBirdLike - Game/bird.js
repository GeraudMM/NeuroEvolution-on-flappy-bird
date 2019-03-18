function Bird() {
  this.x = width / 5;
  this.y = height / 2;
  this.radius = 30;

  this.gravity = 0.8;
  this.velocity = 0;
  this.lift = -18;

  this.dead = false;
  this.lastJump = 0;

  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.velocity *= 0.97;


  }

  this.show = function() {
    stroke(0);
    strokeWeight(2);
    //fill(255, 0, 255);
    //imageMode(CENTER);
    ellipse(this.x, this.y, 2 * this.radius, 2 * this.radius);
    //image(imgPapi, this.x, this.y, 2 * this.radius, 2 * this.radius);
  }

  this.up = function() {
    if (millis() - this.lastJump > 100) {
      this.velocity += this.lift;
      this.lastJump = millis();
    }
  }

  this.death = function() {
    if (this.y > height) {
      this.dead = true;
    }
  }

  this.clicked = function() {
    this.up();
  }

}
