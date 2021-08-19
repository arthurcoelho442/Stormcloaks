export default class Tropa{
    constructor(cena, xTropa, yTropa, vida, imgTropa){
        this.xTropa = xTropa;
        this.yTropa = yTropa;
        this.vida = vida;
        this.vidaMax = vida;
        this.cena = cena;
        this.loop = false;
        this.sprite =  cena.physics.add.sprite(this.xTropa, this.yTropa, imgTropa);
        this.sprite.body.setCircle(11);
        this.isSlowed = false;
        this.slowTimer = 0;
        this.slowMultiplier = 0;

        cena.anims.create({
            key: 'Tropa-1',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 0, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-2',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 20, end: 39 }),
            frameRate: 10,
            repeat: -1
        }); 
        cena.anims.create({
            key: 'Tropa-3',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 40, end: 59 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-4',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 60, end: 79 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-5',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 80, end: 99 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-6',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 100, end: 119 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-7',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 120, end: 139 }),
            frameRate: 10,
            repeat: -1
        });
        cena.anims.create({
            key: 'Tropa-8',
            frames: cena.anims.generateFrameNumbers(imgTropa, { start: 140, end: 159 }),
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
    
    // conta o próprio tempo slowed 
    update(time, delta) {
        if (this.isSlowed) {
            // this.sprite.anims.play("Tropa-4", true)
            this.slowTimer -= delta;
    
            if (this.slowTimer <= 0) {
                // this.sprite.anims.play("Tropa-1", true)
                this.isSlowed = false;
            }
        } else {
            this.slowTimer = 0;
        }
    }

    destroi(){
        this.sprite.destroy();
    }
}