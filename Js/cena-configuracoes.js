export default class cenaConfiguracoes extends Phaser.Scene{
    constructor(){
        super({
            key: "Configuracoes"
        });
    }

    preload()
    {
        this.load.image('backg', 'Imagens/Menu_principal_sem_torre.png')
    }
    
    create()
    {
        this.add.image(400,300,'backg');

        this.add.text(350, 300, 'Volume principal');
        const plusVp = this.add.text(400, 350, '+');
        const minusVp = this.add.text(450, 350, '-');
        this.add.text(350, 400, 'Volume dos efeitos');
        const plusVe = this.add.text(400, 450, '+');
        const minusVe = this.add.text(450, 450, '-');
        const back =  this.add.text(400,500, 'Voltar');

        plusVp.setInteractive();
        minusVp.setInteractive();
        plusVe.setInteractive();
        minusVe.setInteractive();
        back.setInteractive();

        plusVp.on('pointerdown',() => {

        })
        minusVp.on('pointerdown',() => {
            
        })
        plusVe.on('pointerdown',() => {
            
        })
        minusVe.on('pointerdown',() => {
            
        })
        back.on('pointerdown', () => {
            this.scene.start("Menu");
        })
    }

    update()
    {

    }
}