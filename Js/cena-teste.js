import Tropa from "./tropa.js";
export default class cenaTeste extends Phaser.Scene{
    constructor(){
        super({
            key: "Teste"
        });
    }
    preload(){

    }

    create() {
        this.backgroud = this.add.image(0,0,"Mapa-Teste");
        this.backgroud.setOrigin(0,0);
        
        //configuração da Wave
        let distTropas = 100;
        let qtdTropas  = 5;
        let velocidade  = 50;

        let wave = new Array(qtdTropas);
        for(let i=0;i<qtdTropas;i++){
            wave[i] = new Tropa(this, -80*i, 275);
            let sprite = wave[i].sprite;
        }
        this.wave = wave;
    }
    
    update(){
        const wave = this.wave;
        
        for(let i=0; i<wave.length; i++){
            if(wave[i] == null)
                continue;
            let tropa = wave[i]
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            const velocidade = 50;
            
            if(pos.x <= 0)
                sprite.setVelocityX(50);
            //Diminui a vida e o tamanho da tropa
            //Definir com a implementação das torres
            //      tropa.vida-=10;
            //      sprite.setScale(tropa.vida/10000,tropa.vida/10000);
            
            //Exclusão da tropa
            if(pos.x >= 800 || tropa.vida == 0){
                sprite.destroy();
                tropa = null
                wave[i] = null;
            }
        }
    }
}