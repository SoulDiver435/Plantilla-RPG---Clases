class Sprite {
    constructor(config){
        this.image= new Image();
        this.image.src= config.src;
        this.image.onload= () =>{
            this.estaCargada= true;
        }
        this.gameObject = config.gameObject;
    }

    dibujarSprite(ctx){

        const x =this.gameObject.x - 8
        const y =  this.gameObject.y - 16
        this.estaCargada && ctx.drawImage(this.image,
            0,0,
            32,32,
            x,
            y,
            32,32

        )
    }
}