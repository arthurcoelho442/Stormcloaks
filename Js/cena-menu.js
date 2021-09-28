export default class cenaMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "Menu"
        });
    }
    preload() {
    }

    create(volume) {
        this.volMax = 0.15
        this.vol = 10

        if (!(volume >= 0 && volume <= 1))
            volume = this.volMax;
        else
            this.vol = Math.trunc(((volume * 10) / this.volMax) + 0.1);

        this.add.image(0, 0, 'backg').setOrigin(0, 0);
        const playButton = this.add.image(450, 400, 'Play3').setFrame(0);
        playButton.setInteractive({ cursor: 'pointer' })

        playButton.on('pointerover', () => {
            playButton.setFrame(1)
        })
        playButton.on('pointerout', () => {
            playButton.setFrame(0)
        })

        playButton.on('pointerdown', () => {
            //iniciar jogo...
            this.scene.start("Escolha", this);
            this.scene.stop();
        })

        var confButton = this.add.text(340, 480, 'Configurações do volume');
        var cerdButton = this.add.text(400, 520, 'Creditos');
        confButton.setInteractive({ cursor: 'pointer' })
        cerdButton.setInteractive({ cursor: 'pointer' })

        confButton.on('pointerover', () => {
            confButton.setTint(0x000000);
        })
        confButton.on('pointerout', () => {
            confButton.setTint(0xffffff);
        })

        cerdButton.on('pointerover', () => {
            cerdButton.setTint(0x000000);
        })
        cerdButton.on('pointerout', () => {
            cerdButton.setTint(0xffffff);
        })

        confButton.on('pointerdown', () => {
            this.scene.start("Configuracoes", this);
            this.scene.stop();
        })

        cerdButton.on('pointerdown', () => {
            this.scene.start("Creditos", this.music.volume);
            this.scene.stop();
            this.music.destroy();
        })
        this.music = this.sound.add("Bleach", {
            mute: false,
            volume: volume,
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