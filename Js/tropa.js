export default class Tropa{
    constructor(cena, xTropa, yTropa, vida){
        this.xTropa = xTropa;
        this.yTropa = yTropa;
        this.vida = vida;
        this.cena = cena;

        this.sprite =  cena.physics.add.sprite(this.xTropa, this.yTropa, "Tropa");
    }
    destroi(){
        this.sprite.destroy();
    }
}