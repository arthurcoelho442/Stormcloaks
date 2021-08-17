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
        this.qtdWave = 10; //quantidade de waves do nivel
    }
    preload() {

    }

    create() {
        this.backgroud = this.add.image(0, 0, "Mapa-1").setOrigin(0, 0);
        this.grid = this.add.image(0, 0, "Grid").setOrigin(0, 0);

        this.menuLateral = this.add.image(800, 0, "Menu-Lateral").setOrigin(0, 0);

        this.music = this.sound.add("WC3-Orc",{
            mute: false,
            volume: 0.25,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.music.play();

        //Configuração da Wave
        const qtdTropas = 10;
        const velocidade = 50;
        const vida = 1000;
        const xTropa = -50;
        const yTropa = 75;
        const distanciarPelo = "Esquerda"
        const imgTropa = "Tropa";
        
        let waves = [];
        for (let i = 0; i < this.qtdWave; i++){
            waves[i] = new Wave(this, vida + i * 215, qtdTropas + i, velocidade + i * 7, xTropa, yTropa, distanciarPelo, imgTropa);
            waves[i].setColor(i+1);
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
            
        this.backgroud = this.add.image(55, 610, "Vidas").setOrigin(0,0).setScale(0.1, 0.1);
        this.textVidas = this.add.text(105, 622, String(this.vida));
        this.backgroud = this.add.image(665, 615, "Coin").setOrigin(0,0).setScale(0.028, 0.028);
        this.textDinheiro =  this.add.text(705, 622, String(this.dinheiro));

        this.listaDeTorres = [];
        this.torresDeCompra = [];

        // função chamada quando terminamos de arrastar uma torre
        const ondragend = (cena, map, id) => {
            let x = this.torresDeCompra[id].x
            let y = this.torresDeCompra[id].y
            
            // checa os limites do canvas
            if (x < 800 && y < 600) {
                // converter de coordenadas do canvas para coordenadas do grid
                x = (Math.ceil(this.torresDeCompra[id].x / 50) - 1).toString()
                y = (Math.ceil(this.torresDeCompra[id].y / 50) - 1).toString() 

                // se for 0 pode colocar, se não for 0 tem caminho ou já tem torre
                if (map[y][x] == 0) {
                    let custo;
                    let raio;
                    let dano;
                    let fireRate; // tempo entre os tiros, em ms

                    console.log(id)

                    if (id == 0) {  // torre padrão (só precisamos balancear)
                        custo = 500;
                        raio = 190;
                        dano = 100;
                        fireRate = 480;
                    } else if (id == 1) { // torre canhão (ainda não funciona)
                        custo = 750;
                        raio = 140;
                        dano = 250;
                        fireRate = 1280;
                    } else if (id == 2) { // torre de cola (ainda não funciona)
                        custo = 500;
                        raio = 190;
                        dano = 100;
                        fireRate = 640;
                    } else { // torre sniper (só precisamos balancear)
                        custo = 1000;
                        raio = 540;
                        dano = 500;
                        fireRate = 1280;
                    }

                    if (this.dinheiro >= custo) {
                        map[y][x] = 1; // marca a casa do grid como marcada
                        
                        this.dinheiro -= custo;
                        
                        // add nova torre
                        cena.listaDeTorres.push(new Torre({
                            cena: cena,
                            id: id,
                            x: this.torresDeCompra[id].x,
                            y: this.torresDeCompra[id].y,
                            imagem: "Torre-" + String(id + 1),
                            raio: raio,
                            dano: dano,
                            fireRate: fireRate
                        }))
                    }
                }
            }

            // snap da torre de compra de volta pro lugar q ela fica
            this.torresDeCompra[id].x = this.torresDeCompra[id].originalX
            this.torresDeCompra[id].y = this.torresDeCompra[id].originalY
        }

        for (let i = 0; i < 4; i++) {
            const torreCompra = new TorreDraggable({
                cena: this,
                x: 850,
                y: 100 + 60 * i, // valores das posições das torres são 100, 160, 220, 280 (completamente arbitrário)
                imagem: "Menu-Icon-" + String(i + 1),
                map: this.map,
                id: i,
                ondragend: ondragend
            });

            //On hover da descrição das torres
            var descricao;
            torreCompra.on('pointerover', () => {
                descricao = this.add.image(torreCompra.originalX-75, torreCompra.originalY, "Menu-Icon-2");
            })
            torreCompra.on('pointerout', () => {
                descricao.destroy();
            })
            this.torresDeCompra.push(torreCompra)
        }
    }

    update(time, delta) {
        this.textVidas.setText(String(this.vida))
        this.textDinheiro.setText(String(this.dinheiro))

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
                    break;  // hoje eu descobri que forEachs não suportam break statements
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
                        velocidade: 800,
                        dano: torre.dano,
                        angulo: torre.angle,
                        target: target
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

                            if(tropa.vida >= tropa.vidaMax/2){
                                let tamanho = tropa.vida / tropa.vidaMax;
                                sprite.setScale(tamanho , tamanho);
                            }
                            
                            if (tropa.vida <= 0) {
                                const index = wave.indexOf(tropa);
                                if (index > -1) {
                                    wave.splice(index, 1);
                                }
                                tropa.destroi(i)
                                this.dinheiro += 50
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

        for (let i = 0; i < wave.length; i++) {
            if (wave[i] == null)
                continue;
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
        //Perdeu
        if(this.vida == 0){
            //this.scene.start("Gameover");
            this.backgroud = this.add.image(0,0,"Mapa-1").setOrigin(0,0);
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
        //Proximo nivel
        if (this.qtdWave == this.waveCounter)
            this.scene.start("Nivel-2");

        //Inicia proxima wave
        if (wave.length == 0) 
            this.waveCounter++;
    }
}