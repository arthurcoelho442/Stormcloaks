console.log("[DevArthur] Tower Defender");

const mapaTeste = new Image();
mapaTeste.src = '/Imagens/./Test_map_grid.png';
const imgTropa  = new Image();
imgTropa.src = '/Imagens/./Enemy_test.png';

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

//Fundo
const fundo = {
    spriteX: 0,
    spriteY: 0,
    altura: 600,
    largura: 800,
    xFundo: 0,
    yFundo: 0,
    desenha(){
        contexto.drawImage(
            mapaTeste, // Imagem
            fundo.spriteX, fundo.spriteY, // Sprite x e Y
            fundo.largura, fundo.altura, // Tamanho a ser recortado da imagem
            fundo.xFundo, fundo.yFundo, // Local que sera colocado
            fundo.largura, fundo.altura, // proporção a ser printado no canva
        );
    }
}

//Tropa
const tropa = {
    spriteX: 0,
    spriteY: 0,
    altura: 23,
    largura: 23,
    xTropa: 12.5,
    yTropa: 262.5,
    atualiza() {
        tropa.xTropa++;
    },
    desenha() {
        contexto.drawImage(
            imgTropa, // Imagem
            tropa.spriteX, tropa.spriteY, // Sprite x e Y
            tropa.largura, tropa.altura, // Tamanho a ser recortado da imagem
            tropa.xTropa, tropa.yTropa, // Local que sera colocado
            tropa.largura, tropa.altura, // proporção a ser printado no canva
        );
    }
}



function loop() {
    fundo.desenha();
    
    tropa.desenha();
    tropa.atualiza();

    requestAnimationFrame(loop);
}

loop();