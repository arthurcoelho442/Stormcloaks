'use strict'

import Tiro from "./shot.js"

export const updateBottomBar = (scene, level) => {
    scene.textVidas.setText(String(scene.vida))
    scene.textDinheiro.setText(String(scene.dinheiro))
    if (level <= 2)
        scene.textWave.setText(("00" + String(scene.waveCounter + 1)).slice(-2) + "/" + ("00" + String(scene.qtdWave)).slice(-2))
    else if (level == 3)
        scene.textWave.setText(("00" + String(scene.waveCounterDireita + scene.waveCounterEsquerda + 1)).slice(-2) + "/" + ("00" + String(scene.qtdWave * 2)).slice(-2))
    else if (level == 4)
        scene.textWave.setText(("00" + String(scene.waveCounterDireita + scene.waveCounterEsquerda + 1)).slice(-2) + "/" + ("00" + String(scene.qtdWave * 3)).slice(-2))
}

export const logFps = (game) => console.log('actual fps:' + String(game.loop.actualFps))

export const updateTowers = (scene, time, delta, wave) => {
    scene.listaDeTorres.forEach((torre) => {
        let target = null
        let targetFallback = null
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
                if ((torre.id === 2 && !wave[i].isSlowed) || torre.id !== 2) {
                    target = wave[i];
                    break;
                } else {
                    targetFallback = wave[i];
                }
            }
        }
        if (target || targetFallback) {
            if (!target && targetFallback)
                target = targetFallback

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
                    velocidade: 1000,
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
                            tropa.vida
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
                                        expTropa.vida -= torre.danoExp;
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
                        }
                        tropa.vida -= torre.dano;
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

        if (tropa.vida >= tropa.vidaMax / 2) {
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
                sprite.rotation += rotation;
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
            } if (pos.x >= 425 && pos.x <= 450 && pos.y >= 225 && pos.y <= 250) {
                sprite.setVelocityX(0);
                sprite.setVelocityY(-velocidade);
            } if (pos.x >= 425 && pos.x <= 450 && pos.y <= 75 && tropa.loop) {
                sprite.rotation -= rotation;
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
                setTimeout(function () { tropa.loop = false; }, 1000);
            } else if (pos.x >= 425 && pos.y <= 75) {
                sprite.rotation += rotation;
                sprite.setVelocityX(velocidade);
                sprite.setVelocityY(0);
                setTimeout(function () { tropa.loop = true; }, 300000 / velocidade);
            } if (pos.x >= 675 && pos.y <= 600) {
                sprite.setVelocityX(0);
                sprite.setVelocityY(velocidade);
            } if (pos.x >= 675 && pos.y >= 525) {
                sprite.rotation -= rotation;
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            } if (pos.x <= 375 && pos.y >= 525 && tropa.loop) {
                sprite.setVelocityX(0);
                sprite.setVelocityY(-velocidade);
                setTimeout(function () { tropa.loop = false; }, 1000);
            } else if (pos.x <= 375 && pos.y >= 525) {
                sprite.rotation -= rotation;
                sprite.setVelocityX(-velocidade);
                sprite.setVelocityY(0);
            } if (pos.x <= 375 && pos.y >= 375 && pos.y <= 380) {
                sprite.rotation += rotation;
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

            if (tropa.vida >= tropa.vidaMax / 2) {
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

    if (level === 3) {
        let waveEsquerda = wave[0];
        let waveDireita = wave[1];
        let waveSpeedEsquerda = waveSpeed[0];
        let waveSpeedDireita = waveSpeed[1];
        for (let i = 0; i < waveEsquerda.length && scene.qtdWave > scene.waveCounterEsquerda; i++) {
            if (waveEsquerda[i] == null)
                continue;
            let tropa = waveEsquerda[i]
            tropa.update(time, delta)
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            let velocidade = waveSpeedEsquerda;
            let rotation = 0.05;

            if (tropa.isSlowed) {
                console.log('xd')
                velocidade -= waveSpeedEsquerda * tropa.slowMultiplier;
                rotation -= (rotation * tropa.slowMultiplier + 0.0275);
                sprite.anims.play('Tropa-3', true);
                sprite.anims.frameRate = 30;
            } else {
                sprite.anims.play('Tropa-' + String(scene.waveCounterEsquerda + 1), true);
            }

            if (sprite && sprite != undefined) {
                //Movimentação das tropas da Esquerda
                if (pos.x <= 575 && pos.y >= 125 && pos.y <= 130) {
                    sprite.rotation += rotation;
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 575 && pos.y <= 130) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x >= 225 && pos.y >= 475 && pos.y <= 500) {
                    sprite.rotation -= rotation;
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x <= 225 && pos.y >= 475) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(-velocidade);
                    setTimeout(function () { tropa.loop = true; }, 1000);
                } else if (pos.x <= 475 && pos.y >= 475 && tropa.loop) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                    setTimeout(function () { tropa.loop = false; }, 1000);
                }
            }

            //Marca pontuação
            if (tropa.vida == 0)
                scene.pontuacao += 100;

            //Exclusão da tropa
            if (pos.y >= 563) {
                scene.vida--;
                sprite.anims.stop();
                waveEsquerda.splice(waveEsquerda.indexOf(tropa), 1);
                tropa.destroi(i)
            }

            if (tropa.vida >= tropa.vidaMax / 2) {
                let tamanho = tropa.vida / tropa.vidaMax;
                sprite.setScale(tamanho, tamanho);
            }

            if (tropa.vida <= 0) {
                sprite.anims.stop();
                const index = waveEsquerda.indexOf(tropa);
                if (index > -1) {
                    waveEsquerda.splice(index, 1);
                }
                tropa.destroi(i)
                scene.dinheiro += 75
            }
        }
        for (let i = 0; i < waveDireita.length && scene.qtdWave > scene.waveCounterDireita && scene.waveCounterEsquerda >= 2; i++) {
            if (waveDireita[i] == null)
                continue;
            let tropa = waveDireita[i]
            tropa.update(time, delta)
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            let velocidade = waveSpeedDireita;
            let rotation = 0.05;

            if (tropa.isSlowed) {
                velocidade -= waveSpeedDireita * tropa.slowMultiplier;
                rotation -= (rotation * tropa.slowMultiplier + 0.0275);
                sprite.anims.play('Tropa-3', true);
                sprite.anims.frameRate = 30;
            } else {
                sprite.anims.play('Tropa-' + String(scene.waveCounterDireita + 1), true);
            }

            if (sprite && sprite != undefined) {
                //Movimentação das tropas da Esquerda
                if (pos.x >= 225 && pos.y >= 125 && pos.y <= 130) {
                    sprite.rotation -= rotation;
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x <= 225 && pos.y >= 120 && pos.y <= 130) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x >= 200 && pos.y >= 475 && pos.y <= 500) {
                    sprite.rotation += rotation;
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 575 && pos.y >= 475) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(-velocidade);
                    setTimeout(function () { tropa.loop = true; }, 1000);
                } else if (pos.x >= 325 && pos.y >= 475 && tropa.loop) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                    setTimeout(function () { tropa.loop = false; }, 1000);
                }
            }
            //Marca pontuação
            if (tropa.vida == 0)
                scene.pontuacao += 100;

            //Exclusão da tropa
            if (pos.y >= 563) {
                scene.vida--;
                sprite.anims.stop();
                waveDireita.splice(waveDireita.indexOf(tropa), 1);
                tropa.destroi(i)
            }

            if (tropa.vida >= tropa.vidaMax / 2) {
                let tamanho = tropa.vida / tropa.vidaMax;
                sprite.setScale(tamanho, tamanho);
            }

            if (tropa.vida <= 0) {
                sprite.anims.stop();
                const index = waveDireita.indexOf(tropa);
                if (index > -1) {
                    waveDireita.splice(index, 1);
                }
                tropa.destroi(i)
                scene.dinheiro += 75
            }
        }
    }
    if (level == 4) {
        let waveEsquerda = wave[0];
        let waveDireita = wave[1];
        let waveCima = wave[2];
        let waveSpeedEsquerda = waveSpeed[0];
        let waveSpeedDireita = waveSpeed[1];
        let waveSpeedCima = waveSpeed[2];
        for (let i = 0; i < waveEsquerda.length && scene.qtdWave > scene.waveCounterEsquerda; i++) {
            if (waveEsquerda[i] == null)
                continue;
            let tropa = waveEsquerda[i]
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            let velocidade = waveSpeedEsquerda;
            let rotation = 0.05;

            if (sprite && sprite != undefined) {
                //Movimentação da tropa
                if (pos.x <= 0 && pos.y <= 75) {
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 175 && pos.x <= 180 && pos.y >= 0) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x >= 175 && pos.x <= 180 && pos.y >= 425 && pos.y <= 430) {
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 625 && pos.y >= 425 && pos.y <= 430) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(-velocidade);
                    setTimeout(function () { tropa.loop = true; }, 2000);
                } if (pos.x >= 625 && pos.y >= 425 && tropa.loop) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x >= 625 && pos.y >= 175 && pos.y <= 180) {
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 625 && pos.y >= 525) {
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x <= 325 && pos.y >= 525) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                }
            }

            //Marca pontuação
            if (tropa.vida == 0)
                scene.pontuacao += 100;
            //Exclusão da tropa
            if (pos.y >= 563) {
                scene.vida--;
                sprite.anims.stop();
                waveEsquerda.splice(waveEsquerda.indexOf(tropa), 1);
                tropa.destroi(i)
            } else if (tropa.vida == 0) {
                sprite.anims.stop();
                waveEsquerda.splice(waveEsquerda.indexOf(tropa), 1);
                tropa.destroi(i)
            }
        }
        for (let i = 0; i < waveDireita.length && scene.qtdWave > scene.waveCounterDireita && scene.waveCounterEsquerda >= 1; i++) {
            if (waveDireita[i] == null)
                continue;
            let tropa = waveDireita[i]
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            let velocidade = waveSpeedDireita;
            let rotation = 0.05;

            if (sprite && sprite != undefined) {
                //Movimentação da tropa
                if (pos.x <= 0 && pos.y <= 75) {
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 175 && pos.x <= 180 && pos.y >= 0) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x >= 175 && pos.x <= 180 && pos.y >= 425 && pos.y <= 430) {
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 625 && pos.y >= 425 && pos.y <= 430) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(-velocidade);
                    setTimeout(function () { tropa.loop = true; }, 2000);
                } if (pos.x >= 625 && pos.y >= 425 && tropa.loop) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x >= 625 && pos.y <= 175) {
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 625 && pos.y >= 525) {
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x <= 525 && pos.y >= 525) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                }
            }

            //Marca pontuação
            if (tropa.vida == 0)
                scene.pontuacao += 100;
            //Exclusão da tropa
            if (pos.y >= 563) {
                scene.vida--;
                sprite.anims.stop();
                waveDireita.splice(waveDireita.indexOf(tropa), 1);
                tropa.destroi(i)
            } else if (tropa.vida == 0) {
                sprite.anims.stop();
                waveDireita.splice(waveDireita.indexOf(tropa), 1);
                tropa.destroi(i)
            }
        }
        for (let i = 0; i < waveCima.length && scene.qtdWave > scene.waveCounterCima && scene.waveCounterDireita >= 1; i++) {
            if (waveCima[i] == null)
                continue;
            let tropa = waveCima[i]
            let sprite = tropa.sprite
            let pos = sprite.getCenter();
            let velocidade = waveSpeedCima;
            let rotation = 0.05;

            if (sprite && sprite != undefined) {
                //Movimentação da tropa
                if (pos.x <= 0 && pos.y <= 75) {
                    sprite.rotation += rotation;
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 175 && pos.x <= 180 && pos.y <= 600) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x >= 175 && pos.x <= 180 && pos.y >= 425 && pos.y <= 430) {
                    sprite.rotation += rotation;
                    sprite.setVelocityX(velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 625 && pos.y >= 425 && pos.y <= 430) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(-velocidade);
                    setTimeout(function () { tropa.loop = true; }, 2000);
                } if (pos.x >= 625 && pos.y >= 425 && tropa.loop) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                } if (pos.x >= 625 && pos.y <= 175) {
                    sprite.rotation -= rotation;
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x >= 625 && pos.y >= 525) {
                    sprite.rotation -= rotation;
                    sprite.setVelocityX(-velocidade);
                    sprite.setVelocityY(0);
                } if (pos.x <= 325 && pos.y >= 525) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(velocidade);
                }
            }

            //Marca pontuação
            if (tropa.vida == 0)
                scene.pontuacao += 100;
            //Exclusão da tropa
            if (pos.y >= 563) {
                scene.vida--;
                sprite.anims.stop();
                waveCima.splice(waveCima.indexOf(tropa), 1);
                tropa.destroi(i)
            } else if (tropa.vida == 0) {
                sprite.anims.stop();
                waveCima.splice(waveCima.indexOf(tropa), 1);
                tropa.destroi(i)
            }
        }
    }
}

