export default class cenaConfiguracoes extends Phaser.Scene{
    constructor(){
        super({
            key: "Configuracoes"
        });
    }

    preload(){
    }
    
    create(){
        this.add.image(0,0,'backg').setOrigin(0, 0);

        this.add.text(315, 400, 'Volume principal', {font: '600 25px Poppins'});

        const reg = this.add.image(400, 450, 'Regulagem-Volume');
        const plus = this.add.image(665, 450, 'plusMine').setScale(0.75, 0.75);
        const Mine = this.add.image(715, 450, 'plusMine').setScale(0.75, 0.75).setFrame(1);

        const back =  this.add.text(450,575, 'Voltar', {font: '600 25px Poppins'});

        Mine.setInteractive({ cursor: 'pointer' });
        plus.setInteractive({ cursor: 'pointer' });

        back.setInteractive();

        back.on('pointerdown', () => {
            this.scene.start("Menu");
        })
    }

    update()
    {

    }
}