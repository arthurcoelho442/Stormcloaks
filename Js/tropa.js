export default class Tropa{
    constructor(cena, xTropa, yTropa, vida, imgTropa){
        this.xTropa = xTropa;
        this.yTropa = yTropa;
        this.vida = vida;
        this.cena = cena;
        this.loop = false;
        this.sprite =  cena.physics.add.sprite(this.xTropa, this.yTropa, imgTropa);
    }
    destroi(){
        this.sprite.destroy();
    }
}