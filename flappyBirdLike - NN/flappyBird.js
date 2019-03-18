const TOTAL = 1000;
var birds = [];
var savedBirds = [];
var pipes = [];
let slider;
var counter = 0;
var generation = 0;


var imgPapi;
var imgPipeDown;
var imgPipeUp;
var begin = false;
var score = 0;
var highScore = 0;
var spaceBetweenRect = 200;


function setup() {
	createCanvas(1200, 800);
	//frameRate(30);
	slider = createSlider(1, 100, 1);
	for (let i = 0; i < TOTAL; i++) {
		birds[i] = new Bird();
	}
	// imgPapi = loadImage("papi.png");
	// imgPipeDown = loadImage("PipeDown.png");
	// imgPipeUp = loadImage("PipeUp.png");

}

// function mousePressed() {
// 	//console.log("mousePressed");
//
// 	bird.up();
// 	if (!begin) {
// 		begin = true;
// 		score = 0;
// 	}
// }

function keyPressed() {
	if (key === 'S') {
		let bird = birds[0];
		//let json = bird.brain.serialize();
		saveJSON(bird.brain, 'bird.json');
		//console.log(json);
	}
}

function draw() {
	//background(150,150,255);
	frameRate(30);
	for (let n = 0; n < slider.value(); n++) {

		if (counter % 100 == 0) {
			pipes.push(new Pipe());
		}
		counter++;

		for (var i = pipes.length - 1; i >= 0; i--) {
			pipes[i].update();
			// if ((pipes[i].x + pipes[i].width <= birds[0].x + birds[0].radius) && (!pipes[
			// 		i].upScore)) {
			// 	score += 1;
			// 	pipes[i].upScore = true;
			// }
			for (let j = birds.length - 1; j >= 0; j--) {
				if (pipes[i].hits(birds[j])) {
					savedBirds.push(birds.splice(j, 1)[0]);
				}
			}
			if (pipes[i].x < -pipes[i].width) {
				pipes.splice(i, 1);
				score++;
			}
		}
		for (let j = birds.length - 1; j >= 0; j--) {
			birds[j].think(pipes);
			birds[j].update();
			birds[j].death();
			if (birds[j].dead) {
				savedBirds.push(birds.splice(j, 1)[0]);
			}
		}

		if (birds.length === 0) {
			counter = 0;
			nextGeneration();
			generation++;
			if (score > highScore) {
				highScore = score;
			}
			score = 0;
			pipes = [];
		}
		//
		// if (bird.dead) {
		// 	playAgain();
		// }
		// }
	}
	background(0);
	printScore();
	for (var i = pipes.length - 1; i >= 0; i--) {
		pipes[i].show();
	}
	for (let bird of birds) {
		bird.show();
	}

}

function printScore() {
	fill(255);
	noStroke();
	textSize(30);
	text("generation : " + generation, 10, 780);
	text("highscore : " + highScore, 10, 30);
	text("       score : " + score, 10, 60);
}

// function playAgain() {
// 	//delay(1000);
// 	pipes = [];
// 	begin = false;
// 	bird.y = height / 2;
// 	bird.dead = false;
//
// }

// function keyPressed() {
// 	if (key == ' ') {
// 		bird.up();
// 		if (!begin) {
// 			begin = true;
// 			score = 0;
// 		}
// 	}
// }
