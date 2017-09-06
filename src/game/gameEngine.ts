import { Player } from "./entity/player";
import { Arrow } from "./entity/arrow";
import { Constants } from "./gameConstants";

export class GameEngine {
    public SOCKET_LIST = {}

    public addPlayer(socket) {
        new Player(socket);
        this.SOCKET_LIST[socket.id] = socket;
    }

    public removePlayer(socket) {
        delete this.SOCKET_LIST[socket.id];
        delete Player.list[socket.id];
    }

    public input(socket, data) {
        let player:Player = Player.list[socket.id];
        if (player) {
            switch (data.inputId) {
                case 'right': player.pressingRight = data.state; break;
                case 'left': player.pressingLeft = data.state; break;
                case 'up': player.pressingUp = data.state; break;
                case 'down': player.pressingDown = data.state; break;
                case 'mouseAngle': player.target = data.state; break;
                case 'attack': if (player.haveArrow) player.isCharging = data.state; break;
            }
        }
    }

    public start() {
        setInterval(()=>{
            let pack = {
                players : Player.update(),
                arrows: Arrow.update()
            };
            
            for (let socket in this.SOCKET_LIST) {
                this.SOCKET_LIST[socket].emit('newPosition', pack);
            }
        }, Constants.deltaTime);
    }
}