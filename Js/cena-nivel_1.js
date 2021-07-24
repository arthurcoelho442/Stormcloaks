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
        this.backgroud = this.add.image(0,0,"Mapa");
        this.backgroud.setOrigin(0,0);
        
        //configuração da Wave
        let distTropas = 100;
        let qtdTropas  = 5;
        let velocidade  = 50;

        let wave = new Array(qtdTropas);
        for(let i=0;i<qtdTropas;i++){
            wave[i] = new Tropa(this, distTropas*i);
            let sprite = wave[i].sprite;
            sprite.setVelocityX(50);
        }
        this.wave = wave;
    }

    update(){
        const wave = this.wave;
        let tropa = wave[1]
        
        //Diminui a vida e o tamanho da tropa
        tropa.vida -= 10;
        let sprite = tropa.sprite;
        sprite.setScale(tropa.vida/10000,tropa.vida/10000);
        if(tropa.vida == 0)
            sprite.destroy();

    }
}