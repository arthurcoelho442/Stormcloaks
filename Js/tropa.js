export default class Tropa{
    constructor(cena, xTropa, yTropa){
        this.xTropa = xTropa;
        this.yTropa = yTropa;
        this.cena = cena;
        this.sprite =  cena.physics.add.sprite(this.xTropa, this.yTropa, "Tropa");
        this.vida = 10000;
    }
}