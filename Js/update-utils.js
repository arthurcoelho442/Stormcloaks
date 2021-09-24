'use strict'

import Tiro from "./shot.js"

export const updateBottomBar = (scene, waveCounter) => {
    scene.textVidas.setText(String(scene.vida))
    scene.textDinheiro.setText(String(scene.dinheiro))
    scene.textWave.setText(("00" + String(scene.waveCounter + 1)).slice(-2) + "/" + ("00" + String(scene.qtdWave)).slice(-2))
}

export const logFps = (game) => console.log('actual fps:' + String(game.loop.actualFps))

export const updateTowers = (scene, time, delta) => {
    let wave = scene.waves[scene.waveCounter].tropas;

    scene.listaDeTorres.forEach((torre) => {
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
                    cena: scene,
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
                    scene.physics.add.overlap(shot.sprite, sprite, () => {
                        if (torre.id == 2) {
                            tropa.isSlowed = true;
                            tropa.slowMultiplier = torre.slowMultiplier;
                            tropa.slowTimer = torre.slowTimer;
                        }

                        if (torre.id == 1) {
                            const explosionSprite = scene.physics.add.sprite(sprite.getCenter().x, sprite.getCenter().y, "Explosion");
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
                                scene.physics.add.overlap(explosionSprite, expSprite, () => {
                                    if (canTakeExplosionDamage) {
                                        expTropa.vida -= torre.dano;
                                    }
                                    canTakeExplosionDamage = false;
                                })
                            }
                            scene.anims.create({
                                key: 'Explosion-1',
                                frames: scene.anims.generateFrameNumbers("Explosion", { start: 0, end: 9 }),
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
                scene.physics.moveToObject(shot.sprite, target.sprite, shot.velocidade);
                torre.shots.push(shot)
            }

            torre.shots.forEach((shot) => {
                shot.update(time, delta)
            })
        }
    })
}

export const updateTroops = (scene, level, time, delta, wave, waveSpeed) => {
    for (let i = 0; i < wave.length && level === 1; i++) {
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
        } else {
            sprite.anims.play('Tropa-' + String(scene.waveCounter + 1), true);
        }

        if (sprite && sprite != undefined) {
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
            scene.pontuacao += 100;

        //Exclusão da tropa
        if (pos.y >= 563) {
            scene.vida--;
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
            scene.dinheiro += 75
        }
    }

    for (let i = 0; i < wave.length && level === 2; i++) {
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
        } else {
            sprite.anims.play('Tropa-' + String(scene.waveCounter + 1), true);
        }

        if (sprite && sprite != undefined) {
            if (pos.x <= 125 && pos.y <= 0) {
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
                tropa.loop = true;
            } else if (pos.x <= 125 && pos.y <= 600) {
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            } if (pos.x <= 125 && pos.y >= 225) {
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            } if (pos.x >= 425 && pos.x <= 450 && pos.y >= 225 && pos.y <= 250) {
                sprite.setVelocityX(0);
                sprite.setVelocityY(-velocidade);
            } if (pos.x >= 425 && pos.x <= 450 && pos.y <= 75 && tropa.loop) {
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
                setTimeout(function () { tropa.loop = false; }, 1000);
            } else if (pos.x >= 425 && pos.y <= 75) {
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
                setTimeout(function () { tropa.loop = true; }, 300000 / velocidade);
            } if (pos.x >= 675 && pos.y <= 600) {
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            } if (pos.x >= 675 && pos.y >= 525) {
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            } if (pos.x <= 375 && pos.y >= 525 && tropa.loop) {
                sprite.setVelocityX(0);
                sprite.setVelocityY(-velocidade);
                setTimeout(function () { tropa.loop = false; }, 1000);
            } else if (pos.x <= 375 && pos.y >= 525) {
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            } if (pos.x <= 375 && pos.y >= 375 && pos.y <= 380) {
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            } if (pos.x <= 125 && pos.y >= 375) {
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            }
            //Marca pontuação
            if (tropa.vida == 0)
                scene.pontuacao += 100;

            //Exclusão da tropa
            if (pos.y >= 563) {
                scene.vida--;
                sprite.anims.stop();
                wave.splice(wave.indexOf(tropa), 1);
                tropa.destroi(i)
            }

            if (tropa.vida >= tropa.vidaMax / 3.5) {
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
                scene.dinheiro += 75
            }
        }
    }
}

export const checkDeath = (scene) => {
    if (scene.vida == 0) {
        scene.scene.start("Gameover", 1);
        scene.scene.stop();
        scene.music.mute = true;
        scene.vida = scene.vidaMax;
        scene.dinheiro = scene.dinheiroMax;
        scene.waveCounter = 0;
    }
}

export const checkNextLevel = (scene) => {
    if (scene.qtdWave == scene.waveCounter) {
        scene.scene.start("Nivel-2");
        scene.scene.stop();

        scene.music.mute = true;
        scene.waveCounter = 0;
        scene.vida = scene.vidaMax;
        scene.dinheiro = scene.dinheiroMax;
    }
}