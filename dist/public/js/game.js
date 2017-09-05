var socket = io();

var canvas = oCanvas.create({
	canvas: "#canvas",
	background: "#eee",
	//fps: 60
});
var chargeIndicator = canvas.display.rectangle({
	x: 750,
	y: 630,
	width: 50,
    height: 50,
    origin: { x: "center", y: "center" },
	fill: "#000"
});
var arrowIndicator = canvas.display.image({
	x: 750,
	y: 550,
	origin: { x: "center", y: "center" },
    image: "img/arrow.png",
    width: 100,
});
canvas.addChild(chargeIndicator);
canvas.addChild(arrowIndicator);
var chatText = document.getElementById('chat-text');
var chatForm = document.getElementById('chat-form');
var chatInput = document.getElementById('chat-input');

var objects = {

}
var present = [];
var own_id = '';

socket.on('init', function(data) {
    own_id = data.id;
})

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

            var line = canvas.display.line({
                start: { x: 15, y: 0 },
                end: { x: 25, y: 0 },
                stroke: "3px #000",
                cap: "round"
            });

            ellipse.addChild(line);

            if (own_id === player.id) {
                for(var i = 0; i < 4; i++) {
                    var linep = canvas.display.line({
                        start: { x: 30 + i*20, y: 0 },
                        end: { x: 40 + i*20, y: 0 },
                        stroke: "1px #444"
                    });
        
                    ellipse.addChild(linep);
                }
            }
    
            canvas.addChild(ellipse);
            objects[player.id] = ellipse;
        }
        if (own_id === player.id) {
            chargeIndicator.scaleTo(player.charge * 1200, 50);
            player.haveArrow ? arrowIndicator.moveTo(750,600) : arrowIndicator.moveTo(-500, 0);
        }
        objects[player.id].rotateTo(player.rotation);
    })

    data.arrows.forEach(function(arrow) {
        present.push(arrow.id);
        if (objects[arrow.id]) {
            objects[arrow.id].moveTo(arrow.x, arrow.y);
        } else {
            var arrow_img = canvas.display.image({
                x: arrow.x,
                y: arrow.y,
                origin: { x: "center", y: "center" },
                image: "img/arrow-fly.png",
                width: 40,
                height: 40,
            });
    
            canvas.addChild(arrow_img);
            objects[arrow.id] = arrow_img;
        }

        if (arrow.isFlying) {
            objects[arrow.id].rotateTo(arrow.rotation + 180);
        } else {
            objects[arrow.id].rotateTo(arrow.rotation > -180 && arrow.rotation < -90 || arrow.rotation < 180 && arrow.rotation > 90 ? 0 : -180);
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

socket.on('addToChat', function(message) {
    chatText.innerHTML += '<div>'+message+'</div>';
})

chatForm.onsubmit = function(e) {
    e.preventDefault();
    if (chatInput.value[0] === '/') {
        socket.emit('evalServer', chatInput.value.slice(1));
    } else {
        socket.emit('msgToServer', chatInput.value);
    }
    chatInput.value = '';
}

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

canvas.bind("mousedown", function() {
    socket.emit('input', {inputId: 'attack', state: true})
})

canvas.bind("mouseup", function() {
    socket.emit('input', {inputId: 'attack', state: false})
})

canvas.bind("mousemove", function() {
    socket.emit('input', {inputId: 'mouseAngle', state: {x : canvas.mouse.x, y : canvas.mouse.y}});
})