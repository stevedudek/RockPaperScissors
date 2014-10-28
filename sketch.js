var stage = "start";
var win_lose_draw = "";
var player_choice = "question";
var computer = "question";
var player_score = 0;
var computer_score = 0;
var compTimer = false;

function setup() {
  // put setup code here
  var result = createCanvas(900,140);
  result.parent('result');
}

function draw() {
  // put drawing code here
  drawScreen();
}

function computer_pick() {
	
	var number = Math.floor(Math.random()*3);	// 0,1, or 2
	switch (number) {
		case 0:
			computer = "rock";
			break;
		case 1:
			computer = "paper";
			break;
		case 2:
			computer = "scissors";
			break;
		default:
			break;
	}
	var compImg = document.getElementById("compPic");
	compImg.src = computer + ".jpg"; 	// string concatenation
}

function assess(player, computer) {
	// Update the images for player and computer
	var playerFinalImg = document.getElementById("playerChoice");
	playerFinalImg.src = player + ".jpg";

	var compFinalImg = document.getElementById("compChoice");
	compFinalImg.src = computer + ".jpg";

	if (player == "nuke") {
		win_lose_draw = "win";
		return;
	}

	if (player == computer) {
		win_lose_draw = "draw";
		return;
	}

	switch (player) {
		case "rock":
			if (computer == "paper") {
				win_lose_draw = "lose";
				return;
			} else {
				win_lose_draw = "win";
				return;
			}
			break;
		case "paper":
			if (computer == "scissors") {
				win_lose_draw = "lose";
				return;
			} else {
				win_lose_draw = "win";
				return;
			}
			break;
		case "scissors":
			if (computer == "paper") {
				win_lose_draw = "win";
				return;
			} else {
				win_lose_draw = "lose";
				return;
			}
			break;
		default:
			win_lose_draw = "draw";
			break;
	}
}

$(document).ready(function(){
  $("#rock_but").click(function(){
  	player_choice = "rock";
	stage = "game";
  });
  $("#paper_but").click(function(){
  	player_choice = "paper";
	stage = "game";
  });
  $("#scissors_but").click(function(){
  	player_choice = "scissors";
	stage = "game";
  });
  $("#compPic").click(function(){
  	player_choice = "nuke";
	stage = "game";
  });
});

function updateScore(result) {
	if (result == "win") {
		player_score++;
	}
	if (result == "lose") {
		computer_score++;
	}
}

function drawScreen() {	
	fill(0);
 	textFont('Helvetica');

	switch (stage)  {
		case "start":
			
			if (!compTimer) {
				var Timer = 2000;
				if (player_score > computer_score) {
					Timer = Timer - (150 *(player_score - computer_score));
					if (Timer < 50) {
						Timer = 0;
					}
				}
				compTimer = setInterval(function(){computer_pick()}, Timer);
			}
			break;
		case "game":
			clearInterval(compTimer);
			// computer_pick();
			assess(player_choice, computer);
			stage = "finale";
		case "finale":
			background(255);
			textSize(64);
			textAlign(CENTER);
			text(win_lose_draw, 420, 60);
			updateScore(win_lose_draw);
			textSize(32);
			textAlign(CENTER);
			text("You:" + player_score + "  Computer:" + computer_score, 340, 120);
			computer_pick();
			compTimer = false;
			stage = "start";
			break;
		default:
			text("Something wrong happened");
			break;
	}			
}
