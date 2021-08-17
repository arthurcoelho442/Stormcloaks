import Torre from "./tower.js"

export default class TorreDraggable extends Torre {
    constructor(data) {
        let { map, id, ondragend } = data;
        super(data);
        this.originalX = this.x;
        this.originalY = this.y;
        this.map = map;
        this.id = id;
        this.draggable = true;
        this.dragging = false;
        this.ondragend = ondragend;
        this.setSize(this.sprite.width, this.sprite.height);
        this.setInteractive();
        this.cena.input.setDraggable(this);
        this.cena.input.on('drag', (pointer, gameObject, dragX, dragY) => { // função "on drag" do Phaser
            if (!this.draggable) return;
            this.dragging = true;

            if (dragX < 800 && dragY < 600) {   // só faz o snap dentro do canvas
                dragX = Math.ceil(dragX/50) * 50 - 25
                dragY = Math.ceil(dragY/50) * 50 - 25
            }
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        this.cena.input.on('dragend', (pointer, gameObject) => { // função "on drag end" do Phaser (que chama a nossa função ondragend)
            this.dragging = false;
            gameObject.ondragend(this.cena, this.map, this.id);
        })
    }
}