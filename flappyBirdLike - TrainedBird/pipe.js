function Pipe() {
  this.x = width;
  this.speed = 6;
  this.hole = random(height / 2) + height / 4;
  this.width = 80 + width / 20;
  this.spaceBetweenRect = spaceBetweenRect;

  this.upScore = false;

  this.update = function() {
    this.x -= this.speed;
  }

  this.show = function() {
    imageMode(CORNER);
    //fill(0, 255, 0);
    //fill(255, 200);
    //strokeWeight(3);
    //stroke(0);
    //rect(this.x, -5, this.width, this.hole - this.spaceBetweenRect / 2 + 5);
    image(imgPipeUp, this.x, this.hole - this.spaceBetweenRect / 2 - 800 + 35,
      this.width, 800);

    //rect(this.x, this.hole + this.spaceBetweenRect / 2, this.width, 800);
    image(imgPipeDown, this.x, this.hole + this.spaceBetweenRect / 2 - 35,
      this.width, 800);

  }

  this.hits = function(bird) {
    if ((bird.y - bird.radius * 4 / 5 < this.hole - this.spaceBetweenRect / 2) ||
      (bird.y + bird.radius * 4 / 5 > this.hole + this.spaceBetweenRect / 2)) {
      if ((bird.x + bird.radius * 4 / 5 > this.x) && (bird.x - bird.radius *
          4 / 5 < this.x + this.width)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
