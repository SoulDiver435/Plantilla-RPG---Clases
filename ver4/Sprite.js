class Sprite {
    constructor(config){
        this.image= new Image();
        this.image.src= config.src;
        this.image.onload= () =>{
            this.estaCargada= true;
        };
        this.animaciones = {
            "quieto-arriba": [[0,1]],
            "caminar-arriba": [[0,1],[1,1],[2,1],[3,1]],
            "quieto-abajo": [[0,0]],
            "caminar-abajo": [[0,0],[1,0],[2,0],[3,0]],
            "quieto-derecha": [[1,3]],
            "caminar-derecha": [[0,3],[1,3],[2,3],[3,3]],
            "quieto-izquierda": [[0,2]],
            "caminar-izquierda": [[0,2],[1,2],[2,2],[3,2]]
          };
        this.animActual = "quieto-abajo";
        this.frameActual =0;
        this.limiteTicksAnim= 11;
        this.ticks= this.limiteTicksAnim;

        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animaciones[this.animActual][this.frameActual];
      }

    prepararAnimacion(key){
        if(this.animActual !==key){
            this.animActual = key;
            this.frameActual= 0;
            this.ticks = this.limiteTicksAnim;
        }
    }

    actualizarAnimacion(){
        if(this.ticks > 0){
            this.ticks --;
            return
        }

        this.ticks = this.limiteTicksAnim;
        this.frameActual +=1;

        if(this.frameActual >= this.animaciones[this.animActual].length){
            this.frameActual= 0;
        }
    }

    dibujarSprite(ctx, personaCamara){
        const x = this.gameObject.x - 8 + utils.conCelda(6) - personaCamara.x;
        const y = this.gameObject.y - 16 + utils.conCelda(4.5)- personaCamara.y


        const [frameX, frameY] = this.frame;

        this.estaCargada && ctx.drawImage(this.image,
            frameX*32,frameY*32,
            32,32,
            x,
            y,
            32,32

        )
        this.actualizarAnimacion()
    }
}