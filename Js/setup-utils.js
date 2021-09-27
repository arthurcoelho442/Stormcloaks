'use strict'

import Wave from "./wave.js";
import Torre from "./tower.js";
import TorreDraggable from "./towerDraggable.js"

export const setupStaticSprites = (scene, level) => {
    let mapa;
    let mapString;

    mapa = "Mapa-" + String(level);
    mapString = "Map " + String(level) + " Wave";

    scene.background = scene.physics.add.sprite(0, 0, mapa).setOrigin(0, 0);
    scene.background.setInteractive();
    scene.grid = scene.add.image(0, 0, "Grid").setOrigin(0, 0);

    scene.selectionSquare = scene.add.image(50, 50, "QuadradoSelecao").setOrigin(0, 0);
    scene.selectionSquare.visible = false;

    setupWave(scene, level);

    scene.menuLateral = scene.add.image(800, 0, "Menu-Lateral").setOrigin(0, 0);

    scene.sell = scene.physics.add.sprite(800, 300, "Menu-Icon-8").setOrigin(0, 0);
    scene.sell.setInteractive({ cursor: 'pointer' });
    scene.sell.visible = false;
    scene.levelUp = scene.physics.add.sprite(800, 360, "Menu-Icon-9").setOrigin(0, 0);
    scene.levelUp.setInteractive({ cursor: 'pointer' });
    scene.levelUp.visible = false;

    scene.background.on('pointerdown', () => {
        scene.selectedTower = null;
        scene.selectionSquare.visible = false;
        scene.sell.visible = false;
        scene.levelUp.visible = false;
    })

    scene.add.image(550, 610, "Vidas").setOrigin(0, 0).setScale(0.7, 0.7);
    scene.add.image(390, 610, "Coin").setOrigin(0, 0).setScale(0.044, 0.044);
    scene.bmpText = scene.add.bitmapText(50, 622, 'carrier_command', mapString, 16);

    scene.textVidas = scene.add.bitmapText(610, 622, 'carrier_command', String(scene.vida), 16);
    scene.textDinheiro = scene.add.bitmapText(450, 622, 'carrier_command', String(scene.dinheiro), 16);
    scene.textWave = scene.add.bitmapText(270, 622, 'carrier_command', String(scene.waveCounter + 1), 16);

    scene.bmpText.inputEnabled = true;
    scene.textVidas.inputEnabled = true;
    scene.textDinheiro.inputEnabled = true;
    scene.textWave.inputEnabled = true;

    if (level <= 2)
        scene.background = scene.add.image(70, 563, "Torre-do-Nivel").setOrigin(0, 0).setScale(0.75, 0.75);
    else if (level == 3)
        scene.backgroud = scene.add.image(300, 550, "Torre-do-Nivel").setOrigin(0, 0).setScale(1.33, 1);
    else if (level == 4)
        scene.backgroud = scene.add.image(300, 555, "Torre-do-Nivel").setOrigin(0, 0).setScale(1.68, 1);

    scene.listaDeTorres = [];
    scene.torresDeCompra = [];
}

export const setupMusic = (scene, musicName, volume) => {
    scene.music = scene.sound.add(musicName, {
        mute: false,
        volume: volume,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    });

    scene.music.play();
}

