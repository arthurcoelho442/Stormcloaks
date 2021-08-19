export default class cenaPause extends Phaser.Scene{
    constructor() {
        super({
            key: "Pause"
        });
    }
    preload() {

    }

    create(cena) {
        var button = this.add.sprite(770, 610, "Play_Pause", 0).setOrigin(0, 0).setScale(0.7, 0.7);
        button.setInteractive();

        button.once('pointerdown', function () {
            this.scene.resume(cena);
            this.scene.stop();
        }, this);
        this.cena = cena;
    }

    update() {
        //Inicio Home
        var home = this.add.image(830, 610, "Home").setOrigin(0, 0).setScale(0.7, 0.7);
        home.setInteractive();
        home.once('pointerdown', function () {
            this.cena.music.mute = true;
            this.cena.vida = this.cena.vidaMax;
            this.cena.dinheiro = this.cena.dinheiroMax;
            this.cena.pontuacao = 0;
            this.cena.waveCounter = 0;

            this.cena.scene.start("Menu");
            this.cena.scene.stop();
            this.scene.stop();
        }, this);
        //Fim Home
        //Inicio Reset
        var reset = this.add.image(710, 610, "Reset").setOrigin(0, 0).setScale(0.7, 0.7);
        reset.setInteractive();
        reset.once('pointerdown', function () {
            this.cena.music.mute = true;
            this.cena.vida = this.cena.vidaMax;
            this.cena.dinheiro = this.cena.dinheiroMax;
            this.cena.pontuacao = 0;
            this.cena.waveCounter = 0;

            this.cena.scene.restart();
            this.scene.stop();
        }, this);
        //Fim Reset

        //On hover da descrição das torres
        /* const torres = this.cena.torreCompra;
        torres.forEach((torreCompra) => {
            var descricao;
            torreCompra.on('pointerover', () => {
                descricao = this.add.image(torreCompra.originalX-36, torreCompra.originalY-65, "Descricao-"+ String(torreCompra.id + 1));
            })
            torreCompra.on('pointerout', () => {
                descricao.destroy();
            })
        }) */
    }
}