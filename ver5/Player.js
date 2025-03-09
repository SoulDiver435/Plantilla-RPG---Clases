class Player extends GameObject{
    constructor(config){
        super(config)
        // this.x
        // this.y 
        // this.sprite
        this.movRestante= 0;
        
        this.actualizacionDireccion= {
            "arriba": ["y",-1],
            "abajo": ["y",1],
            "izquierda": ["x",-1],
            "derecha": ["x",1],
          };

    }

    actualizarPlayer(estado){
        this.actualizarSprite()
        this.actualizarPosicionPlayer();
        
        if(this.movRestante === 0 && estado.flecha){
            this.direccion = estado.flecha;
            
            if(estado.map.estaEspacioOcupado(this.x, this.y, estado.flecha)){
                return
            }
            this.movRestante=16;
            
        }
    }

    verificarPuertas(estado){
        const pos = utils.coordCelda(this.x / 16, this.y / 16);
        if (estado.map.puertas[pos]) {
            estado.overworld.cambiarMapa(estado.map.puertas[pos]);
        }
    }

    actualizarPosicionPlayer(){
        if(this.movRestante > 0){
            const [propiedad,cambio] = this.actualizacionDireccion[this.direccion];
            this[propiedad] += cambio;
            this.movRestante -=1;
             

        }
    }

    actualizarSprite(){
        if (this.movRestante > 0) {
            this.sprite.prepararAnimacion("caminar-" + this.direccion);
            return;
          }
          this.sprite.prepararAnimacion("quieto-" + this.direccion);
    }

  
}