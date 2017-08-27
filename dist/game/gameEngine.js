"use strict";
const player_1 = require("./entity/player");
const arrow_1 = require("./entity/arrow");
class GameEngine {
    constructor() {
        this.SOCKET_LIST = {};
    }
    addPlayer(socket) {
        new player_1.Player(socket);
        this.SOCKET_LIST[socket.id] = socket;
    }
    removePlayer(socket) {
        delete this.SOCKET_LIST[socket.id];
        delete player_1.Player.list[socket.id];
    }
    input(socket, data) {
        let player = player_1.Player.list[socket.id];
        switch (data.inputId) {
            case 'right':
                player.pressingRight = data.state;
                break;
            case 'left':
                player.pressingLeft = data.state;
                break;
            case 'up':
                player.pressingUp = data.state;
                break;
            case 'down':
                player.pressingDown = data.state;
                break;
        }
    }
    start() {
        setInterval(() => {
            let pack = {
                players: player_1.Player.update(),
                arrows: arrow_1.Arrow.update()
            };
            for (let socket in this.SOCKET_LIST) {
                this.SOCKET_LIST[socket].emit('newPosition', pack);
            }
        }, 1000 / 25);
    }
}
exports.GameEngine = GameEngine;