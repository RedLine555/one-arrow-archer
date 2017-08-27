var socket = io();

var canvas = oCanvas.create({
	canvas: "#canvas",
	background: "#eee",
	//fps: 60
});

var objects = {

}
var present = [];

socket.on('newPosition', function(data) {

    data.players.forEach(function(player) {
        present.push(player.id);
        if (objects[player.id]) {
            objects[player.id].moveTo(player.x, player.y);
        } else {
            var ellipse = canvas.display.ellipse({
                x: player.x,
                y: player.y,
                radius: 20,
                fill: "#"+player.id.substring(0,6)
            });
    
            canvas.addChild(ellipse);
            objects[player.id] = ellipse;

            console.log('New ' + player.id);
        }
    })

    data.arrows.forEach(function(arrow) {
        present.push(arrow.id);
        if (objects[arrow.id]) {
            objects[arrow.id].moveTo(arrow.x, arrow.y);
        } else {
            var ellipse = canvas.display.ellipse({
                x: arrow.x,
                y: arrow.y,
                radius: 5,
                fill: "#a00"
            });
    
            canvas.addChild(ellipse);
            objects[arrow.id] = ellipse;
        }
    })

    var toRemove = Object.keys(objects).filter(function(_id) { return present.indexOf(_id) === -1})
    toRemove.forEach(function(_id) {
        canvas.removeChild(objects[_id]);
        delete objects[_id];
    })

    present.length = 0;
    
    canvas.draw.redraw();
})

document.onkeydown = function(event) {
    if (event.keyCode === 68)   //d
        socket.emit('input', {inputId: 'right', state: true})
    else if (event.keyCode === 83)   //s
        socket.emit('input', {inputId: 'down', state: true})
    else if (event.keyCode === 65)   //a
        socket.emit('input', {inputId: 'left', state: true})
    else if (event.keyCode === 87)   //w
        socket.emit('input', {inputId: 'up', state: true})
}

document.onkeyup = function(event) {
    if (event.keyCode === 68)   //d
        socket.emit('input', {inputId: 'right', state: false})
    else if (event.keyCode === 83)   //s
        socket.emit('input', {inputId: 'down', state: false})
    else if (event.keyCode === 65)   //a
        socket.emit('input', {inputId: 'left', state: false})
    else if (event.keyCode === 87)   //w
        socket.emit('input', {inputId: 'up', state: false})
}