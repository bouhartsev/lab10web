function draw() {
	var canvas = document.getElementById("tictactoe");

	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle = "black";

		var px = Math.floor(canvas.width/150);
		ctx.lineWidth = Math.floor(canvas.width/150);

		for (let i=0; i<9; i++) {
			ctx.strokeRect(50*px*(i%3), 50*px*(Math.floor(i/3)%3), 50*px, 50*px);
			ctx.clearRect(50*px*(i%3)+0.5*px*(!((i+1)%3%2)), 50*px*(Math.floor(i/3)%3)+0.5*px*(!((Math.floor(i/3)+1)%3%2)), 50*px-1*px*(i+1)%3, 50*px);
		}
	}
}

function canvas_click(event){
	var canvas = document.getElementById("tictactoe");
	var target = canvas.getBoundingClientRect();

	var mouse_coord = {x: event.clientX - target.left, y: event.clientY - target.top}
	console.log(Math.ceil(mouse_coord.x/(canvas.scrollWidth/3)%3), Math.ceil(mouse_coord.y/(canvas.scrollHeight/3)%3));
}
