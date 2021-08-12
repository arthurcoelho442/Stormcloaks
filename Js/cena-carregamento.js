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
            this.scene.start("Menu");
        });

        //Carregamento das imagens
        this.load.image('backg', 'Imagens/Menu_principal_sem_torre.png')
        this.load.image('play', 'Imagens/Botao de play_1.png')
        this.load.image('play2', 'Imagens/Botao de play_2.png')

        this.load.image("Mapa-Teste", "Imagens/Test_map_grid.png");
        this.load.image("Mapa-1", "Imagens/Mapa_1.png");
        this.load.image("Mapa-2", "Imagens/Mapa_2.png");
        this.load.image("Mapa-3", "Imagens/Mapa_3.png");
        this.load.image("Mapa-4", "Imagens/Mapa_4.png");
        this.load.image("Torre-Teste", "Imagens/Tower_test.png");
        this.load.image("Tiro-Teste", "Imagens/Projectile_test.png")
        this.load.image("Grid", "Imagens/Grid.png");
        this.load.image("Coin", "Imagens/OdaraCoin.png");
        this.load.image("Vidas", "Imagens/Vidas.png");

        this.load.spritesheet("Tropa", "Imagens/Enemy_with_color.png", { frameWidth: 50, frameHeight: 50 });
    }
}