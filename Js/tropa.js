export default class Tropa{
    constructor(cena, xTropa, yTropa, vida, imgTropa){
        this.xTropa = xTropa;
        this.yTropa = yTropa;
        this.vida = vida;
        this.vidaMax = vida;
        this.cena = cena;
        this.loop = false;
        this.sprite =  cena.physics.add.sprite(this.xTropa, this.yTropa, imgTropa);
        this.sprite.body.setCircle(11) // não alinha com a sprite por algum motivo
    }
    destroi(){
        this.sprite.destroy();
    }
}