export default class cenaMenu extends Phaser.Scene{
    constructor(){
        super({
            key: "Menu"
        });
    }
    preload() {
    }

    create() {
        this.add.image(400,300,'backg');
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
            this.scene.start("Escolha", this);
        })

        const confButton = this.add.text(340, 350, 'Configurações');
        const scoreButton = this.add.text(340, 400, 'Teste gameover');
        confButton.setInteractive()
        scoreButton.setInteractive()

        confButton.on('pointerdown', () => {
            this.scene.start("Configuracoes");
        })

        scoreButton.on('pointerdown', () => {
            this.music.mute = true;
            this.scene.start("Gameover");
        })
        this.music = this.sound.add("Poke", {
            mute: false,
            volume: 0.15,
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