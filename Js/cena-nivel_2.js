import Tropa from "./tropa.js";
import Wave from "./wave.js";
export default class cenaNivel_1 extends Phaser.Scene{
    constructor(){
        super({
            key: "Nivel-2"
        });
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
        const yTropa = 0;
        const distanciarPelo = "Y"
        //Primeira wave       
        this.wave = new Wave(this, vida, qtdTropas, velocidade, xTropa, yTropa, distanciarPelo);
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
            }if(pos.x >= 425 && pos.x <= 430 && pos.y >= 225 && pos.y <= 230){
                sprite.setVelocityX(0);
                sprite.setVelocityY(-velocidade);
            }if(pos.x >= 425 && pos.y <= 75 && tropa.loop){
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
                setTimeout(function(){ tropa.loop = false; }, 1000);
            }else if(pos.x >= 425 && pos.y <= 75){
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
                setTimeout(function(){ tropa.loop = true; }, 250000/velocidade);
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
            if(pos.x <= 125 && pos.y >= 600){
                this.wave.destroi(i);
                this.vida--;
            }else if(tropa.vida == 0)
                this.wave.destroi(i);
        }
        //Proximo nivel
        if(cont == 10)
            this.scene.start("Teste");
        //Perdeu
        if(this.vida == 0)
            this.scene.start("Menu");
        //Inicia proxima wave
        else if(cont == wave.length){
            this.wave = new Wave(this, 20000, 10, 70, 125, 0, "Y");
            cont = 0;
        }
    }
}