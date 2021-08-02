import Torre from "./tower.js"

export default class TorreDraggable extends Torre {
    constructor(data) {
        let { ondragend } = data;
        super(data);
        this.originalX = this.x;
        this.originalY = this.y;
        this.draggable = true;
        this.dragging = false;
        this.ondragend = ondragend;
        this.setSize(this.sprite.width, this.sprite.height);
        this.setInteractive();
        this.cena.input.setDraggable(this);
        this.cena.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (!this.draggable) return;
            this.dragging = true;
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        this.cena.input.on('dragend', (pointer, gameObject) => {
            this.dragging = false;
            gameObject.ondragend(pointer, gameObject)
        })
    }
}