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
        console.log(this.vol, volume);

        this.add.image(0,0,'backg').setOrigin(0, 0);
        const playButton = this.add.image(460,350,'play')
        playButton.setInteractive({ cursor: 'pointer' })

        playButton.on('pointerover', () => {
            this.add.image(460,350,'play2')
        })
        playButton.on('pointerout', () => {
            this.add.image(460,350,'play')
        })

        playButton.on('pointerdown', () => {
            //iniciar jogo...
            this.scene.start("Escolha", this);
            this.scene.stop();
        })

        const confButton = this.add.text(400, 385, 'Configurações');
        const scoreButton = this.add.text(420, 410, 'Creditos');
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
        this.music = this.sound.add("Zelda-1", {
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