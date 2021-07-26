import Tropa from "./tropa.js";
export default class Wave{
    constructor(cena, vida, qtdTropas, velocidade, xTropa, yTropa){
        this.cena = cena;
        this.tropas = new Array(qtdTropas);
        this.velocidade = velocidade;

        for(let i=0;i<qtdTropas;i++)
            this.tropas[i] = new Tropa(cena, xTropa-80*i, yTropa, vida);
    }
    destroi(pos){
        this.tropas[pos].destroi();
        this.tropas[pos] = null;
    }
}