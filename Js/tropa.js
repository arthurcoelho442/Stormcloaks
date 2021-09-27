export default class Tropa {
    constructor(cena, xTropa, yTropa, vida, imgTropa, id) {
        this.xTropa = xTropa;
        this.yTropa = yTropa;
        this.vida = vida;
        this.vidaMax = vida;
        this.cena = cena;
        this.loop = false;
        this.sprite = cena.physics.add.sprite(this.xTropa, this.yTropa, imgTropa);
        this.sprite.body.setCircle(11);
        this.isSlowed = false;
        this.slowTimer = 0;
        this.slowMultiplier = 0;
        this.id = id;
        for (let i = 0; i <= 7; i++) {
            cena.anims.create({
                key: 'Tropa-' + (i + 1).toString(),
                frames: cena.anims.generateFrameNumbers(imgTropa, { start: 0 + 20 * i, end: 19 + 20 * i }),
                frameRate: 10,
                repeat: -1
            });
        }
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

    destroi() {
        this.sprite.destroy();
    }
}