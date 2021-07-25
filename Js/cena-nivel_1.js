import Tropa from "./tropa.js";
export default class cenaNivel_1 extends Phaser.Scene{
    constructor(){
        super({
            key: "Nivel-1"
        });
    }
    preload(){

    }

    create() {
        this.backgroud = this.add.image(0,0,"Mapa-1");
        this.backgroud.setOrigin(0,0);
        
        //configuração da Wave
        let distTropas = 100;
        let qtdTropas  = 5;
        let velocidade  = 50;

        let wave = new Array(qtdTropas);
        for(let i=0;i<qtdTropas;i++){
            wave[i] = new Tropa(this, -80*i, 75);
            let sprite = wave[i].sprite;
        }
        this.wave = wave;
    }

    update(){
        const wave = this.wave;
        let cont = 0;
        //movimentação da Tropa
        for(let i=0; i<wave.length; i++){
            if(wave[i] == null){
                cont++;
                continue;
            }
            let tropa = wave[i]
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            const velocidade = 50;
            if(pos.x <= 0 && pos.y == 75){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 675 && pos.y >= 75){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 675 && pos.y >= 225){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            }if(pos.x <= 125 && pos.y != 75){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x <= 125 && pos.y >= 375 && pos.y <= 380){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 670 && pos.y >= 370){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 670 && pos.y >= 370){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 670 && pos.y >= 525){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            }

            //Diminui a vida e o tamanho da tropa
            //Definir com a implementação das torres
            //      tropa.vida-=100;
            //      sprite.setScale(tropa.vida/10000,tropa.vida/10000);
            
            //Exclusão da tropa
            if(pos.x <= 125 && pos.y >= 550 || tropa.vida == 0){
                sprite.destroy();
                tropa = null
                wave[i] = null;
            }
        }
        //Inicio da proxima wave
        //if(cont == wave.length)
        //    this.create();
    }
}