import Tropa from "./tropa.js";
import Wave from "./wave.js";
export default class cenaNivel_1 extends Phaser.Scene{
    constructor(){
        super({
            key: "Nivel-1"
        });
    }
    preload(){

    }

    create() {
        this.backgroud = this.add.image(0,0,"Mapa-1").setOrigin(0,0);
        if(true)
            this.backgroud = this.add.image(0,0,"Grid");
        
            this.backgroud.setOrigin(0,0);
        //Configuração Nivel
        this.pontuacao = 0;
        this.vida = 10;
        //Configuração da Wave
        const qtdTropas  = 5;
        const velocidade  = 500;
        const vida = 10000;
        const xTropa = 0;
        const yTropa = 75;
        //Primeira wave       
        this.wave = new Wave(this, vida, qtdTropas, velocidade, xTropa, yTropa);
    }

    update(){
        const wave = this.wave.tropas;
        
        let cont = 0;
        for(let i=0; i<wave.length; i++){
            if(wave[i] == null){
                cont++;
                continue;
            }
            let tropa = wave[i]
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            const velocidade = this.wave.velocidade;
            
            //Movimentação da tropa
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
            if(false){
                tropa.vida-=4;
                sprite.setScale(tropa.vida/10000,tropa.vida/10000);
            }
            //Marca pontuação
            if(tropa.vida == 0)
                this.pontuacao += 100;

            //Exclusão da tropa
            if(pos.x <= 125 && pos.y >= 600 || tropa.vida == 0){
                this.wave.destroi(i);
                this.vida--;
            }else if(tropa.vida == 0)
                this.wave.destroi(i);
        }
        //Proximo nivel
        if(cont == 5)
            this.scene.start("Teste");
        //Perdeu
        if(this.vida == 0)
            this.scene.start("Menu");
        //Inicia proxima wave
        else if(cont == wave.length){
            this.wave = new Wave(this, 20000, 10, 70, 0, 75);
            cont = 0;
        }
    }
}