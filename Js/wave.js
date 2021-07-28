import Tropa from "./tropa.js";
export default class Wave{
    constructor(cena, vida, qtdTropas, velocidade, xTropa, yTropa, distanciarPelo){
        this.cena = cena;
        this.tropas = new Array(qtdTropas);
        this.velocidade = velocidade;
        if(distanciarPelo == "X" || distanciarPelo == "x")
            for(let i=0;i<qtdTropas;i++)
                this.tropas[i] = new Tropa(cena, xTropa-80*i, yTropa, vida);
        else if((distanciarPelo == "Y" || distanciarPelo == "y"))
            for(let i=0;i<qtdTropas;i++)
                this.tropas[i] = new Tropa(cena, xTropa, yTropa-80*i, vida);
    }
    destroi(pos){
        this.tropas[pos].destroi();
        this.tropas[pos] = null;
    }
}