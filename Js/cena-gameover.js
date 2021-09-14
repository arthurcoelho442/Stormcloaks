export default class cenaGameover extends Phaser.Scene {
    constructor() {
        super({
            key: "Gameover"
        });
    }
    preload() {

    }

    create(n) {
        this.backgroud = this.add.image(0, 0, "Mapa-"+String(n)).setOrigin(0, 0);
        this.menuLateral = this.add.image(800, 0, "Menu-Lateral").setOrigin(0, 0);
        
        this.add.image(550, 610, "Vidas").setOrigin(0, 0).setScale(0.7, 0.7);
        this.add.image(390, 610, "Coin").setOrigin(0, 0).setScale(0.044, 0.044);
        this.bmpText = this.add.bitmapText(50, 622, 'carrier_command','Map '+String(n)+'  Wave',16);
        this.textVidas = this.add.bitmapText(610, 622, 'carrier_command',"-",16);
        this.textDinheiro = this.add.bitmapText(450, 622, 'carrier_command',"-",16);
        this.textWave = this.add.bitmapText(270, 622, 'carrier_command',"-",16);



        this.bmpText.inputEnabled = true;
        this.textVidas.inputEnabled = true;
        this.textDinheiro.inputEnabled = true;
        this.textWave.inputEnabled = true;

        for(let i = 0; i<4; i++)
            this.add.image(850,  100 + 60 * i, "Menu-Icon-"+ String(i + 1));
        
        this.add.text(200, 190, "Game Over!", { fontSize: 60, color: 'red' });
        const buttonMenu = this.add.text(350, 300, "Menu inicial");
        const buttonScore = this.add.text(350, 350, "Pontuações");

        buttonMenu.setInteractive();
        buttonScore.setInteractive();

        buttonMenu.on('pointerdown', () => {
            this.scene.start("Menu");
            this.scene.stop();
        })
        buttonScore.on('pointerdown', () => {

        })
    }

    update() {

    }
}