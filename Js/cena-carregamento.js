export default class cenaCarregamento extends Phaser.Scene{
    constructor(){
        super({
            key: "Carregamento"
        });
    }
    preload(){
        const larguraJogo = this.sys.canvas.width;
        const barraDeProgresso = this.add.graphics();

        //Barra de Progresso
        const larguraBarra = 0.8 * larguraJogo;
        this.load.on('progress', (value) => {
            barraDeProgresso.clear();
            // barra branca preenchida
            barraDeProgresso.fillStyle(0xffffff, 1);
            barraDeProgresso.fillRect((larguraJogo - larguraBarra) / 2, this.sys.game.config.height / 2, larguraBarra * value, 20);
            // contorno amarelo
            barraDeProgresso.lineStyle(4, 0xffff00, 1);
            barraDeProgresso.strokeRect((larguraJogo - larguraBarra) / 2, this.sys.game.config.height / 2, larguraBarra, 20);
        });


        this.load.on("complete", () => {
            this.scene.start("Nivel-1");
        });

        this.load.image("Tropa", "Imagens/Enemy_test.png")
        this.load.image("Mapa", "Imagens/Test_map_grid.png")
    }
}