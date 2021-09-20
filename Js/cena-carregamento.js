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
        this.load.image("Grid", "Imagens/Grid.png");

        this.load.image("Torre-Teste", "Imagens/Tower_test.png");
        this.load.image("Tiro-Teste", "Imagens/Projectile_test.png")

        this.load.image("Coin", "Imagens/OdaraCoin.png");
        this.load.image("Vidas", "Imagens/life.png");
        this.load.image("Home", "Imagens/home_buttom.png");
        this.load.spritesheet("Play_Pause", "Imagens/Play_Pause.png", { frameWidth: 60, frameHeight: 60 });
        this.load.image("Reset", "Imagens/reset_buttom.png");

        this.load.image("Menu-Lateral", "Imagens/Menu_Lateral.png");
        this.load.image("Menu-Icon-1", "Imagens/Menu_Icon_1.png");
        this.load.image("Menu-Icon-2", "Imagens/Menu_Icon_2.png");
        this.load.image("Menu-Icon-3", "Imagens/Menu_Icon_3.png");
        this.load.image("Menu-Icon-4", "Imagens/Menu_Icon_4.png");
        this.load.image("Menu-Icon-8", "Imagens/Menu_Icon_8.png");
        this.load.image("Menu-Icon-9", "Imagens/Menu_Icon_9.png");

        this.load.image("Descricao-1", "Imagens/balão dialogo1.png");
        this.load.image("Descricao-2", "Imagens/balão dialogo2.png");
        this.load.image("Descricao-3", "Imagens/balão dialogo3.png");
        this.load.image("Descricao-4", "Imagens/balão dialogo4.png");

        this.load.image("Torre-1", "Imagens/Tower_1.png");
        this.load.image("Torre-2", "Imagens/Tower_2.png");
        this.load.image("Torre-3", "Imagens/Tower_3.png");
        this.load.image("Torre-4", "Imagens/Tower_4.png");

        this.load.image("Explosive-Shot", "Imagens/Explosive_shot.png");
        this.load.image("Slow-Shot", "Imagens/Slow_shot.png");

        this.load.audio('WC3-Orc', "Music/Warcraft 3 Soundtrack (Blackrock & Roll)_160k.mp3");
        this.load.audio('WC3-Human', "Music/Warcraft 3 Soundtrack (Lordaeron Fall)_160k.mp3");
        this.load.audio('WC3-NElf', "Music/Warcraft 3 Soundtrack (Night Elf)_160k.mp3");
        this.load.audio('WC3-Undead', "Music/Warcraft 3 Soundtrack - (Undead)_160k.mp3")
        this.load.audio('Pokemon', "Music/Poke & Chill_160k.mp3")

        this.load.spritesheet("Tropa", "Imagens/Enemy_sheet_completaV4.png", { frameWidth: 21, frameHeight: 22 });
        this.load.image("Torre-do-Nivel", "Imagens/kings_tower.png");
        
        this.load.image("Creditos-01", "Imagens/Creditos.png");
        this.load.image("Creditos-02", "Imagens/Créditos.png");

        this.load.spritesheet("Explosion", "Imagens/Explosion.png", { frameWidth: 50, frameHeight: 50});

        this.load.image("QuadradoSelecao", "Imagens/selectedTroop.png")

        this.load.bitmapFont('carrier_command', 'Imagens/Fontes/carrier_command.png', 'Imagens/Fontes/carrier_command.xml');
    }
}