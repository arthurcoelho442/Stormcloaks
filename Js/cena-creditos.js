export default class cenaCreditos extends Phaser.Scene{
    constructor() {
        super({
            key: "Creditos"
        });
    }
    preload() {

    }

    create() {
        this.backgroud = this.add.image(0, 0, "Creditos-01").setOrigin(0, 0);
        this.creditos = this.add.image(0, 0, "Creditos-02").setOrigin(0, 0);

        this.alpha = 0;
    }

    update() {
        this.alpha+=0.009
        this.creditos.setAlpha(this.alpha);
    }
}