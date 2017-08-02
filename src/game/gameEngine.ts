import { Player } from "./player"

export class GameEngine {
    public PLAYER_LIST = {}
    public SOCKET_LIST = {}

    public addPlayer(socket) {
        this.PLAYER_LIST[socket.id] = new Player(socket);
        this.SOCKET_LIST[socket.id] = socket;
    }

    public removePlayer(socket) {
        delete this.SOCKET_LIST[socket.id];
        delete this.PLAYER_LIST[socket.id];
    }

    public input(socket, data) {
        let player:Player = this.PLAYER_LIST[socket.id];
        switch (data.inputId) {
            case 'right': player.pressingRight = data.state; break;
            case 'left': player.pressingLeft = data.state; break;
            case 'up': player.pressingUp = data.state; break;
            case 'down': player.pressingDown = data.state; break;
        }
    }

    public start() {
        setInterval(()=>{
            for (let socket in this.SOCKET_LIST) {

            }
        }, 400);
    }
}