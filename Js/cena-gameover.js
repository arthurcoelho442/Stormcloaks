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
        this.backgroud = this.add.image(55, 610, "Vidas").setOrigin(0, 0).setScale(0.1, 0.1);
        this.textVidas = this.add.text(105, 622, "-");
        this.backgroud = this.add.image(665, 615, "Coin").setOrigin(0, 0).setScale(0.028, 0.028);
        this.textDinheiro = this.add.text(705, 622, "-");

        for(let i = 0; i<4; i++)
            this.add.image(850,  100 + 60 * i, "Menu-Icon-"+ String(i + 1));
        
        this.add.text(200, 190, "Game Over!", { fontSize: 60, color: 'red' });
        const buttonMenu = this.add.text(350, 300, "Menu inicial");
        const buttonScore = this.add.text(350, 350, "Pontuações");

        buttonMenu.setInteractive();
        buttonScore.setInteractive();

        buttonMenu.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start("Menu");
        })
        buttonScore.on('pointerdown', () => {

        })
    }

    update() {

    }
}