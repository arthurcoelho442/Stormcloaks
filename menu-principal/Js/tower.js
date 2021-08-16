export default class Torre extends Phaser.GameObjects.Container{
    constructor(data) {
        let { cena, x, y, imagem, raio} = data;
        let sprite = new Phaser.GameObjects.Sprite(cena, 0, 0, imagem);
        super(cena, x, y, [sprite]);
        this.cena = cena
        this.sprite = sprite;
        this.raio = raio;
        this.cena.add.existing(this);
    }

    trackEnemy(x, y) {
        const angle = Math.atan2(y - this.y, x - this.x) * 180 / Math.PI;
        this.angle = angle + 90;
    }
}