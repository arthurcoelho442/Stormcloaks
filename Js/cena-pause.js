export default class cenaPause extends Phaser.Scene{
    constructor() {
        super({
            key: "Pause"
        });
    }
    preload() {

    }

    create(nivel) {
        const pauseButton = this.add.image(850,550,'Pause');
        pauseButton.setInteractive();

        pauseButton.on('pointerdown', () => {
            this.scene.resume(nivel);
            this.scene.stop();
        })
    }

    update() {

    }
}