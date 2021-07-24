export default class cenaNivel_1 extends Phaser.Scene{
    constructor(){
        super({
            key: "Nivel-1"
        });
    }
    preload(){
    }

    create() {
        this.backgroud = this.add.image(0,0,"Mapa");
        this.backgroud.setOrigin(0,0);
    }

    update(){

    }
}