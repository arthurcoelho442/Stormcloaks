export default class cenaMenu extends Phaser.Scene{
    constructor(){
        super({
            key: "Menu"
        });
    }
    preload() {
    }

    create() {
        this.add.image(400,300,'backg')
        const playButton = this.add.image(400,300,'play')
        playButton.setInteractive()

        playButton.on('pointerover', () => {
            this.add.image(400,300,'play2')
        })
        playButton.on('pointerout', () => {
            this.add.image(400,300,'play')
        })

        playButton.on('pointerdown', () => {
            //iniciar jogo...
            this.scene.start("Nivel-1");
        })
    }

    update() {

    }
}