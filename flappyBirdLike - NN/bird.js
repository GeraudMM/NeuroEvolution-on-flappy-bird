function Bird(brain) {
  this.x = width / 5;
  this.y = height / 2;
  this.radius = 30;

  this.gravity = 0.8;
  this.velocity = 0;
  this.lift = -18;

  this.score = 0;
  this.fitness = 0;

  this.dead = false;
  this.lastJump = 0;

  if (brain) {
    this.brain = brain.copy();
  } else {
    this.brain = new NeuralNetwork(5, 10, 2);
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    //this.velocity *= 0.97;
    this.score++;

  }

  this.show = function() {
    stroke(0);
    strokeWeight(2);
    fill(255, 100);
    //fill(255, 0, 255);
    //imageMode(CENTER);
    ellipse(this.x, this.y, 2 * this.radius, 2 * this.radius);
    //image(imgPapi, this.x, this.y, 2 * this.radius, 2 * this.radius);
  }

  this.up = function() {
    //if (millis() - this.lastJump > 100 / slider.value()) {
    this.velocity += this.lift;
    //this.lastJump = millis();
    //}
  }

  this.death = function() {
    if (this.y > height) {
      this.dead = true;
      //console.log("1");
    }
  }

  this.mutate = function(rate) {
    this.brain.mutate(rate);
  }

  this.think = function(pipes) {

      let closest = null;
      let closestD = Infinity;
      for (let i = 0; i < pipes.length; i++) {
        let d = (pipes[i].x + pipes[i].width) - this.x;
        if (d < closestD && d > 0) {
          closest = pipes[i];
          closestD = d;
        }
      }

      let inputs = [];
      inputs[0] = this.y / height;
      inputs[1] = (closest.hole - closest.spaceBetweenRect) / height;
      inputs[2] = (closest.hole + closest.spaceBetweenRect) / height;
      inputs[3] = (closest.x + closest.width) / width;
      inputs[4] = this.velocity / 20;

      let outputs = this.brain.predict(inputs);
      // console.log(output);
      if (outputs[1] > outputs[0] && this.velocity >= 0) {
        this.up();
      }

    }
    // this.clicked = function() {
    //   this.up();
    // }

}
