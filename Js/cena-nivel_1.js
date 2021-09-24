import { setupStaticSprites, setupMusic, setupGrid, setupWave, setupSell, setupTowerDraggables, setupLevelUp, setupPause, setupReset, setupHome } from './setup-utils.js'
import { updateBottomBar, updateTowers, updateTroops, checkDeath, checkNextLevel } from "./update-utils.js";
export default class cenaNivel_1 extends Phaser.Scene {
    constructor() {
        super({
            key: "Nivel-1"
        });
        //Configuração Nivel
        this.vidaMax = 100;
        this.dinheiroMax = 1000;
        this.pontuacao = 0;
        this.vida = this.vidaMax;
        this.dinheiro = this.dinheiroMax;
        this.textVidas = null;
        this.textDinheiro = null;
        this.waveCounter = 0;
        this.qtdWave = 8; //quantidade de waves do nivel
        this.selectedTower = null;
        this.listaDeTorres = [];
        this.torresDeCompra = [];
    }

    create() {
        setupStaticSprites(this, 1);
        setupMusic(this, "WC3-Orc");
        setupGrid(this, 1);
        setupWave(this, 1);
        setupSell(this);
        setupLevelUp(this);
        setupTowerDraggables(this);
        setupPause(this);
        setupReset(this);
        setupHome(this);
    }

    update(time, delta) {
        let wave = this.waves[this.waveCounter].tropas;
        let waveSpeed = this.waves[this.waveCounter].velocidade;

        updateBottomBar(this);
        updateTowers(this, time, delta, wave);
        updateTroops(this, 1, time, delta, wave, waveSpeed);
        checkDeath(this);
        
        if (wave.length == 0)
            this.waveCounter++;

        checkNextLevel(this);
    }
}