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
            this.scene.start("Escolha");
        })

        const confButton = this.add.text(340, 350, 'Configurações');
        const scoreButton = this.add.text(340, 400, 'Teste gameover');
        confButton.setInteractive()
        scoreButton.setInteractive()

        confButton.on('pointerdown', () => {
            this.scene.start("Configuracoes");
        })

        scoreButton.on('pointerdown', () => {
            this.scene.start("Gameover");
        })
    }

    update() {

    }
}