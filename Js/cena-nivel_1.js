import Tropa from "./tropa.js";
import Wave from "./wave.js";
import Torre from "./tower.js";
import TorreDraggable from "./towerDraggable.js"
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
        this.vida = 100;
        this.dinheiro = 1000;
        //Configuração da Wave
        const qtdTropas  = 5;
        const velocidade  = 50;
        const vida = 10000;
        const xTropa = 0;
        const yTropa = 75;
        const distanciarPelo = "Esquerda"
        const imgTropa = "Tropa-1";
        //Primeira wave       
        this.wave = new Wave(this, vida, qtdTropas, velocidade, xTropa, yTropa, distanciarPelo, imgTropa);

        // grid
        // -1 é o caminho das tropas da
        //  0 é disponivel pra posicionar a torre
        //  1 é uma torre já existente
        this.map = [
            [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0],
            [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,  0,  0],
            [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,  0,  0],
            [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0],
            [ 0, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [ 0, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0],
            [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,  0,  0],
            [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,  0, -1],
            [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1],
            [ 0, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1]
        ]

        this.add.text(20, 15, 'Vidas: ' + String(this.vida));
        this.add.text(650, 15, 'Odaras: ' + String(this.dinheiro));

        this.listaDeTorres = [];

        // torre de compra (WIP, tentativa e erro até chegar a algum lugar)
        // provavelmente vou mudar algumas coisas nessa parte (nomes e organização)
        this.torreCompra = new TorreDraggable({
            cena: this,
            x: 775,
            y: 575,
            imagem: "Torre-Teste",
            map: this.map,
            // função chamada sempre que o jogador solta a torre em algum lugar
            ondragend: (cena, map) => {
                // converter de coordenadas do canvas para coordenadas do grid
                const x = (Math.ceil(this.torreCompra.x / 50) - 1).toString()
                const y = (Math.ceil(this.torreCompra.y / 50) - 1).toString()

                // se for 0 pode colocar, se não for 0 tem caminho ou já tem torre
                if (map[y][x] == 0) {
                    map[y][x] = 1; // marca a casa do grid como marcada
                    
                    // add nova torre
                    cena.listaDeTorres.push(new Torre({
                        cena: cena,
                        x: this.torreCompra.x,
                        y: this.torreCompra.y,
                        imagem: "Torre-Teste",
                        raio: 125
                    }))
                }

                // snap da torre de compra de volta pro lugar q ela fica
                this.torreCompra.x = this.torreCompra.originalX
                this.torreCompra.y = this.torreCompra.originalY
            }
        });
    }

    update(time, delta){
        const wave = this.wave.tropas;

        // pra cada torre procura se tem pelo menos uma tropa no seu alcance
        this.listaDeTorres.forEach((torre) => {
            let target = null
            for(let i=0; i<wave.length; i++){
                if(wave[i] == null){
                    continue;
                }
                let tropa = wave[i]
                let sprite = tropa.sprite
                let pos = sprite.getCenter();
                const x = torre.x - pos.x 
                const y = torre.y - pos.y
                const dist = Math.sqrt(x*x + y*y)
                if (dist <= torre.raio) {
                    target = wave[i];
                    break;  // hoje eu descobri que forEachs não suportam break statements. se suportassem eu não teria usado o for da linha 101
                }
            }
            if (target) {
                torre.trackEnemy(target.sprite.getCenter().x, target.sprite.getCenter().y);
            }
        })

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
            }if(pos.x >= 675 && pos.y >= 375){
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }if(pos.x >= 675 && pos.y >= 525){
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
        //Perdeu
        if(this.vida == 0)
            this.scene.start("Menu");

        //Proximo nivel
        if(cont == 5)
            this.scene.start("Nivel-2");

        //Inicia proxima wave
        else if(cont == wave.length){
            this.wave = new Wave(this, 20000, 10, 70, 0, 75, "Esquerda", "Tropa-1");
            cont = 0;
        }
    }
}