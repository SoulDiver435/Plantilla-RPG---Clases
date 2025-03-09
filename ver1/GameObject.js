class GameObject {
    constructor(config){
        this.x= config.x || 0;
        this.y= config.y || 0;
        this.direccion= config.direccion || "abajo";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "img/spritesheet_bluya.png"
        })


    }
}