export const updateLista = (wave) => {
    wave.sort(function (a, b) {
        let velocidadeA = a.sprite.body.velocity;
        let velocidadeB = b.sprite.body.velocity;


        let posA = a.sprite.getCenter();
        let posB = b.sprite.getCenter();

        if (velocidadeA.x == 0 && velocidadeA.y == 0 && velocidadeB.x == 0 && velocidadeB.y == 0)
            return 0;
        if (velocidadeA.x > 0 && velocidadeA.y == 0 && velocidadeB.x > 0 && velocidadeB.y == 0) {
            if (posA.x >= posB.x)
                return -1;
            else if (posA.x < posB.x)
                return 1;
        }
        if (velocidadeA.x < 0 && velocidadeA.y == 0 && velocidadeB.x < 0 && velocidadeB.y == 0) {
            if (posA.x > posB.x)
                return 1;
            else if (posA.x <= posB.x)
                return -1;
        }
        if (velocidadeA.x == 0 && velocidadeA.y > 0 && velocidadeB.x == 0 && velocidadeB.y > 0) {
            if (posA.y >= posB.y)
                return -1;
            else if (posA.y < posB.y)
                return 1;
        }
        if (velocidadeA.x == 0 && velocidadeA.y < 0 && velocidadeB.x == 0 && velocidadeB.y < 0) {
            if (posA.y > posB.y)
                return 1;
            else if (posA.y <= posB.y)
                return -1;
        }
    });
}

