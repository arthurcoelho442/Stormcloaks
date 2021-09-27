export default class cenaCreditos extends Phaser.Scene {
    constructor() {
        super({
            key: "Creditos"
        });
    }
    preload() {

    }

    create(volume) {
        this.volume = volume

        this.backgroud = this.add.image(0, 0, "End-game").setOrigin(0, 0);
        this.creditoOn = false

        this.button = this.backgroud;
        this.button.setInteractive({ cursor: 'pointer' });

        this.button.once('pointerdown', function () {
            this.backgroud = this.add.image(0, 0, "Creditos-01").setOrigin(0, 0);
            this.creditos = this.add.image(0, 0, "Creditos-02").setOrigin(0, 0);
            this.alpha = 0;
            this.creditoOn = true;
        }, this);

    }

    update() {
        if (this.creditoOn) {
            this.alpha += 0.009
            this.creditos.setAlpha(this.alpha);

            this.button.once('pointerdown', function () {
                this.scene.start("Menu", this.volume);
                this.scene.stop();
                this.music.destroy();
            }, this);
        }
    }
}