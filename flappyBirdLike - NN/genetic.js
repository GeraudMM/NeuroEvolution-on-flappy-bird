function nextGeneration() {
  console.log("new Generation");
  bestBird = savedBirds[0];
  calculateFitness();
  birds[0] = bestBird;
  for (let i = 1; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  savedBirds = [];
}

function pickOne() {

  var index = 0;
  var r = random(1);

  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate(0.01);
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bird of savedBirds) {
    sum += pow(bird.score, 3);
    if (bird.score > bestBird.score) {
      bestBird = bird;
    }
  }
  for (let bird of savedBirds) {
    bird.fitness = pow(bird.score, 3) / sum;
  }
}
