import Tropa from "./tropa.js";
import Torre from "./tower.js";
import TorreDraggable from "./towerDraggable.js"
import Tiro from "./shot.js"
import { setupStaticSprites, setupMusic, setupGrid, setupWave, setupSell, setupLevelUp, setupPause, setupReset } from './cena-utils.js'
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
        this.listaDeTorres = [];
        this.torresDeCompra = [];
    }

    create() {
        setupStaticSprites(this);

        setupMusic(this, "WC3-Orc");

        setupGrid(this, 1);

        setupWave(this, 1);

        // função chamada quando terminamos de arrastar uma torre
        // deus sabe como eu a gnt vai passar isso pra utils
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
                        torre.sprite.anims.play("Torre-" + firstAnimation.toString(), true); // deus sabe pq isso aq não funciona
                        
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

        setupSell(this);

        setupLevelUp(this);

        // parecido com a função "ondragend", deus sabe como a gnt vai passar isso aq pra utils
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

        setupPause(this);

        setupReset(this);

        setupHome(this);
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