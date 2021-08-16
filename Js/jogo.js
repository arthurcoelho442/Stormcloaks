import cenaCarregamento from "./cena-carregamento.js";
import cenaMenu from "./cena-menu.js";
import cenaConfiguracoes from "./cena-configuracoes.js";
import cenaTeste from "./cena-teste.js";
import cenaNivel_1 from "./cena-nivel_1.js";
import cenaNivel_2 from "./cena-nivel_2.js";
import cenaNivel_3 from "./cena-nivel_3.js";
import cenaNivel_4 from "./cena-nivel_4.js";
import cenaEscolha from "./cena-escolha.js";
import cenaPontuacao from "./cena-pontuacao.js";

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
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scene: [
        cenaCarregamento,
        cenaEscolha,
        cenaConfiguracoes,
        cenaPontuacao,
        cenaMenu,
        cenaTeste,
        cenaNivel_1,
        cenaNivel_2,
        cenaNivel_3,
        cenaNivel_4,
    ]
}
const jogo = new Phaser.Game(config);