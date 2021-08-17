export default class Tiro {
    constructor(data) {
        let { cena, x, y, imagem, velocidade, dano, angulo, target } = data;
        this.sprite = cena.physics.add.sprite(x, y, imagem);
        this.cena = cena;
        this.imagem = imagem;
        this.velocidade = velocidade;
        this.dano = dano;
        this.tempoDeVida = 600;
        this.sprite.angle = angulo;
        this.alive = true;
        this.target = target;
    }

    // conta tempo pra sumir caso não colida com uma tropa
    update(time, delta) {
        if (this.alive) {
            if (this.sprite.body && this.sprite.body != undefined) {
                this.cena.physics.moveToObject(this.sprite, this.target.sprite, this.velocidade);
                if (this.target.vida <= 0 && this.alive) {
                    this.alive = false;
                    this.sprite.destroy();
                }
            }
    
            this.tempoDeVida -= delta;
    
            if (this.tempoDeVida <= 0) {
                this.alive = false;
                this.sprite.destroy();
            }
        }
    }
}