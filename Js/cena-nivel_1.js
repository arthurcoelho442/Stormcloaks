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
        this.vidaMax = 100;
        this.dinheiroMax = 1000;
        this.pontuacao = 0;
        this.vida = this.vidaMax;
        this.dinheiro = this.dinheiroMax;
        this.textVidas = null;
        this.textDinheiro = null;
        this.waveCounter = 0;
        this.qtdWave = 8; //quantidade de waves do nivel
        this.selectedTower = null;
    }
    preload() {

    }

    create() {
        this.background = this.physics.add.sprite(0, 0, "Mapa-1").setOrigin(0, 0);
        this.background.setInteractive();
        this.grid = this.add.image(0, 0, "Grid").setOrigin(0, 0);
        
        this.selectionSquare = this.add.image(50, 50, "QuadradoSelecao").setOrigin(0, 0);
        this.selectionSquare.visible = false;

        this.menuLateral = this.add.image(800, 0, "Menu-Lateral").setOrigin(0, 0);

        this.sell = this.physics.add.sprite(800, 300, "Menu-Icon-8").setOrigin(0, 0);
        this.sell.setInteractive();
        this.sell.visible = false;
        this.levelUp = this.physics.add.sprite(800, 360, "Menu-Icon-9").setOrigin(0, 0);
        this.levelUp.setInteractive();
        this.levelUp.visible = false;

        this.background.on('pointerdown', () => {
            this.selectedTower = null;
            this.selectionSquare.visible = false;
            this.sell.visible = false;
            this.levelUp.visible = false;
        })

        this.music = this.sound.add("WC3-Orc", {
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
        for (let i = 0; i < this.qtdWave; i++) {
            waves[i] = new Wave(this, vida + i * 180, qtdTropas + i, velocidade + i * 7, xTropa, yTropa, distanciarPelo, imgTropa);
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
            [0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
            [0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
            [0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]


        this.add.image(550, 610, "Vidas").setOrigin(0, 0).setScale(0.7, 0.7);
        this.add.image(390, 610, "Coin").setOrigin(0, 0).setScale(0.044, 0.044);
        this.bmpText = this.add.bitmapText(50, 622, 'carrier_command','Map 1  Wave',16);
        
        this.textVidas = this.add.bitmapText(610, 622, 'carrier_command',String(this.vida),16);
        this.textDinheiro = this.add.bitmapText(450, 622, 'carrier_command',String(this.dinheiro),16);
        this.textWave = this.add.bitmapText(270, 622, 'carrier_command',String(this.waveCounter+1),16);

        this.bmpText.inputEnabled = true;
        this.textVidas.inputEnabled = true;
        this.textDinheiro.inputEnabled = true;
        this.textWave.inputEnabled = true;

        this.listaDeTorres = [];
        this.torresDeCompra = [];


        // função de debug pra testar o mapeamento (coloca uma torre em todos os lugares possíveis)
        // for (let i = 0; i < this.map.length; i++) {
        //     for (let j = 0; j < this.map[i].length; j++) {
        //         if (!this.map[i][j]) {
        //             const torre = new Torre({
        //                 cena: this,
        //                 id: 0,
        //                 x: (j * 50) + 25,
        //                 y: (i * 50) + 25,
        //                 imagem: "Torre-" + String(0 + 1),
        //                 raio: 200,
        //                 dano: 100,
        //                 fireRate: 300
        //             })

        //             torre.sprite.setScale(1.25, 1.25)
        //             // add nova torre
        //             this.listaDeTorres.push(torre)
        //         }
        //     }
        // }

        // função chamada quando terminamos de arrastar uma torre
        const ondragend = (cena, map, id) => {
            let x = this.torresDeCompra[id].x
            let y = this.torresDeCompra[id].y

            // checa os limites do canvas
            if (x < 800 && y < 600) {
                const coordenadaX = x;
                const coordenadaY = y;
                // converter de coordenadas do canvas para coordenadas do grid
                x = (Math.ceil(this.torresDeCompra[id].x / 50) - 1).toString()
                y = (Math.ceil(this.torresDeCompra[id].y / 50) - 1).toString()

                // se for 0 pode colocar, se não for 0 tem caminho ou já tem torre
                if (map[y][x] == 0) {
                    let custo;
                    let raio;
                    let dano;
                    let fireRate; // tempo entre os tiros, em ms
                    let firstAnimation;

                    if (id == 0) {  // torre padrão
                        custo = 500;
                        raio = 190;
                        dano = 125;
                        fireRate = 500;
                        firstAnimation = 4;
                    } else if (id == 1) { // torre canhão
                        custo = 750;
                        raio = 190;
                        dano = 175;
                        fireRate = 1000;
                        firstAnimation = 9;
                    } else if (id == 2) { // torre de slow
                        custo = 500;
                        raio = 190;
                        dano = 100;
                        fireRate = 1000;
                        firstAnimation = 14;
                    } else { // torre sniper
                        custo = 1000;
                        raio = 540;
                        dano = 500;
                        fireRate = 1800;
                        firstAnimation = 19;
                    }

                    if (this.dinheiro >= custo) {
                        map[y][x] = 1; // marca a casa do grid como marcada

                        this.dinheiro -= custo;

                        const torre = new Torre({
                            cena: cena,
                            id: id,
                            x: this.torresDeCompra[id].x,
                            y: this.torresDeCompra[id].y,
                            imagem: "Torre-Default-" + String(id + 1),
                            raio: raio,
                            dano: dano,
                            fireRate: fireRate,
                            totalSpentOn: custo,
                            currAnimation: firstAnimation,
                        })

                        if (torre.id == 2) {
                            torre.slowMultiplier = 0.25; // (velocidade - slowMultiplier * velocidade)
                            torre.slowTimer = 1000; // duração do slow, em ms
                        }

                        torre.sprite.play("Torre-" + firstAnimation.toString(), true); // deus sabe pq isso aq não funciona
                        
                        torre.sprite.setInteractive()
                        torre.sprite.on('pointerdown', () => {
                            this.selectedTower = torre;
                            this.selectionSquare.x = coordenadaX - 25;
                            this.selectionSquare.y = coordenadaY - 25;
                            this.selectionSquare.visible = true;
                            this.sell.visible = true;
                            this.levelUp.visible = true;
                        })


                        // add nova torre
                        cena.listaDeTorres.push(torre)
                    }
                }
            }

            // snap da torre de compra de volta pro lugar q ela fica
            this.torresDeCompra[id].x = this.torresDeCompra[id].originalX
            this.torresDeCompra[id].y = this.torresDeCompra[id].originalY
        }

        this.sell.on('pointerdown', () => {
            if (this.selectedTower) {
                this.dinheiro += this.selectedTower.totalSpentOn * 0.8;
                const x = (Math.ceil(this.selectedTower.x / 50) - 1).toString()
                const y = (Math.ceil(this.selectedTower.y / 50) - 1).toString()
                this.selectedTower.destroy();
                this.selectionSquare.visible = false;
                this.sell.visible = false;
                this.levelUp.visible = false;
                this.map[y][x] = 0;
                const towerIndex = this.listaDeTorres.indexOf(this.selectedTower);
                this.listaDeTorres.splice(towerIndex, 1);
                this.selectedTower = null;
            }
        })

        this.levelUp.on('pointerdown', () => {
            if (this.selectedTower) {
                // todo: balancear isso aq
                if (this.selectedTower.level != 5) {
                    // todo: tabelar o preço dos upgrades
                    if (this.dinheiro >= 100) {
                        this.dinheiro -= 100;
                        this.selectedTower.level++;
                        this.selectedTower.fireRate /= 2;
                        this.selectedTower.currentAnimation--;
                        this.selectedTower.sprite.play("Torre-" + this.selectedTower.currentAnimation);
                        console.log("tower leveled up! current level:", this.selectedTower.level);
                    }
                }
            }
        })

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
                descricao = this.add.image(torreCompra.originalX-36, torreCompra.originalY-65, "Descricao-"+ String(torreCompra.id + 1));
            })
            torreCompra.on('pointerout', () => {
                descricao.destroy();
            })
            this.torresDeCompra.push(torreCompra)
        }
        this.background = this.add.image(70, 563, "Torre-do-Nivel").setOrigin(0, 0).setScale(0.75,0.75);
        
        //Inicio Pause
        var button = this.add.sprite(770, 610, "Play_Pause", 1).setOrigin(0, 0).setScale(0.7, 0.7);
        button.setInteractive({ cursor: 'pointer' });
        button.on('pointerdown', function () {
            this.scene.pause();
            this.scene.launch('Pause', this);
    
        }, this);
        this.events.on('pause', () => {
            button.setFrame(0);
            this.music.mute = true;
        })
        this.events.on('resume', () => {
            button.setFrame(1);
            this.music.mute = false;
        })
        //Fim Pause
    
        //Inicio Reset
        var reset = this.add.image(710, 610, "Reset").setOrigin(0, 0).setScale(0.7, 0.7);
        reset.setInteractive({ cursor: 'pointer' });
        reset.once('pointerdown', function () {
            this.music.mute = true;
            this.vida = this.vidaMax;
            this.dinheiro = this.dinheiroMax;
            this.pontuacao = 0;
            this.waveCounter = 0;
    
            this.scene.restart();
        }, this);
        //Fim Reset
    
        //Inicio Home
        var home = this.add.image(830, 610, "Home").setOrigin(0, 0).setScale(0.7, 0.7);
        home.setInteractive({ cursor: 'pointer' });
        home.once('pointerdown', function () {
            this.scene.start("Menu");
            this.scene.stop();
            this.music.mute = true;
            this.vida = this.vidaMax;
            this.dinheiro = this.dinheiroMax;
            this.pontuacao = 0;
            this.waveCounter = 0;
        }, this);
        //Fim Home
    }
    
    update(time, delta) {
        //Atualiza s valores
        this.textVidas.setText(String(this.vida))
        this.textDinheiro.setText(String(this.dinheiro))
        this.textWave.setText(("00"+String(this.waveCounter+1)).slice(-2)+"/"+("00"+String(this.qtdWave)).slice(-2))
        
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

                let shotPng = "Tiro-Teste"
                if (torre.id === 1) {
                    shotPng = "Explosive-Shot"
                } else if (torre.id === 2) {
                    shotPng = "Slow-Shot"
                }

                if (torre.update(time, delta)) {
                    const shot = new Tiro({
                        cena: this,
                        x: torre.x,
                        y: torre.y,
                        imagem: shotPng,
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
                            if (torre.id == 2) {
                                tropa.isSlowed = true;
                                tropa.slowMultiplier = torre.slowMultiplier;
                                tropa.slowTimer = torre.slowTimer;
                            }

                            if (torre.id == 1) {
                                const explosionSprite = this.physics.add.sprite(sprite.getCenter().x, sprite.getCenter().y, "Explosion");
                                // set body to a circle
                                explosionSprite.setCircle(15, 11, 11);
                                // scale the sprite
                                explosionSprite.setScale(4, 4);
                                // add overlaps (todo)
                                for (let j = 0; j < wave.length; j++) {
                                    if (wave[j] == null) {
                                        continue;
                                    }
                                    let expTropa = wave[j]
                                    let expSprite = expTropa.sprite
                                    let canTakeExplosionDamage = true;

                                    // função que cria o overlap
                                    this.physics.add.overlap(explosionSprite, expSprite, () => {
                                        if (canTakeExplosionDamage) {
                                            expTropa.vida -= torre.dano;
                                        }
                                        canTakeExplosionDamage = false;
                                    })
                                }
                                this.anims.create({
                                    key: 'Explosion-1',
                                    frames: this.anims.generateFrameNumbers("Explosion", { start: 0, end: 9 }),
                                    frameRate: 45,
                                    repeat: false,
                                    hideOnComplete: true
                                });
                                explosionSprite.anims.play('Explosion-1');
                                // kills the sprite after playing
                                explosionSprite.on('animationcomplete', () => explosionSprite.destroy(), explosionSprite);
                            } else {
                                tropa.vida -= torre.dano;
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
            tropa.update(time, delta)
            let velocidade = waveSpeed;
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            let rotation = 0.05;

            if (tropa.isSlowed) {
                velocidade -= waveSpeed * tropa.slowMultiplier;
                rotation -= (rotation * tropa.slowMultiplier + 0.0275);
                sprite.anims.play('Tropa-3', true);
                sprite.anims.frameRate = 30;
            }else{
                sprite.anims.play('Tropa-' + String(this.waveCounter+1), true);
            }

            if (sprite && sprite != undefined) {
                //Movimentação da tropa
                if (pos.x < 675 && pos.y == 75) {
                    sprite.rotation += rotation;
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 675 && pos.y >= 75) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x > 125 && pos.y >= 225 && pos.y <= 250) {
                    sprite.rotation -= rotation;
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x <= 125 && pos.y != 75) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x < 675 && pos.y >= 375 && pos.y <= 380) {
                    sprite.rotation += rotation;
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 675 && pos.y >= 375) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x > 125 && pos.y >= 525) {
                    sprite.rotation -= rotation;
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                }
            }

            //Marca pontuação
            if (tropa.vida == 0)
                this.pontuacao += 100;

            //Exclusão da tropa
            if (pos.y >= 563) {
                this.vida--;
                sprite.anims.stop();
                wave.splice(wave.indexOf(tropa), 1);
                tropa.destroi(i)
            }

            if (tropa.vida >= tropa.vidaMax / 3) {
                let tamanho = tropa.vida / tropa.vidaMax;
                sprite.setScale(tamanho, tamanho);
            }

            if (tropa.vida <= 0) {
                sprite.anims.stop();
                const index = wave.indexOf(tropa);
                if (index > -1) {
                    wave.splice(index, 1);
                }
                tropa.destroi(i)
                this.dinheiro += 75
            }
        }

        //Perdeu
        if (this.vida == 0) {
            this.scene.start("Gameover",1);
            this.scene.stop();
            this.music.mute = true;
            this.vida = this.vidaMax;
            this.dinheiro = this.dinheiroMax;
            this.waveCounter = 0;
        }
        //Inicia proxima wave
        if (wave.length == 0)
            this.waveCounter++;

        //Proximo nivel
        if (this.qtdWave == this.waveCounter){
            this.scene.start("Nivel-2");
            this.scene.stop();

            this.music.mute = true;
            this.waveCounter = 0;
            this.vida = this.vidaMax;
            this.dinheiro = this.dinheiroMax;
        }
    }
}