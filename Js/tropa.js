export default class Tropa{
    constructor(cena, distTropa){
        const xTropa = -80-distTropa;
        const yTropa  = 262.5;
        this.cena = cena;
        this.sprite =  cena.physics.add.sprite(xTropa, yTropa, "Tropa").setOrigin(0,0);
        this.sprite.setBounce(0.2);
        this.vida = 10000;
    }
}