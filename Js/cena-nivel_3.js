import { setupStaticSprites, setupMusic, setupGrid, setupWave, setupSell, setupTowerDraggables, setupLevelUp, setupPause, setupReset, setupHome } from './setup-utils.js'
import { updateBottomBar, updateTowers, updateTroops, checkDeath, checkNextLevel, updateLista } from "./update-utils.js";
export default class cenaNivel_3 extends Phaser.Scene {
    constructor() {
        super({
            key: "Nivel-3"
        });
        //Configuração Nivel
        this.vidaMax = 100;
        this.dinheiroMax = 1000;
        this.pontuacao = 0;
        this.vida = this.vidaMax;
        this.dinheiro = this.dinheiroMax;
        this.textVidas = null;
        this.textDinheiro = null;
        this.waveCounterEsquerda = 0;
        this.waveCounterDireita = 0;
        this.qtdWave = 8;
    }
    preload() {

    }

    create(volume) {
        setupStaticSprites(this, 3);
        setupMusic(this, "WC3-NElf", volume);
        setupGrid(this, 3);
        setupSell(this);
        setupLevelUp(this);
        setupTowerDraggables(this);
        setupPause(this);
        setupReset(this);
        setupHome(this);
    }

    update(time, delta) {
        let waveEsquerda =[];
        let waveSpeedEsquerda = [];
        let waveDireita = [];
        let waveSpeedDireita = [];
        if(this.waveCounterEsquerda < this.qtdWave){
            waveEsquerda = this.wavesEsquerda[this.waveCounterEsquerda].tropas;
            waveSpeedEsquerda = this.wavesEsquerda[this.waveCounterEsquerda].velocidade;
        }
        if(this.waveCounterDireita < this.qtdWave){
            waveDireita = this.wavesDireita[this.waveCounterDireita].tropas;
            waveSpeedDireita = this.wavesDireita[this.waveCounterDireita].velocidade;
        }

        let wave = [waveEsquerda, waveDireita];
        let waveSpeed = [waveSpeedEsquerda, waveSpeedDireita];

        for(let i=0; i < wave.length; i++)
            updateLista(wave[i]);
        updateBottomBar(this, 3);
        //updateTowers(this, time, delta, wave);
        updateTroops(this, 3, time, delta, wave, waveSpeed);
        checkDeath(this);
        

        if (waveEsquerda.length == 0 && this.waveCounterEsquerda < this.qtdWave)
            this.waveCounterEsquerda++;

        if (waveDireita.length == 0 && this.waveCounterDireita < this.qtdWave)
            this.waveCounterDireita++;

        checkNextLevel(this, 4);
    }
}