//var birds = [];
var savedBirds = [];
var pipes = [];
var counter = 0;
var generation = 0;
let bird;


var imgPapi;
var imgPipeDown;
var imgPipeUp;
var score = 0;
var spaceBetweenRect = 200;

let brainJSON;

function preload() {
	brainJSON = {
		"input_nodes": 5,
		"hidden_nodes": 10,
		"output_nodes": 2,
		"weights_ih": {
			"rows": 10,
			"cols": 5,
			"data": [
				[-0.2428922802869109,
					0.11523639889241655,
					0.3510858208857242, -0.831114314859014, -0.7564101680859898
				],
				[-0.7490060320906018,
					0.816066509697206,
					0.09662060535227673,
					0.03837603278452209, -0.7558688647493175
				],
				[-0.5945330455225705,
					0.7958354250482959,
					0.7241381782166547,
					0.39756361758919667,
					0.40508687576180763
				],
				[
					0.12838846494340928,
					0.7869140912327328,
					0.41429588406806683, -0.6026676523603873,
					0.6458087612801483
				],
				[-0.1820634403257183,
					0.39679827602689066,
					0.38055311633411115, -0.720871895212245, -0.014232302519686602
				],
				[-0.2694614703304432,
					0.07767761159972197, -0.4443852740755889, -0.37917718286646496,
					0.9535770393213825
				],
				[
					0.3438562839378272,
					0.9150431593708377,
					0.000028547836735004495, -0.08453915764348752, -0.3876388785100504
				],
				[
					0.635148489965401, -0.09627511337533745,
					0.7176566072027359, -0.016342842624915033,
					0.7904845954044908
				],
				[-0.11627722549142842, -0.56259863501234,
					0.3526439721869865, -0.9886129964642718,
					0.8500376689247253
				],
				[-0.36234864743677786, -0.8581497195665873,
					0.3036754070697181,
					0.32193191197911286,
					0.9515185280504852
				]
			]
		},
		"weights_ho": {
			"rows": 2,
			"cols": 10,
			"data": [
				[
					0.6854324252365994,
					0.7101550693021705,
					0.5518402606780097, -0.818229706354137,
					0.9716175176808819,
					0.9990415616714792,
					0.1403885879289417, -0.5804519347617099,
					0.07566634810696504, -0.8859873911732978
				],
				[
					0.27323170605152036, -0.6612712245352683, -0.9556032431196324,
					0.7654154886594482, -0.8553247201100461, -0.24684782281350115,
					0.18666915600608,
					0.5067287317751483,
					0.7926443403727337,
					0.1119628799873446
				]
			]
		},
		"bias_h": {
			"rows": 10,
			"cols": 1,
			"data": [
				[-0.329294589132674],
				[
					0.3540855953198929
				],
				[-0.40290793101624794],
				[
					0.6416609898077561
				],
				[-0.4399881139049798],
				[-0.25124118901470993],
				[-0.3439571130385654],
				[-0.33159205595298763],
				[
					0.6466051863891762
				],
				[
					0.10346479149875004
				]
			]
		},
		"bias_o": {
			"rows": 2,
			"cols": 1,
			"data": [
				[-0.08447637194294393],
				[-0.2974678595506943]
			]
		},
		"learning_rate": 0.1,
		"activation_function": {}
	};
}

function setup() {
	createCanvas(1200, 800);
	let birdBrain = NeuralNetwork.deserialize(brainJSON);
	bird = new Bird(birdBrain);
	imgPapi = loadImage("papi.png");
	imgPipeDown = loadImage("PipeDown.png");
	imgPipeUp = loadImage("PipeUp.png");
}

function draw() {
	background(150, 150, 255);
	frameRate(30);
	for (let n = 0; n < 2; n++) {

		if (counter % 100 == 0) {
			pipes.push(new Pipe());
		}
		counter++;

		for (var i = pipes.length - 1; i >= 0; i--) {
			pipes[i].update();
			if ((pipes[i].x + pipes[i].width <= bird.x + bird.radius) && (!pipes[
					i].upScore)) {
				score++;
				pipes[i].upScore = true;
				if (pipes[i].hits(bird)) {
					score = 0;
				}
			}
			if (pipes[i].x < -pipes[i].width) {
				pipes.splice(i, 1);
			}
		}
		bird.think(pipes);
		bird.update();
	}

	printScore();
	for (var i = pipes.length - 1; i >= 0; i--) {
		pipes[i].show();
	}
	bird.show();
}

function printScore() {
	fill(255);
	noStroke();
	textSize(30);

	text("score : " + score, 10, 30);
}

function mousePressed() {
	bird.up();
}

function keyPressed() {
	if (key == ' ') {
		bird.up();
	}
}