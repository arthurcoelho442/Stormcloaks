import Tropa from "./tropa.js";
import Wave from "./wave.js";
export default class cenaNivel_2 extends Phaser.Scene{
    constructor(){
        super({
            key: "Nivel-2"
        });
        //Configuração Nivel
        this.pontuacao = 0;
        this.vida = 100;
        this.dinheiro = 1000;
        this.textVidas = null;
        this.textDinheiro = null;
        this.waveCounter = 0;
        this.qtdWave = 12; //quantidade de waves do nivel
    }
    preload(){

    }

    create() {
        this.backgroud = this.add.image(0,0,"Mapa-2").setOrigin(0,0);
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
        const xTropa = 125;
        const yTropa = -10;
        const distanciarPelo = "Cima"
        const imgTropa = "Tropa";
              
        let waves = [];
        for (let i = 0; i < this.qtdWave; i++){
            waves[i] = new Wave(this, vida + i * 200, qtdTropas + i, velocidade + i * 7, xTropa, yTropa, distanciarPelo, imgTropa);
            waves[i].setColor(i+1);
        }
        this.waves = waves;
        this.backgroud = this.add.image(55, 5, "Vidas").setOrigin(0,0).setScale(0.1, 0.1);
        this.textVidas = this.add.text(105, 20, String(this.vida));
        this.backgroud = this.add.image(665, 15, "Coin").setOrigin(0,0).setScale(0.028, 0.028);
        this.textDinheiro =  this.add.text(705, 20, String(this.dinheiro));
    }

    update(){
        this.textVidas.setText(String(this.vida))
        this.textDinheiro.setText(String(this.dinheiro))

        let wave = this.waves[this.waveCounter].tropas;
        let waveSpeed = this.waves[this.waveCounter].velocidade;

        for (let i = 0; i < wave.length; i++) {
            if (wave[i] == null)
                continue;
            let tropa = wave[i]
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            const velocidade = waveSpeed;

            if (sprite && sprite != undefined) {
                //Movimentação da tropa
            if(pos.x <= 125 && pos.y <= 0){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
                tropa.loop=true;
            }else if(pos.x <= 125 && pos.y <= 600){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x <= 125 && pos.y >= 225){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 425 && pos.x <= 450 && pos.y >= 225 && pos.y <= 250){
                sprite.setVelocityX(0);
                sprite.setVelocityY(-velocidade);
            }if(pos.x >= 425 && pos.y <= 75 && tropa.loop){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
                setTimeout(function(){ tropa.loop = false; }, 1000);
            }else if(pos.x >= 425 && pos.y <= 75){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
                setTimeout(function(){ tropa.loop = true; }, 300000/velocidade);
            }if(pos.x >= 675 && pos.y <= 600){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 675 && pos.y >= 525){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            }if(pos.x <= 375 && pos.y >= 525 && tropa.loop){
                sprite.setVelocityX(0);
                sprite.setVelocityY(-velocidade);
                this.aux--;
                setTimeout(function(){ tropa.loop = false; }, 1000);
            }else if(pos.x <= 375 && pos.y >= 525){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            }if(pos.x <= 375 && pos.y >= 375 && pos.y <= 380){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            }if(pos.x <= 125 && pos.y >= 375){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }
            //Marca pontuação
            if (tropa.vida == 0)
                this.pontuacao += 100;
            //Exclusão da tropa
            if (pos.y >= 600) {
                this.vida--;
                wave.splice(wave.indexOf(tropa), 1);
                tropa.destroi(i)
            } else if (tropa.vida == 0){
                wave.splice(wave.indexOf(tropa), 1);
                tropa.destroi(i)
            }
            }
        }
        //Perdeu
        if(this.vida == 0)
        {
            this.backgroud = this.add.image(0,0,"Mapa-2").setOrigin(0,0);
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

        //Inicia proxima wave
        if (wave.length == 0) 
            this.waveCounter++;
        
        //Proximo nivel
        if (this.qtdWave == this.waveCounter)
            this.scene.start("Nivel-3");
        
    }
}