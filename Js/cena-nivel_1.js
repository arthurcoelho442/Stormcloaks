import Tropa from "./tropa.js";
import Wave from "./wave.js";
import Torre from "./tower.js";
import TorreDraggable from "./towerDraggable.js"
import Tiro from "./shot.js"
export default class cenaNivel_1 extends Phaser.Scene {
    constructor() {
        super({
            key: "Nivel-1"
        });
        
        //Configuração Nivel
        this.pontuacao = 0;
        this.vida = 100;
        this.dinheiro = 1000;
        this.textVidas = null;
        this.textDinheiro = null;
        this.waveCounter = 0;
    }
    preload() {

    }

    create() {
        this.backgroud = this.add.image(0, 0, "Mapa-1").setOrigin(0, 0);
        if (true)
            this.backgroud = this.add.image(0, 0, "Grid");

        this.backgroud.setOrigin(0, 0);
        //Configuração da Wave
        const qtdTropas = 10;
        const velocidade = 50;
        const vida = 1000;
        const xTropa = -50;
        const yTropa = 75;
        const distanciarPelo = "Esquerda"
        const imgTropa = "Tropa-1";
        //Primeira wave       
        // this.wave = new Wave(this, vida, qtdTropas, velocidade, xTropa, yTropa, distanciarPelo, imgTropa);

        let waves = [];
        for (let i = 0; i < 10; i++) {
            waves[i] = new Wave(this, vida + i * 200, qtdTropas + i, velocidade + i * 7, xTropa, yTropa, distanciarPelo, imgTropa)
        }

        this.waves = waves;

        // grid
        // -1 é o caminho das tropas da
        //  0 é disponivel pra posicionar a torre
        //  1 é uma torre já existente
        this.map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
            [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -1],
            [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1],
            [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1]
        ]

        this.textVidas = this.add.text(20, 15, 'Vidas: ' + String(this.vida));
        this.textDinheiro =  this.add.text(650, 15, 'Odaras: ' + String(this.dinheiro));

        this.listaDeTorres = [];

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
                    
                    if (this.dinheiro >= 500) {
                        map[y][x] = 1; // marca a casa do grid como marcada
                        
                        this.dinheiro -= 500;
                        
                        // add nova torre
                        cena.listaDeTorres.push(new Torre({
                            cena: cena,
                            x: this.torreCompra.x,
                            y: this.torreCompra.y,
                            imagem: "Torre-Teste",
                            raio: 190,
                            dano: 200
                        }))
                    }
                }

                // snap da torre de compra de volta pro lugar q ela fica
                this.torreCompra.x = this.torreCompra.originalX
                this.torreCompra.y = this.torreCompra.originalY
            }
        });
    }

    update(time, delta) {
        this.textDinheiro.setText('Vidas: ' + String(this.vida))
        this.textDinheiro.setText('Odaras: ' + String(this.dinheiro))

        let wave = this.waves[this.waveCounter].tropas;
        let waveSpeed = this.waves[this.waveCounter].velocidade;

        // pra cada torre procura se tem pelo menos uma tropa no seu alcance
        this.listaDeTorres.forEach((torre) => {
            let target = null
            for (let i = 0; i < wave.length; i++) {
                if (wave[i] == null) {
                    continue;
                }
                let tropa = wave[i]
                let sprite = tropa.sprite
                let pos = sprite.getCenter();
                const x = torre.x - pos.x
                const y = torre.y - pos.y
                const dist = Math.sqrt(x * x + y * y)
                if (dist <= torre.raio) {
                    target = wave[i];
                    break;  // hoje eu descobri que forEachs não suportam break statements. se suportassem eu não teria usado o for da linha 101
                }
            }
            if (target) {
                torre.trackEnemy(target.sprite.getCenter().x, target.sprite.getCenter().y);

                if (torre.update(time, delta)) {
                    const shot = new Tiro({
                        cena: this,
                        x: torre.x,
                        y: torre.y,
                        imagem: "Tiro-Teste",
                        velocidade: 700,
                        dano: 100,
                        angulo: torre.angle
                    })

                    // para cada tiro criado, adiciono um overlap entre a tropa e o tiro
                    // (as vezes o tiro bate em uma tropa que não é o alvo, e a gnt quer que o tiro ainda conte)
                    for (let i = 0; i < wave.length; i++) {
                        if (wave[i] == null) {
                            continue;
                        }
                        let tropa = wave[i]
                        let sprite = tropa.sprite
                        // função que cria o overlap
                        this.physics.add.overlap(shot.sprite, sprite, () => {
                            tropa.vida -= torre.dano
                            if (tropa.vida <= 0) {
                                const index = wave.indexOf(tropa);
                                if (index > -1) {
                                    wave.splice(index, 1);
                                }
                                tropa.destroi(i)
                                this.dinheiro += 100
                            }
                            shot.sprite.destroy();
                        })
                    }

                    // essa função basicamente faz o que eu passei 6h tentando implementar
                    this.physics.moveToObject(shot.sprite, target.sprite, shot.velocidade);
                    torre.shots.push(shot)
                }

                torre.shots.forEach((shot) => {
                    shot.update(time, delta)
                })
            }
        })

        let count = 0;
        for (let i = 0; i < wave.length; i++) {
            if (wave[i] == null) {
                count++;
                continue;
            }
            let tropa = wave[i]
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            const velocidade = waveSpeed;

            if (sprite && sprite != undefined) {
                //Movimentação da tropa
                if (pos.x <= 0 && pos.y == 75) {
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 675 && pos.y >= 75) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x >= 675 && pos.y >= 225) {
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x <= 125 && pos.y != 75) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x <= 125 && pos.y >= 375 && pos.y <= 380) {
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 675 && pos.y >= 375) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x >= 675 && pos.y >= 525) {
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                }
            }

            //Diminui a vida e o tamanho da tropa
            //Definir com a implementação das torres
            if (false) {
                tropa.vida -= 4;
                sprite.setScale(tropa.vida / 10000, tropa.vida / 10000);
            }

            //Marca pontuação
            if (tropa.vida == 0)
                this.pontuacao += 100;

            //Exclusão da tropa
            if (pos.x <= 125 && pos.y >= 600 || tropa.vida == 0) {
                this.wave.destroi(i);
                this.vida--;
            } else if (tropa.vida == 0)
                this.wave.destroi(i);
        }
        //Perdeu
        if (this.vida == 0)
            this.scene.start("Menu");

        //Inicia proxima wave
        if (wave.length == 0) {
            this.waveCounter++;
        }

        //Proximo nivel
        if (this.waveCounter == 10)
            this.scene.start("Nivel-2");

    }
}