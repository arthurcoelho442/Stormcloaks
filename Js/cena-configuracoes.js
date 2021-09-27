export default class cenaConfiguracoes extends Phaser.Scene{
    constructor(){
        super({
            key: "Configuracoes"
        });
    }

    preload(){
    }
    
    create(cena){
        this.add.image(0,0,'backg').setOrigin(0, 0);

        this.add.text(315, 400, 'Volume principal', {font: '600 25px Poppins'});

        const reg = this.add.image(400, 450, 'Regulagem-Volume').setFrame(cena.vol);
        const plus = this.add.image(665, 450, 'plusMine').setScale(0.75, 0.75);
        const mine = this.add.image(715, 450, 'plusMine').setScale(0.75, 0.75).setFrame(1);

        const back =  this.add.text(450,575, 'Voltar', {font: '600 25px Poppins'});

        mine.setInteractive({ cursor: 'pointer' });
        plus.setInteractive({ cursor: 'pointer' });

        back.setInteractive();

        mine.on('pointerdown', () => {
            if(cena.vol > 0){
                cena.vol--;
                cena.music.volume = cena.volMax*cena.vol/10;
                reg.setFrame(cena.vol);
            }
        })
        
        plus.on('pointerdown', () => {
            if(cena.vol < 10){
                cena.vol++;
                cena.music.volume = cena.volMax*cena.vol/10;
                reg.setFrame(cena.vol);
            }
        })

        back.on('pointerdown', () => {
            this.scene.start("Menu", cena.music.volume);
            this.scene.stop();
            cena.music.destroy();
        }, this)
    }

    update(){
    }
}