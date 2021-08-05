export default class Tiro {
    constructor(data) {
        let { cena, x, y, imagem, velocidade, dano, angulo } = data;
        this.sprite = cena.physics.add.sprite(x, y, imagem);
        this.cena = cena;
        this.imagem = imagem;
        this.velocidade = velocidade;
        this.dano = dano;
        this.tempoDeVida = 600;
        this.sprite.angle = angulo;
        this.alive = true;
    }

    // conta tempo pra sumir caso não colida com uma tropa
    update(time, delta) {
        this.tempoDeVida -= delta;

        if (this.tempoDeVida <= 0) {
            this.alive = false;
            this.sprite.destroy();
        }
    }
}