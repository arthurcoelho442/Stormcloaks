import Tropa from "./tropa.js";
export default class Wave{
    constructor(cena, vida, qtdTropas, velocidade, xTropa, yTropa, distanciarPor, imgTropa){
        this.cena = cena;
        this.tropas = new Array(qtdTropas);
        this.velocidade = velocidade;
        this.qtdTropas = qtdTropas;
        this.vidaTropas = vida;
        const distTropas = 50;
        if(distanciarPor == "Esquerda")
            for(let i=0;i<qtdTropas;i++)
                this.tropas[i] = new Tropa(cena, xTropa-distTropas*i, yTropa, vida, imgTropa);
        else if(distanciarPor == "Direita")
            for(let i=0;i<qtdTropas;i++)
                this.tropas[i] = new Tropa(cena, xTropa+distTropas*i, yTropa, vida, imgTropa);
        else if(distanciarPor == "Cima")
            for(let i=0;i<qtdTropas;i++)
                this.tropas[i] = new Tropa(cena, xTropa, yTropa-distTropas*i, vida, imgTropa);
        else if(distanciarPor == "Baixo")
            for(let i=0;i<qtdTropas;i++)
                this.tropas[i] = new Tropa(cena, xTropa, yTropa+distTropas*i, vida, imgTropa);
    }
    setColor(i){
        this.tropas.forEach((tropa) => {
            const sprite = tropa.sprite
            const img = 'Tropa-' + i;
            sprite.anims.play(img, true);
        });
    }
    destroi(pos){
        this.tropas[pos].destroi();
        this.tropas[pos] = null;
    }
}