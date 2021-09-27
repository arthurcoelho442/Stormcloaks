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
        var borda=this.add.image('Borda');
        nivel1.setInteractive({ cursor: 'pointer' });
        nivel2.setInteractive({ cursor: 'pointer' });
        nivel3.setInteractive({ cursor: 'pointer' });
        nivel4.setInteractive({ cursor: 'pointer' });


        nivel1.on('pointerover', () => {
        borda=this.add.image(410,210,'Borda').setScale(.8,.8);
        });
        nivel1.on('pointerout', () => {
            borda.destroy();
            borda=null;
        });

        nivel2.on('pointerover', () => {
        borda=this.add.image(410,310,'Borda').setScale(.8,.8);;
        });
        nivel2.on('pointerout', () => {
            borda.destroy();
            borda=null;
        });

        nivel3.on('pointerover', () => {
        borda=this.add.image(410,410,'Borda').setScale(.8,.8);;
        });
        nivel3.on('pointerout', () => {
            borda.destroy();
            borda=null;
        });

        nivel4.on('pointerover', () => {
        borda=this.add.image(410,510,'Borda').setScale(.8,.8);;
        });
        nivel4.on('pointerout', () => {
            borda.destroy();
            borda=null;
        });

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