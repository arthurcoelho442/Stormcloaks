export default class cenaPause extends Phaser.Scene{
    constructor() {
        super({
            key: "Pause"
        });
    }
    preload() {

    }

    create(nivel) {
        var button = this.add.sprite(770, 610, "Play_Pause", 0).setOrigin(0, 0).setScale(0.7, 0.7);
        button.setInteractive();

        button.once('pointerdown', function () {
            this.scene.resume(nivel);
            this.scene.stop();
        }, this);
    }

    update() {
        //Inicio Home
        var home = this.add.image(830, 610, "Home").setOrigin(0, 0).setScale(0.7, 0.7);
        home.setInteractive();
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
}