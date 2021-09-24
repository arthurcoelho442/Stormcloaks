import { setupStaticSprites, setupMusic, setupGrid, setupWave, setupSell, setupTowerDraggables, setupLevelUp, setupPause, setupReset, setupHome } from './setup-utils.js'
import { updateBottomBar, updateTowers, updateTroops, checkDeath, checkNextLevel } from "./update-utils.js";
import Torre from "./tower.js";
export default class cenaNivel_2 extends Phaser.Scene{
    constructor(){
        super({
            key: "Nivel-2"
        });
        //Configuração Nivel
        this.pontuacao = 0;
        this.vidaMax = 100;
        this.dinheiroMax = 1000;
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
        setupStaticSprites(this, 2);
        setupMusic(this, "WC3-Human");
        setupGrid(this, 2);
        setupWave(this, 2);
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
        updateTroops(this, 2, time, delta, wave, waveSpeed);
        checkDeath(this);
        
        if (wave.length == 0)
            this.waveCounter++;

        checkNextLevel(this);
    }
}