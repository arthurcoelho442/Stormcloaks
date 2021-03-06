export default class cenaGameover extends Phaser.Scene {
    constructor() {
        super({
            key: "Gameover"
        });
    }
    preload() {

    }

    create(volume) {
        this.backgroud = this.add.image(0, 0, 'GAME-OVER').setOrigin(0, 0);
        const buttonMenu = this.add.text(370, 400, "Menu inicial", {  font: '600 30px Poppins', color: 'red' });
        buttonMenu.setInteractive({cursor: 'pointer'});

        buttonMenu.on('pointerdown', () => {
            this.scene.start("Menu");
            this.music.destroy();
            this.scene.stop();
        })

        this.music = this.sound.add("Madara", {
            mute: false,
            volume: this.volume,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.music.play();
    }

    update() {

    }
}