import Tropa from "./tropa.js";
import Wave from "./wave.js";
export default class cenaNivel_4 extends Phaser.Scene{
    constructor(){
        super({
            key: "Nivel-4"
        });
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
        const xTropa = 0;
        const yTropa = 75;
        const distanciarPela = "Esquerda"
        const imgTropa = "Tropa-1";
        //Primeira wave       
        this.wave = new Wave(this, vida, qtdTropas, velocidade, xTropa, yTropa, distanciarPela, imgTropa);
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
            if(pos.x <= 0 && pos.y <= 75){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
                tropa.loop=true;
            }if(pos.x >= 175 && pos.x <= 180 && pos.y >= 0){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 175 && pos.x <= 180 && pos.y >= 425 && pos.y <= 430){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            }if(pos.x >= 625 && pos.y >= 425 && pos.y <= 430 && tropa.loop){
                sprite.setVelocityX(0);
                sprite.setVelocityY(-velocidade);
                setTimeout(function(){ tropa.loop = false; }, 1000);
            }else if(pos.x >= 625 && pos.y >= 425 && pos.y <= 430){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
                setTimeout(function(){ tropa.loop = true; }, 250000/velocidade);
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
            //Fim da movimentação

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
            if(pos.y >= 600){
                this.wave.destroi(i);
                this.vida--;
            }else if(tropa.vida == 0)
                this.wave.destroi(i);
        }
        //Perdeu
        if(this.vida == 0)
            this.scene.start("Menu");

        //Proximo nivel
        if(cont == wave.length)
            this.scene.start("Menu");
        
        //Inicia proxima wave
        if(cont == wave.length){
            this.wave = new Wave(this, 20000, 10, 70, 125, 0, "Y", "Tropa-1");
            cont = 0;
        }
    }
}