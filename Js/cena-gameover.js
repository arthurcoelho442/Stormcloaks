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
        this.textVidas = this.add.text(630, 625, "-");
        this.textDinheiro = this.add.text(490, 625, "-");
        
        this.backgroud = this.add.image(580, 610, "Vidas").setOrigin(0, 0).setScale(0.7, 0.7);
        this.backgroud = this.add.image(440, 610, "Coin").setOrigin(0, 0).setScale(0.044, 0.044);
        this.backgroud = this.add.image(830, 610, "Home").setOrigin(0, 0).setScale(0.7, 0.7);
        this.backgroud = this.add.image(710, 610, "Reset").setOrigin(0, 0).setScale(0.7, 0.7);
        this.backgroud = this.add.sprite(770, 610, "Play_Pause", 1).setOrigin(0, 0).setScale(0.7, 0.7);


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