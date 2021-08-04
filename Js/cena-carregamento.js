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

        //Carregamento das imagens
        this.load.image("Mapa-Teste", "Imagens/Test_map_grid.png");
        this.load.image("Mapa-1", "Imagens/Mapa_1.png");
        this.load.image("Mapa-2", "Imagens/Mapa_2.png");
        this.load.image("Mapa-3", "Imagens/Mapa_3.png");
        this.load.image("Mapa-4", "Imagens/Mapa_4.png");
        this.load.image("Torre-Teste", "Imagens/Tower_test.png");
        this.load.image("Tiro-Teste", "Imagens/Projectile_test.png")
        this.load.image("Grid", "Imagens/Grid.png");

        this.load.spritesheet("Tropa-1", "Imagens/Enemy_test.png", { frameWidth: 23, frameHeight: 23 });
    }
}