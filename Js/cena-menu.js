export default class cenaMenu extends Phaser.Scene{
    constructor(){
        super({
            key: "Menu"
        });
    }
    preload() {
    }

    create(volume) {
        this.volMax = 0.15
        this.vol = 10

        if(!(volume >=0 && volume <= 1))
        volume = this.volMax;
        else
            this.vol = Math.trunc(((volume*10)/this.volMax)+0.1);

        this.add.image(0,0,'backg').setOrigin(0, 0);
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

        const confButton = this.add.text(330, 460, 'Configurações do volume');
        const scoreButton = this.add.text(400, 490, 'Creditos');
        confButton.setInteractive({ cursor: 'pointer' })
        scoreButton.setInteractive({ cursor: 'pointer' })

        confButton.on('pointerdown', () => {
            this.scene.start("Configuracoes", this);
            this.scene.stop();
        })

        scoreButton.on('pointerdown', () => {
            this.scene.start("Creditos", this.music.volume);
            this.scene.stop();
            this.music.destroy();
        })
        this.music = this.sound.add("Pokemon", {
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