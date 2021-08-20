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
        button.setInteractive({ cursor: 'pointer' });

        button.once('pointerdown', function () {
            this.scene.resume(cena);
            this.scene.stop();
        }, this);
        this.cena = cena;
        
        //On hover da descrição das torres
        for (let i = 0; i < 4; i++) {
            let torre = this.add.sprite(850, 100 + 60 * i, "Menu-Icon-" + String(i + 1), 0);
            torre.setInteractive({ cursor: 'pointer' });
            var descricao;

            torre.on('pointerover', () => {
                descricao = this.add.image(814, 35 + 60 * i, "Descricao-"+ String(i + 1));
            })
            torre.on('pointerout', () => {
                descricao.destroy();
            })
        }
        //Inicio Home
        var home = this.add.image(830, 610, "Home").setOrigin(0, 0).setScale(0.7, 0.7);
        home.setInteractive({ cursor: 'pointer' });
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
        reset.setInteractive({ cursor: 'pointer' });
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
    }

    update() {
    }
}