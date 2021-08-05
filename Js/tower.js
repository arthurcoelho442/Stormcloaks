export default class Torre extends Phaser.GameObjects.Container {
    constructor(data) {
        let { cena, x, y, imagem, raio } = data;
        let sprite = new Phaser.GameObjects.Sprite(cena, 0, 0, imagem);
        super(cena, x, y, [sprite]);
        this.cena = cena
        this.sprite = sprite;
        this.raio = raio;
        this.cena.add.existing(this);
        this.fireRate = 640; // o tempo de recarga total
        this.currFireRate = this.fireRate; // o contador do tempo de recarga
        this.shots = []
    }

    // acompanha a tropa
    trackEnemy(x, y) {
        const angle = Math.atan2(y - this.y, x - this.x) * 180 / Math.PI; // acha o angulo em deg entre a tropa no raio 
        this.angle = angle + 90;
    }

    // cuida de chamar a função de atirar
    update(time, delta) {
        this.currFireRate -= delta;
        if (this.currFireRate <= 0) {
            this.currFireRate = this.fireRate;
            return true;
        } else {
            return false;
        }
    }
}