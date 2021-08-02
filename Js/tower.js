export default class Torre extends Phaser.GameObjects.Container{
    constructor(data) {
        let { cena, x, y, imagem} = data;
        let sprite = new Phaser.GameObjects.Sprite(cena, 0, 0, imagem);
        super(cena, x, y, [sprite]);
        this.cena = cena
        this.sprite = sprite;

        this.cena.add.existing(this);
    }
}