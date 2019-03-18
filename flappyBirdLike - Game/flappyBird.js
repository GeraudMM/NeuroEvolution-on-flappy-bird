var bird;
var pipes = [];
var imgPapi;
var imgPipeDown;
var imgPipeUp;
var begin = false;
var score = 0;


function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(30);
	imgPapi = loadImage("papi.png");
	imgPipeDown = loadImage("PipeDown.png");
	imgPipeUp = loadImage("PipeUp.png");
	bird = new Bird();
}

function mousePressed() {
	//console.log("mousePressed");

	bird.up();
	if (!begin) {
		begin = true;
		score = 0;
	}
}


function draw() {
	//background(150,150,255);
	background(0);
	if (!begin) {

		bird.show();
		textSize(30);
		fill(0, 80);
		noStroke();
		//textMode(CENTER);
		text("Tap the screen or ", 50, 110);
		text("Hit space key to begin", 20, 150);


	} else {
		if (frameCount % 70 == 0) {
			pipes.push(new Pipe());
		}

		for (var i = pipes.length - 1; i >= 0; i--) {
			pipes[i].update();
			pipes[i].show();
			if ((pipes[i].x + pipes[i].width <= bird.x + bird.radius) && (!pipes[i].upScore)) {
				score += 1;
				pipes[i].upScore = true;
			}
			if (pipes[i].hits(bird)) {
				bird.dead = true;
			}
			if (pipes[i].x < -pipes[i].width) {
				pipes.splice(i, 1);
			}
		}

		bird.update();
		bird.show();
		bird.death();

		if (bird.dead) {
			playAgain();
		}
	}
	printScore();
}

function printScore() {
	fill(255);
	noStroke();
	textSize(30);
	text("SCORE : " + score, 10, 30);
}

function playAgain() {
	//delay(1000);
	pipes = [];
	begin = false;
	bird.y = height / 2;
	bird.dead = false;

}

function keyPressed() {
	if (key == ' ') {
		bird.up();
		if (!begin) {
			begin = true;
			score = 0;
		}
	}


}
