import Tropa from "./tropa.js";
import Wave from "./wave.js";
export default class cenaNivel_4 extends Phaser.Scene{
    constructor(){
        super({
            key: "Nivel-4"
        });
        //Configuração Nivel
        this.pontuacao = 0;
        this.vida = 100;
        this.dinheiro = 1000;
        this.textVidas = null;
        this.textDinheiro = null;
        this.waveCounterEsquerda = 0;
        this.waveCounterDireita = 0;
        this.waveCounterCima = 0;
        this.qtdWaveEsquerda = 8; //quantidade de waves do nivel
        this.qtdWaveDireita = 8; //quantidade de waves do nivel
        this.qtdWaveCima = 8; //quantidade de waves do nivel
    }
    preload(){

    }

    create() {
        this.backgroud = this.add.image(0,0,"Mapa-4").setOrigin(0,0);
        if(true)
            this.backgroud = this.add.image(0,0,"Grid");

            this.backgroud.setOrigin(0,0);
        //Configuração Nivel
        this.pontuacao = 0;
        this.vida = 1000;
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

        this.backgroud = this.add.image(55, 5, "Vidas").setOrigin(0, 0).setScale(0.1, 0.1);
        this.textVidas = this.add.text(105, 20, String(this.vida));
        this.backgroud = this.add.image(665, 15, "Coin").setOrigin(0, 0).setScale(0.028, 0.028);
        this.textDinheiro = this.add.text(705, 20, String(this.dinheiro));
    }

    update() {
        this.textVidas.setText(String(this.vida))
        this.textDinheiro.setText(String(this.dinheiro))

        if (this.qtdWaveEsquerda > this.waveCounterEsquerda) {
            let waveEsquerda = this.wavesEsquerda[this.waveCounterEsquerda].tropas;
            let waveSpeedEsquerda = this.wavesEsquerda[this.waveCounterEsquerda].velocidade;

            for (let i = 0; i < waveEsquerda.length; i++) {
                if (waveEsquerda[i] == null)
                    continue;
                let tropa = waveEsquerda[i]
                let sprite = tropa.sprite
                let pos = sprite.getCenter();
                const velocidade = waveSpeedEsquerda;

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
                if (pos.y >= 600) {
                    this.vida--;
                    waveEsquerda.splice(waveEsquerda.indexOf(tropa), 1);
                    tropa.destroi(i)
                } else if (tropa.vida == 0) {
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
                const velocidade = waveSpeedDireita;

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
                if (pos.y >= 600) {
                    this.vida--;
                    waveDireita.splice(waveDireita.indexOf(tropa), 1);
                    tropa.destroi(i)
                } else if (tropa.vida == 0) {
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
                const velocidade = waveSpeedCima;

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
                if (pos.y >= 600) {
                    this.vida--;
                    waveCima.splice(waveCima.indexOf(tropa), 1);
                    tropa.destroi(i)
                } else if (tropa.vida == 0) {
                    waveCima.splice(waveCima.indexOf(tropa), 1);
                    tropa.destroi(i)
                }
            }
            //Inicia proxima wave
            if (waveCima.length == 0)
                this.waveCounterCima++;
        }
        //Proximo nivel
        if (this.qtdWaveEsquerda == this.waveCounterEsquerda && this.qtdWaveDireita == this.waveCounterDireita && this.qtdWaveCima == this.waveCounterCima)
            this.scene.start("Menu");

        //Perdeu
        if(this.vida == 0)
        {
            this.backgroud = this.add.image(0,0,"Mapa-4").setOrigin(0,0);
            this.add.text(200, 190, "Game Over!", {fontSize: 60, color: 'red'});
            const buttonMenu = this.add.text(350,300, "Menu inicial");
            const buttonScore = this.add.text(350, 350, "Pontuações");

            buttonMenu.setInteractive();
            buttonScore.setInteractive();

            buttonMenu.on('pointerdown',() => {
                this.scene.start("Menu");
            })
            buttonScore.on('pointerdown',() => {
            
            })
        }
    }
}