"use strict";
const player_1 = require("./player");
class GameEngine {
    constructor() {
        this.PLAYER_LIST = {};
        this.SOCKET_LIST = {};
    }
    addPlayer(socket) {
        this.PLAYER_LIST[socket.id] = new player_1.Player(socket);
        this.SOCKET_LIST[socket.id] = socket;
    }
    removePlayer(socket) {
        delete this.SOCKET_LIST[socket.id];
        delete this.PLAYER_LIST[socket.id];
    }
    input(socket, data) {
        let player = this.PLAYER_LIST[socket.id];
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
            for (let socket in this.SOCKET_LIST) {
            }
        }, 400);
    }
}
exports.GameEngine = GameEngine;
