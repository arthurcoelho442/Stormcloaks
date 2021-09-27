export default class cenaEscolha extends Phaser.Scene
{
    constructor(){
        super({
            key: "Escolha"
        });
    }

    preload()
    {

    }

    create(cena)
    {
        this.add.text(200, 80, "Escolha o nível: ", {fontSize: 45, color: 'green'});

        const nivel1 = this.add.text(350, 200, "Nível 1", {fontSize: 30});
        const nivel2 = this.add.text(350, 300, "Nível 2", {fontSize: 30});
        const nivel3 = this.add.text(350, 400, "Nível 3", {fontSize: 30});
        const nivel4 = this.add.text(350, 500, "Nível 4", {fontSize: 30});

        nivel1.setInteractive({ cursor: 'pointer' });
        nivel2.setInteractive({ cursor: 'pointer' });
        nivel3.setInteractive({ cursor: 'pointer' });
        nivel4.setInteractive({ cursor: 'pointer' });

        nivel1.on('pointerdown', () => {
            this.scene.start("Nivel-1", cena.music.volume);
            this.scene.stop();
            cena.music.destroy();
        });
        nivel2.on('pointerdown', () => {
            this.scene.start("Nivel-2", cena.music.volume);
            this.scene.stop();
            cena.music.destroy();
        });
        nivel3.on('pointerdown', () => {
            this.scene.start("Nivel-3", cena.music.volume);
            this.scene.stop();
            cena.music.destroy();
        });
        nivel4.on('pointerdown', () => {
            this.scene.start("Nivel-4", cena.music.volume);
            this.scene.stop();
            cena.music.destroy();
        });
    }

    update()
    {

    }
}