import Wave from "./wave.js";
export default class cenaTeste extends Phaser.Scene{
    constructor(){
        super({
            key: "Teste"
        });
    }
    preload(){

    }

    create() {
        
        this.backgroud = this.add.image(0,0,"Mapa-Teste").setOrigin(0,0);
        if(true)
            this.backgroud = this.add.image(0,0,"Grid");
        this.backgroud.setOrigin(0,0);
        
        //Configuração da wave
        const vida = 10000;
        const qtdTropas = 5;
        const velocidade = 50;
        const xTropa = 0;
        const yTropa = 275;
        //Primeira wave       
        this.wave = new Wave(this, vida, qtdTropas, velocidade, xTropa, yTropa);
    }
    
    update(){
        const wave = this.wave.tropas;
        let cont =0;
        for(let i=0; i<wave.length; i++){
            if(wave[i] == null){
                cont++;
                continue;
            }
            let tropa = wave[i]
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            const velocidade = this.wave.velocidade;
            
            if(pos.x <= 0)
                sprite.setVelocityX(50);
            //Diminui a vida e o tamanho da tropa
            //Definir com a implementação das torres
            //      tropa.vida-=10;
            //      sprite.setScale(tropa.vida/10000,tropa.vida/10000);
            
            //Marca pontuação
            if(tropa.vida == 0)
                this.pontuacao += 100;

            //Exclusão da tropa
            if(pos.x >= 800 && pos.y >= 275){
                this.wave.destroi(i);
                this.vida--;
            }else if(tropa.vida == 0)
                this.wave.destroi(i);
        }
        //Proximo nivel
        if(cont == 5)
            this.scene.start("Menu");
    }
}