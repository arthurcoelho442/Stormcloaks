import cenaCarregamento from "./cena-carregamento.js";
import cenaMenu from "./cena-menu.js";
import cenaConfiguracoes from "./cena-configuracoes.js";
import cenaTeste from "./cena-teste.js";
import cenaNivel_1 from "./cena-nivel_1.js";
import cenaNivel_2 from "./cena-nivel_2.js";
import cenaNivel_3 from "./cena-nivel_3.js";
import cenaNivel_4 from "./cena-nivel_4.js";
import cenaGameover from "./cena-gameover.js";
import cenaEscolha from "./cena-escolha.js";
import cenaPontuacao from "./cena-pontuacao.js";
import cenaPause from "./cena-pause.js";
import cenaCreditos from "./cena-creditos.js";

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 660,
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
        cenaGameover,
        cenaPause,
        cenaCreditos
    ]
}
export const jogo = new Phaser.Game(config);