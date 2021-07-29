import Tropa from "./tropa.js";
export default class Wave{
    constructor(cena, vida, qtdTropas, velocidade, xTropa, yTropa, distanciarPelo, imgTropa){
        this.cena = cena;
        this.tropas = new Array(qtdTropas);
        this.velocidade = velocidade;
        if(distanciarPelo == "X" || distanciarPelo == "x")
            for(let i=0;i<qtdTropas;i++)
                this.tropas[i] = new Tropa(cena, xTropa-50*i, yTropa, vida, imgTropa);
        else if((distanciarPelo == "Y" || distanciarPelo == "y"))
            for(let i=0;i<qtdTropas;i++)
                this.tropas[i] = new Tropa(cena, xTropa, yTropa-50*i, vida, imgTropa);
    }
    destroi(pos){
        this.tropas[pos].destroi();
        this.tropas[pos] = null;
    }
}