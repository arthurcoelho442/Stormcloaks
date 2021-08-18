export default class cenaPause extends Phaser.Scene{
    constructor() {
        super({
            key: "Pause"
        });
    }
    preload() {

    }

    create(nivel) {
        const playButton = this.add.image(770, 610, "Play").setOrigin(0, 0).setScale(0.7, 0.7);
        playButton.setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.resume(nivel);
            this.scene.stop();
        })
    }

    update() {

    }
}