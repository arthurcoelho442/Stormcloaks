import Tropa from "./tropa.js";
import Wave from "./wave.js";
export default class cenaNivel_4 extends Phaser.Scene{
    constructor(){
        super({
            key: "Nivel-4"
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
        this.waveCounterCima = 0;
        this.qtdWaveEsquerda = 1; //quantidade de waves do nivel
        this.qtdWaveDireita = 1; //quantidade de waves do nivel
        this.qtdWaveCima = 1; //quantidade de waves do nivel
    }
    preload(){

    }

    create() {
        this.backgroud = this.add.image(0,0,"Mapa-4").setOrigin(0,0);
        this.backgroud = this.add.image(0,0,"Grid");

        this.backgroud.setOrigin(0,0);

        this.music = this.sound.add("WC3-Undead", {
            mute: false,
            volume: 0.15,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.music.play();

        //Configuração da Wave
        const qtdTropas  = 5;
        const velocidade  = 50;
        const vida = 10000;
        const xEsquerda = -10;
        const xDireita = 810;
        const xCima = 175;
        const yTropa = 75;
        const yCima = -10;
        const imgTropa = "Tropa";
        let wavesEsquerda = [];
        for (let i = 0; i < this.qtdWaveEsquerda; i++) {
            wavesEsquerda[i] = new Wave(this, vida + i * 200, qtdTropas + i, velocidade + i * 7, xEsquerda, yTropa, "Esquerda", imgTropa);
            wavesEsquerda[i].setColor(i + 1);
        }
        this.wavesEsquerda = wavesEsquerda;
        let wavesDireita = [];
        for (let i = 0; i < this.qtdWaveDireita; i++) {
            wavesDireita[i] = new Wave(this, vida + i * 200, qtdTropas + i, velocidade + i * 7, xDireita, yTropa, "Direita", imgTropa);
            wavesDireita[i].setColor(i + 1);
        }
        this.wavesDireita = wavesDireita;this.wavesEsquerda = wavesEsquerda;
        let wavesCima = [];
        for (let i = 0; i < this.qtdWaveCima; i++) {
            wavesCima[i] = new Wave(this, vida + i * 200, qtdTropas + i, velocidade + i * 7, xCima, yCima, "Cima", imgTropa);
            wavesCima[i].setColor(i + 1);
        }
        this.wavesCima = wavesCima;

        this.add.image(550, 610, "Vidas").setOrigin(0, 0).setScale(0.7, 0.7);
        this.add.image(390, 610, "Coin").setOrigin(0, 0).setScale(0.044, 0.044);
        this.bmpText = this.add.bitmapText(50, 622, 'carrier_command','Map 4  Wave',16);
        
        this.textVidas = this.add.bitmapText(610, 622, 'carrier_command',String(this.vida),16);
        this.textDinheiro = this.add.bitmapText(450, 622, 'carrier_command',String(this.dinheiro),16);
        this.textWave = this.add.bitmapText(270, 622, 'carrier_command',String(this.waveCounterDireita+this.wavesEsquerda+2),16);

        this.bmpText.inputEnabled = true;
        this.textVidas.inputEnabled = true;
        this.textDinheiro.inputEnabled = true;
        this.textWave.inputEnabled = true;


        //Inicio Pause
        var button = this.add.sprite(770, 610, "Play_Pause", 1).setOrigin(0, 0).setScale(0.7, 0.7);
        button.setInteractive({ cursor: 'pointer' });
        button.on('pointerdown', function () {
            this.scene.pause();
            this.scene.launch('Pause', this);
    
        }, this);
        this.events.on('pause', () => {
            button.setFrame(0);
            this.music.mute = true;
        })
        this.events.on('resume', () => {
            button.setFrame(1);
            this.music.mute = false;
        })
        //Fim Pause
    
        //Inicio Reset
        var reset = this.add.image(710, 610, "Reset").setOrigin(0, 0).setScale(0.7, 0.7);
        reset.setInteractive({ cursor: 'pointer' });
        reset.once('pointerdown', function () {
            this.music.mute = true;
            this.vida = this.vidaMax;
            this.dinheiro = this.dinheiroMax;
            this.pontuacao = 0;
            this.waveCounterDireita = 0;
            this.waveCounterEsquerda = 0;
            this.waveCounterCima = 0;
    
            this.scene.restart();
        }, this);
        //Fim Reset
    
        //Inicio Home
        var home = this.add.image(830, 610, "Home").setOrigin(0, 0).setScale(0.7, 0.7);
        home.setInteractive({ cursor: 'pointer' });
        home.once('pointerdown', function () {
            this.scene.start("Menu");
            this.scene.stop();
            this.music.mute = true;
            this.vida = this.vidaMax;
            this.dinheiro = this.dinheiroMax;
            this.pontuacao = 0;
            this.waveCounterEsquerda = 0;
            this.waveCounterDireita = 0;
            this.waveCounterCima = 0;
        }, this);
        //Fim Home

        this.backgroud = this.add.image(270, 563, "Torre-do-Nivel").setOrigin(0, 0).setScale(0.75,0.75);
        this.backgroud = this.add.image(470, 563, "Torre-do-Nivel").setOrigin(0, 0).setScale(0.75,0.75);
        this.menuLateral = this.add.image(800, 0, "Menu-Lateral").setOrigin(0, 0);
    }

    update() {
        //Atualiza s valores
        this.textVidas.setText(String(this.vida))
        this.textDinheiro.setText(String(this.dinheiro))
        this.textWave.setText(("00"+String(this.waveCounterDireita+this.waveCounterEsquerda+this.waveCounterCima+1)).slice(-2)+"/"+("00"+String(this.qtdWaveDireita+this.qtdWaveEsquerda+this.qtdWaveCima)).slice(-2))

        if (this.qtdWaveEsquerda > this.waveCounterEsquerda) {
            let waveEsquerda = this.wavesEsquerda[this.waveCounterEsquerda].tropas;
            let waveSpeedEsquerda = this.wavesEsquerda[this.waveCounterEsquerda].velocidade;

            for (let i = 0; i < waveEsquerda.length; i++) {
                if (waveEsquerda[i] == null)
                    continue;
                let tropa = waveEsquerda[i]
                let sprite = tropa.sprite
                let pos = sprite.getCenter();
                let velocidade = waveSpeedEsquerda;
                let rotation = 0.05;

                if (sprite && sprite != undefined) {
                    //Movimentação da tropa
            if(pos.x <= 0 && pos.y <= 75){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 175 && pos.x <= 180 && pos.y >= 0){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 175 && pos.x <= 180 && pos.y >= 425 && pos.y <= 430){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 625 && pos.y >= 425 && pos.y <= 430){
                sprite.setVelocityX(0);
                sprite.setVelocityY(-velocidade);
                setTimeout(function(){ tropa.loop = true; }, 2000);
            }if(pos.x >= 625 && pos.y >= 425 && tropa.loop){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 625 && pos.y >= 175 && pos.y <= 180){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 625 && pos.y >= 525){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            }if(pos.x <= 325 && pos.y >= 525){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }
                }

                //Marca pontuação
                if (tropa.vida == 0)
                    this.pontuacao += 100;
                //Exclusão da tropa
                if (pos.y >= 563) {
                    this.vida--;
                    sprite.anims.stop();
                    waveEsquerda.splice(waveEsquerda.indexOf(tropa), 1);
                    tropa.destroi(i)
                } else if (tropa.vida == 0) {
                    sprite.anims.stop();
                    waveEsquerda.splice(waveEsquerda.indexOf(tropa), 1);
                    tropa.destroi(i)
                }
            }
            //Inicia proxima wave
            if (waveEsquerda.length == 0)
                this.waveCounterEsquerda++;
        }

        if (this.qtdWaveDireita > this.waveCounterDireita && this.waveCounterEsquerda >= 1) {
            let waveDireita = this.wavesDireita[this.waveCounterDireita].tropas;
            let waveSpeedDireita = this.wavesDireita[this.waveCounterDireita].velocidade;

            for (let i = 0; i < waveDireita.length; i++) {
                if (waveDireita[i] == null)
                    continue;
                let tropa = waveDireita[i]
                let sprite = tropa.sprite
                let pos = sprite.getCenter();
                let velocidade = waveSpeedDireita;
                let rotation = 0.05;

                if (sprite && sprite != undefined) {
                    //Movimentação da tropa
            if(pos.x <= 0 && pos.y <= 75){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 175 && pos.x <= 180 && pos.y >= 0){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 175 && pos.x <= 180 && pos.y >= 425 && pos.y <= 430){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 625 && pos.y >= 425 && pos.y <= 430){
                sprite.setVelocityX(0);
                sprite.setVelocityY(-velocidade);
                setTimeout(function(){ tropa.loop = true; }, 2000);
            }if(pos.x >= 625 && pos.y >= 425 && tropa.loop){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 625 && pos.y <= 175){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 625 && pos.y >= 525){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            }if(pos.x <= 525 && pos.y >= 525){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }
                }

                //Marca pontuação
                if (tropa.vida == 0)
                    this.pontuacao += 100;
                //Exclusão da tropa
                if (pos.y >= 563) {
                    this.vida--;
                    sprite.anims.stop();
                    waveDireita.splice(waveDireita.indexOf(tropa), 1);
                    tropa.destroi(i)
                } else if (tropa.vida == 0) {
                    sprite.anims.stop();
                    waveDireita.splice(waveDireita.indexOf(tropa), 1);
                    tropa.destroi(i)
                }
            }
            //Inicia proxima wave
            if (waveDireita.length == 0)
                this.waveCounterDireita++;
        }

        if (this.qtdWaveCima > this.waveCounterCima && this.waveCounterDireita >= 1) {
            let waveCima = this.wavesCima[this.waveCounterCima].tropas;
            let waveSpeedCima = this.wavesCima[this.waveCounterCima].velocidade;

            for (let i = 0; i < waveCima.length; i++) {
                if (waveCima[i] == null)
                    continue;
                let tropa = waveCima[i]
                let sprite = tropa.sprite
                let pos = sprite.getCenter();
                let velocidade = waveSpeedCima;
                let rotation = 0.05;

                if (sprite && sprite != undefined) {
                    //Movimentação da tropa
            if(pos.x <= 0 && pos.y <= 75){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 175 && pos.x <= 180 && pos.y <= 600 ){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 175 && pos.x <= 180 && pos.y >= 425 && pos.y <= 430){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 625 && pos.y >= 425 && pos.y <= 430){
                sprite.setVelocityX(0);
                sprite.setVelocityY(-velocidade);
                setTimeout(function(){ tropa.loop = true; }, 2000);
            }if(pos.x >= 625 && pos.y >= 425 && tropa.loop){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 625 && pos.y <= 175){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 625 && pos.y >= 525){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            }if(pos.x <= 325 && pos.y >= 525){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }
                }

                //Marca pontuação
                if (tropa.vida == 0)
                    this.pontuacao += 100;
                //Exclusão da tropa
                if (pos.y >= 563) {
                    this.vida--;
                    sprite.anims.stop();
                    waveCima.splice(waveCima.indexOf(tropa), 1);
                    tropa.destroi(i)
                } else if (tropa.vida == 0) {
                    sprite.anims.stop();
                    waveCima.splice(waveCima.indexOf(tropa), 1);
                    tropa.destroi(i)
                }
            }
            //Inicia proxima wave
            if (waveCima.length == 0)
                this.waveCounterCima++;
        }
        //Perdeu
        if(this.vida == 0){
            this.scene.start("Gameover",4);
            this.scene.stop();
            this.music.mute = true;
            this.vida = this.vidaMax;
            this.dinheiro = this.dinheiroMax;
            this.waveCounterEsquerda = 0;
            this.waveCounterDireita = 0;
            this.waveCounterCima = 0;
        }
        //Proximo nivel
        if (this.qtdWaveEsquerda == this.waveCounterEsquerda && this.qtdWaveDireita == this.waveCounterDireita && this.qtdWaveCima == this.waveCounterCima){
            this.scene.start("Menu");
            this.scene.stop();

            this.music.mute = true;
            this.waveCounterEsquerda = 0;
            this.waveCounterDireita = 0;
            this.waveCounterCima = 0;
            this.vida = this.vidaMax;
            this.dinheiro = this.dinheiroMax;
        }
    }
}