// grid
// -1 é o caminho das tropas da
//  0 é disponivel pra posicionar a torre
//  1 é uma torre já existente
export const setupGrid = (scene, level) => {
    if (level === 1) {
        scene.map = [
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
        ];
    } else if (level === 2) {
        scene.map = [
            [0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
            [0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
            [0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    } else if (level === 3) {
        scene.map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0]
        ]
    } else if (level === 4) {
        scene.map = [
            [0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0],
            [0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0],
            [0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0],
            [0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0],
            [0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0],
            [0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0],
        ]
    }
}

export const setupWave = (scene, level) => {
    let qtdTropas = 20;
    let velocidade = 50;
    let vida = 1000;
    let xTropa = -50;
    let yTropa = 75;
    let distanciarPelo = "Esquerda"
    let imgTropa = "Tropa";

    if (level === 1) {
        qtdTropas = 10;
        velocidade = 50;
        vida = 1000;
        xTropa = -50;
        yTropa = 75;
        distanciarPelo = "Esquerda"
        imgTropa = "Tropa";
    } else if (level === 2) {
        qtdTropas = 12;
        velocidade = 60;
        vida = 1000;
        xTropa = 125;
        yTropa = -10;
        distanciarPelo = "Cima"
        imgTropa = "Tropa";
    } else if (level === 3) {
        qtdTropas = 3;
        velocidade = 80;
        vida = 1000;
        xTropa = [-10, 810]
        yTropa = 125;
        imgTropa = "Tropa";
        distanciarPelo = ["Esquerda", "Direita"];
    } else if (level === 4) {
        qtdTropas = 5;
        velocidade = 80;
        vida = 1000;
        xTropa = [-10, 810, 175]
        yTropa = [75, 75, -10];
        imgTropa = "Tropa";
        distanciarPelo = ["Esquerda", "Direita", "Cima"];
    }

    let waves = [];
    if (level <= 2) {
        for (let i = 0; i < scene.qtdWave; i++) {
            waves[i] = new Wave(scene, vida + i * 180, qtdTropas + i, velocidade + i * 7, xTropa, yTropa, distanciarPelo, imgTropa);
            waves[i].setColor(i + 1);
        }
        scene.waves = waves;
    } else if (level == 3) {
        for (let i = 0; i < distanciarPelo.length; i++) {
            let tropas = [];
            for (let j = 0; j < scene.qtdWave; j++) {
                tropas[j] = new Wave(scene, vida + j * 180, qtdTropas + j, velocidade + j * 7, xTropa[i], yTropa, distanciarPelo[i], imgTropa);
                tropas[j].setColor(j + 1);
            }
            waves[i] = tropas;
        }
        scene.wavesEsquerda = waves[0];
        scene.wavesDireita = waves[1];
    } else if (level == 4) {
        for (let i = 0; i < distanciarPelo.length; i++) {
            let tropas = [];
            for (let j = 0; j < scene.qtdWave; j++) {
                tropas[j] = new Wave(scene, vida + j * 180, qtdTropas + j, velocidade + j * 7, xTropa[i], yTropa[i], distanciarPelo[i], imgTropa);
                tropas[j].setColor(j + 1);
            }
            waves[i] = tropas;
        }
        scene.wavesEsquerda = waves[0];
        scene.wavesDireita = waves[1];
        scene.wavesCima = waves[2];
    }
}

export const setupSell = (scene) => {
    scene.sell.on('pointerdown', () => {
        if (scene.selectedTower) {
            scene.dinheiro += scene.selectedTower.totalSpentOn * 0.8;
            const x = (Math.ceil(scene.selectedTower.x / 50) - 1).toString()
            const y = (Math.ceil(scene.selectedTower.y / 50) - 1).toString()
            scene.selectedTower.destroy();
            scene.selectionSquare.visible = false;
            scene.sell.visible = false;
            scene.levelUp.visible = false;
            scene.map[y][x] = 0;
            const towerIndex = scene.listaDeTorres.indexOf(scene.selectedTower);
            scene.listaDeTorres.splice(towerIndex, 1);
            scene.selectedTower = null;
        }
    })
}

export const setupLevelUp = (scene) => {
    const priceUpgradesTorreBasica = [125, 250, 375, 500]
    const priceUpgradesTorreExp = [190, 380, 570, 750]
    const priceUpgradesTorreSlow = [165, 325, 490, 650]
    const priceUpgradesTorreSniper = [375, 750, 1250, 1500]
    const priceUpgrades = [
        priceUpgradesTorreBasica,
        priceUpgradesTorreExp,
        priceUpgradesTorreSlow,
        priceUpgradesTorreSniper
    ]

    const valueUpgradesTorreBasica = [400, 300, 225, 175] // fire rate
    const valueUpgradesTorreExp = [175, 225, 300, 350] // explosion damage
    const valueUpgradesTorreSlow = [1200, 1500, 1800, 2300] // slow rate?
    const valueUpgradesTorreSniper = [[360, 625], [520, 1250], [680, 1875], [840, 2500]]
    const valueUpgrades = [
        valueUpgradesTorreBasica,
        valueUpgradesTorreExp,
        valueUpgradesTorreSlow,
        valueUpgradesTorreSniper
    ]

    let descricao;
    scene.levelUp.on('pointerover', () => {
        if (scene.selectedTower.level != 5) {
            descricao = scene.physics.add.sprite(800, 420, "Descricao-Update-Torre").setOrigin(0, 0);
            descricao.setFrame((scene.selectedTower.level - 1) + (scene.selectedTower.id * 4));
        }
    })
    scene.levelUp.on('pointerout', () => {
        if (scene.selectedTower.level != 5)
            descricao.destroy();
    })

    scene.levelUp.on('pointerdown', () => {
        if (scene.selectedTower) {
            descricao.destroy();
            if (scene.selectedTower.level != 5) {
                if (scene.dinheiro >= priceUpgrades[scene.selectedTower.id][scene.selectedTower.level - 1]) {
                    scene.dinheiro -= priceUpgrades[scene.selectedTower.id][scene.selectedTower.level - 1];
                    scene.selectedTower.level++;
                    if (scene.selectedTower.id === 0) {
                        console.log('upgrade na torre básica')
                        if (scene.selectedTower.level === 2) {
                            console.log('pro level 2')
                            scene.selectedTower.fireRate = valueUpgrades[0][0]
                        } else if (scene.selectedTower.level === 3) {
                            console.log('pro level 3')
                            scene.selectedTower.fireRate = valueUpgrades[0][1]
                        } else if (scene.selectedTower.level === 4) {
                            console.log('pro level 4')
                            scene.selectedTower.fireRate = valueUpgrades[0][2]
                        } else if (scene.selectedTower.level === 5) {
                            console.log('pro level 5')
                            scene.selectedTower.fireRate = valueUpgrades[0][3]
                        }
                    } else if (scene.selectedTower.id === 1) {
                        console.log('upgrade na torre explosiva')
                        if (scene.selectedTower.level === 2) {
                            console.log('pro level 2')
                            scene.selectedTower.danoExp = valueUpgrades[1][0]
                        } else if (scene.selectedTower.level === 3) {
                            console.log('pro level 3')
                            scene.selectedTower.danoExp = valueUpgrades[1][1]
                        } else if (scene.selectedTower.level === 4) {
                            console.log('pro level 4')
                            scene.selectedTower.danoExp = valueUpgrades[1][2]
                        } else if (scene.selectedTower.level === 5) {
                            console.log('pro level 5')
                            scene.selectedTower.danoExp = valueUpgrades[1][3]
                        }
                    } else if (scene.selectedTower.id === 2) {
                        console.log('upgrade na torre de slow')
                        if (scene.selectedTower.level === 2) {
                            console.log('pro level 2')
                            scene.selectedTower.slowTimer = valueUpgrades[2][0]
                        } else if (scene.selectedTower.level === 3) {
                            console.log('pro level 3')
                            scene.selectedTower.slowTimer = valueUpgrades[2][0]
                        } else if (scene.selectedTower.level === 4) {
                            console.log('pro level 4')
                            scene.selectedTower.slowTimer = valueUpgrades[2][0]
                        } else if (scene.selectedTower.level === 5) {
                            console.log('pro level 5')
                            scene.selectedTower.slowTimer = valueUpgrades[2][0]
                        }
                    } else if (scene.selectedTower.id === 3) {
                        console.log('upgrade na torre sniper')
                        if (scene.selectedTower.level === 2) {
                            console.log('pro level 2')
                            scene.selectedTower.raio = valueUpgrades[3][0][0]
                            scene.selectedTower.dano = valueUpgrades[3][0][1]
                        } else if (scene.selectedTower.level === 3) {
                            console.log('pro level 3')
                            scene.selectedTower.raio = valueUpgrades[3][1][0]
                            scene.selectedTower.dano = valueUpgrades[3][1][1]
                        } else if (scene.selectedTower.level === 4) {
                            console.log('pro level 4')
                            scene.selectedTower.raio = valueUpgrades[3][2][0]
                            scene.selectedTower.dano = valueUpgrades[3][2][1]
                        } else if (scene.selectedTower.level === 5) {
                            console.log('pro level 5')
                            scene.selectedTower.raio = valueUpgrades[3][3][0]
                            scene.selectedTower.dano = valueUpgrades[3][3][1]
                        }
                    }
                    scene.selectedTower.currentAnimation--;
                    scene.selectedTower.sprite.anims.play("Torre-" + scene.selectedTower.currentAnimation);
                    // console.log("tower leveled up! current level:", scene.selectedTower.level);
                }
                if (scene.selectedTower.level != 5) {
                    descricao = scene.physics.add.sprite(800, 420, "Descricao-Update-Torre").setOrigin(0, 0);
                    descricao.setFrame((scene.selectedTower.level - 1) + (scene.selectedTower.id * 4));
                }
            }
        }
    })
}

export const setupPause = (scene) => {
    const button = scene.add.sprite(770, 610, "Play_Pause", 1).setOrigin(0, 0).setScale(0.7, 0.7);
    button.setInteractive({ cursor: 'pointer' });
    button.on('pointerdown', function () {
        scene.scene.pause();
        scene.scene.launch('Pause', scene);

    }, scene);
    scene.events.on('pause', () => {
        button.setFrame(0);
        scene.music.mute = true;
    })
    scene.events.on('resume', () => {
        button.setFrame(1);
        scene.music.mute = false;
    })
}

export const setupReset = (scene) => {
    const reset = scene.add.image(710, 610, "Reset").setOrigin(0, 0).setScale(0.7, 0.7);
    reset.setInteractive({ cursor: 'pointer' });
    reset.once('pointerdown', function () {
        scene.music.mute = true;
        scene.vida = scene.vidaMax;
        scene.dinheiro = scene.dinheiroMax;
        scene.pontuacao = 0;
        scene.waveCounter = 0;
        scene.selectedTower = null;
        scene.listaDeTorres = [];
        scene.torresDeCompra = [];
        scene.scene.restart();
    }, scene);
}

export const setupHome = (scene) => {
    const home = scene.add.image(830, 610, "Home").setOrigin(0, 0).setScale(0.7, 0.7);
    home.setInteractive({ cursor: 'pointer' });
    home.once('pointerdown', function () {
        scene.scene.start("Menu");
        scene.scene.stop();
        scene.music.mute = true;
        scene.vida = scene.vidaMax;
        scene.dinheiro = scene.dinheiroMax;
        scene.pontuacao = 0;
        scene.waveCounter = 0;
        scene.selectedTower = null;
        scene.listaDeTorres = [];
        scene.torresDeCompra = [];
    }, scene);
}

// função chamada quando terminamos de arrastar uma torre
const ondragend = (scene, map, id) => {
    let x = scene.torresDeCompra[id].x
    let y = scene.torresDeCompra[id].y

    // checa os limites do canvas
    if (x < 800 && y < 600) {
        const coordenadaX = x;
        const coordenadaY = y;
        // converter de coordenadas do canvas para coordenadas do grid
        x = (Math.ceil(scene.torresDeCompra[id].x / 50) - 1).toString()
        y = (Math.ceil(scene.torresDeCompra[id].y / 50) - 1).toString()

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
                dano = 125;
                fireRate = 1000;
                firstAnimation = 9;
            } else if (id == 2) { // torre de slow
                custo = 650;
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

            if (scene.dinheiro >= custo) {
                map[y][x] = 1; // marca a casa do grid como marcada

                scene.dinheiro -= custo;

                const torre = new Torre({
                    cena: scene,
                    id: id,
                    x: scene.torresDeCompra[id].x,
                    y: scene.torresDeCompra[id].y,
                    imagem: "Torre-Default-" + String(id + 1),
                    raio: raio,
                    dano: dano,
                    fireRate: fireRate,
                    totalSpentOn: custo,
                    currAnimation: firstAnimation,
                })

                if (torre.id === 1) {
                    torre.danoExp = 125;
                } else if (torre.id === 2) {
                    torre.slowMultiplier = 0.35; // (velocidade - slowMultiplier * velocidade)
                    torre.slowTimer = 1000; // duração do slow, em ms
                }
                torre.sprite.anims.play("Torre-" + firstAnimation.toString(), true); // deus sabe pq isso aq não funciona

                torre.sprite.setInteractive()
                torre.sprite.on('pointerdown', () => {
                    scene.selectedTower = torre;
                    scene.selectionSquare.x = coordenadaX - 25;
                    scene.selectionSquare.y = coordenadaY - 25;
                    scene.selectionSquare.visible = true;
                    scene.sell.visible = true;
                    scene.levelUp.visible = true;
                })


                // add nova torre
                scene.listaDeTorres.push(torre)
            }
        }
    }

    // snap da torre de compra de volta pro lugar q ela fica
    scene.torresDeCompra[id].x = scene.torresDeCompra[id].originalX
    scene.torresDeCompra[id].y = scene.torresDeCompra[id].originalY
}

export const setupTowerDraggables = (scene) => {
    console.log('setting up draggable towers')
    for (let i = 0; i < 4; i++) {
        const torreCompra = new TorreDraggable({
            cena: scene,
            x: 850,
            y: 100 + 60 * i, // valores das posições das torres são 100, 160, 220, 280 (completamente arbitrário)
            imagem: "Menu-Icon-" + String(i + 1),
            map: scene.map,
            id: i,
            ondragend: ondragend
        });

        //On hover da descrição das torres
        var descricao;
        torreCompra.on('pointerover', () => {
            descricao = scene.add.image(torreCompra.originalX - 36, torreCompra.originalY - 65, "Descricao-" + String(torreCompra.id + 1));
        })
        torreCompra.on('pointerout', () => {
            descricao.destroy();
        })
        scene.torresDeCompra.push(torreCompra)
    }
}

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