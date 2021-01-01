var ctx = null;
var database = (sessionStorage.getItem('database'))?JSON.parse(sessionStorage.getItem('database')):[[0,0,0],[0,0,0],[0,0,0]];
var copy_database = (sessionStorage.getItem('copy_database'))?JSON.parse(sessionStorage.getItem('copy_database')):[[0,0,0],[0,0,0],[0,0,0]];
var cross = (sessionStorage.getItem('cross'))?JSON.parse(sessionStorage.getItem('cross')):true;
var winner = (sessionStorage.getItem('winner'))?JSON.parse(sessionStorage.getItem('winner')):0;

function checkWin() {
	for (let i=0; i<3; i++) {
		if (database[i][2]===database[i][1] && database[i][0]===database[i][1] && database[i][0]!==0) winner=(database[i][0]=="X")?1:2;
		if (database[2][i]===database[1][i] && database[0][i]===database[1][i] && database[0][i]!==0) winner=(database[0][i]=="X")?1:2;
	}
	if (database[2][2]===database[1][1] && database[2][2]===database[0][0] && database[0][0]!==0) winner=(database[0][0]=="X")?1:2;
	if (database[0][2]===database[1][1] && database[0][2]===database[2][0] && database[0][2]!==0) winner=(database[0][2]=="X")?1:2;
	if (winner!=0) {
		document.getElementById("score"+winner).innerHTML = Number(document.getElementById("score"+winner).innerHTML)+1;
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
}

function draw_tictac(){
	for (let i=0; i<3; i++)
		for (let j=0; j<3; j++)
			if (database[i][j]!==copy_database[i][j])
				switch(database[i][j]) {
					case "X":
						ctx.fillText("X", i*700+50, j*700+630);
						break;
					case "0":
						ctx.fillText("0", i*700+100, j*700+650);
						break;
				}

	if (cross) document.getElementById("step").innerHTML="Крестики";
	else document.getElementById("step").innerHTML="Нолики";

	checkWin();

	sessionStorage.setItem('database', JSON.stringify(database));
	sessionStorage.setItem('copy_database', JSON.stringify(copy_database));
	sessionStorage.setItem('cross', JSON.stringify(cross));
	sessionStorage.setItem('winner', JSON.stringify(winner));
}

function draw_empty() {
	var canvas = document.getElementById("tictactoe");

	if (canvas.getContext) {
		ctx = canvas.getContext("2d");

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
		ctx.font = "600pt Comic Sans MS";

		var px = Math.floor(canvas.width/150);
		ctx.lineWidth = Math.floor(canvas.width/150);

		for (let i=0; i<9; i++) {
			ctx.strokeRect(50*px*(i%3), 50*px*(Math.floor(i/3)%3), 50*px, 50*px);
			ctx.clearRect(50*px*(i%3)+0.5*px*(!((i+1)%3%2)), 50*px*(Math.floor(i/3)%3)+0.5*px*(!((Math.floor(i/3)+1)%3%2)), 50*px-1*px*(i+1)%3, 50*px);
		}
		draw_tictac();
	}
}

function new_round(){
	winner=0;
	cross=true;
	database = [[0,0,0],[0,0,0],[0,0,0]];
	copy_database = [[0,0,0],[0,0,0],[0,0,0]];
	draw_empty();
}

function reset(){
	document.getElementById("score1").innerHTML = 0;
	document.getElementById("score2").innerHTML = 0;
	new_round();
}

function canvas_click(event){
	var canvas = document.getElementById("tictactoe");
	var target = canvas.getBoundingClientRect();

	var mouse_coord = {x: event.clientX - target.left, y: event.clientY - target.top}

	var i = Math.ceil(mouse_coord.x/(canvas.scrollWidth/3)%3)-1;
	var j = Math.ceil(mouse_coord.y/(canvas.scrollHeight/3)%3)-1;

	console.log(i, j);

	if (!database[i][j] && !winner) {
		copy_database = JSON.parse(JSON.stringify(database));
		console.log(database, copy_database);
		database[i][j] = (cross)?"X":"0";
		draw_tictac();
		cross = !cross;
	}
}
