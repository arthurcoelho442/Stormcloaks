export default class Tropa{
    constructor(cena, xTropa, yTropa, vida, imgTropa){
        this.xTropa = xTropa;
        this.yTropa = yTropa;
        this.vida = vida;
        this.vidaMax = vida;
        this.cena = cena;
        this.loop = false;
        this.sprite =  cena.physics.add.sprite(this.xTropa, this.yTropa, imgTropa, 0);
        this.sprite.body.setCircle(11,14,14)

        cena.anims.create({
            key: 'Tropa-1',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-2',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        }); 
        cena.anims.create({
            key: 'Tropa-3',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-4',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 3, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-5',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 4, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-6',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 5, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-7',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 6, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-8',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 7, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-9',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 8, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-10',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 9, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-11',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 10, end: 10 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-12',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 11, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-13',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 12, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-14',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 13, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-15',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 14, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-16',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 15, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
    }
    destroi(){
        this.sprite.destroy();
    }
}