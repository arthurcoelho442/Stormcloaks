export default class Tiro {
    constructor(data) {
        let { cena, x, y, imagem, velocidade, dano, angulo} = data;
        this.sprite = cena.physics.add.sprite(x, y, imagem);
        this.cena = cena;
        this.imagem = imagem;
        this.velocidade = velocidade;
        this.dano = dano;
        this.angulo = angulo;
        this.tempoDeVida = 600;
        this.dx = 0;
        this.dy = 0;
        // this.cena.add.existing(this);
    }

    update(time, delta, x, y) {
        if (this != undefined && this.sprite.scene != undefined) {
            console.log('targets: ' + x.toString() + ', ' + y.toString())
            console.log('current position: ' + this.sprite.getCenter().x.toString() + ', ' + this.sprite.getCenter().y.toString())
            this.sprite.angle = 90 + Math.atan2(y - this.sprite.getCenter().y, x - this.sprite.getCenter().x) * 180 / Math.PI; // menos passos que na implementação da torre
            console.log('angle: ' + this.sprite.angle.toString())
            this.dx = Math.cos(this.sprite.angle);
            this.dy = Math.sin(this.sprite.angle);
            this.sprite.setVelocityX(this.dx * 600)
            this.sprite.setVelocityY(this.dy * 600)
            this.tempoDeVida -= delta;
            console.log(this.sprite.getCenter().x, this.sprite.getCenter().y)
        }

        if (this.tempoDeVida <= 0)
            {
                this.sprite.destroy();
            }
    }
}