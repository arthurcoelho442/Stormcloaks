import cenaCarregamento from "./cena-carregamento.js";
import cenaMenu from "./cena-menu.js";
import cenaNivel_1 from "./cena-nivel_1.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "Tower-Defender",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0,
                x: 0
            },
            debug: true
        }
    },
    scene: [
        cenaCarregamento,
        cenaMenu,
        cenaNivel_1
    ]
}
const jogo = new Phaser.Game(config);