export const checkDeath = (scene) => {
    if (scene.vida == 0) {
        scene.scene.start("Gameover", scene.music.volume);
        scene.scene.stop();
        scene.music.mute = true;
        scene.vida = scene.vidaMax;
        scene.dinheiro = scene.dinheiroMax;
        scene.waveCounter = 0;

        scene.waveCounterEsquerda = 0;
        scene.waveCounterDireita = 0;
        scene.waveCounterCima = 0;
    }
}

export const checkNextLevel = (scene, level) => {
    if (scene.qtdWave == scene.waveCounter) {
        scene.scene.start("Nivel-" + String(level), scene.music.volume);
        scene.scene.stop();

        scene.music.mute = true;
        scene.waveCounter = 0;
        scene.vida = scene.vidaMax;
        scene.dinheiro = scene.dinheiroMax;

        scene.waveCounterEsquerda = 0;
        scene.waveCounterDireita = 0;
        scene.waveCounterCima = 0;
    } else if (level == 4 && scene.qtdWave == scene.waveCounterEsquerda && scene.qtdWave == scene.waveCounterDireita) {
        scene.scene.start("Nivel-" + String(level), scene.music.volume);
        scene.scene.stop();

        scene.music.mute = true;
        scene.waveCounter = 0;
        scene.vida = scene.vidaMax;
        scene.dinheiro = scene.dinheiroMax;

        scene.waveCounterEsquerda = 0;
        scene.waveCounterDireita = 0;
        scene.waveCounterCima = 0;
    } else if (level == 5 && scene.qtdWave == scene.waveCounterEsquerda && scene.qtdWave == scene.waveCounterCima) {
        scene.scene.start("Creditos");
        scene.scene.stop();

        scene.music.mute = true;
        scene.waveCounter = 0;
        scene.vida = scene.vidaMax;
        scene.dinheiro = scene.dinheiroMax;

        scene.waveCounterEsquerda = 0;
        scene.waveCounterDireita = 0;
        scene.waveCounterCima = 0;
    }
}