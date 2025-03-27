class Player extends GameObject{
    constructor(config){
        super(config)
        // this.x
        // this.y 
        // this.sprite
        // this.direccion
        this.movRestante= 0;
        
        this.actualizacionDireccion= {
            "arriba": ["y",-1],
            "abajo": ["y",1],
            "izquierda": ["x",-1],
            "derecha": ["x",1],
          };

    }

    actualizarPlayer(estado){
        if(estado.map.mostrarMensaje){
            return
        }

        // this.actualizarSprite()
        // this.actualizarPosicionPlayer(estado);
        
        // if(this.movRestante === 0 && estado.flecha){
        //     this.direccion = estado.flecha;
            
        //     if(estado.map.estaEspacioOcupado(this.x, this.y, estado.flecha)){
        //         return
        //     }
        //     this.movRestante=16;
            
        // }

        if(this.movRestante> 0){
            this.actualizarPosicionPlayer();
        }else{
            //Tecla presionada
            if(!estado.map.isCutScenePlaying && estado.flecha){
                this.iniciarComportamiento(estado, {
                    tipo: "caminar",
                    direccion: estado.flecha
                });
            }
            this.actualizarSprite(estado)
        }
    }

    iniciarComportamiento(estado, comportamiento){
        this.direccion = comportamiento.direccion;
        if(comportamiento.tipo === "caminar"){
            if(estado.map.estaEspacioOcupado(this.x, this.y, this.direccion)){
                comportamiento.reintentar && setTimeout(() => {
                    this.iniciarComportamiento(estado,comportamiento)
                }, 10);
                return;
            }

            //Listo para caminar
            estado.map.moverPared(this.x, this.y, this.direccion);
            this.movRestante= 16;
            this.actualizarSprite(estado)
        }
    }

    verificarPuertas(estado){
        const pos = utils.coordCelda(this.x / 16, this.y / 16);
        if (estado.map.puertas[pos]) {
            estado.overworld.cambiarMapa(estado.map.puertas[pos]);
        }
    }

    actualizarPosicionPlayer(estado){

            const [propiedad,cambio] = this.actualizacionDireccion[this.direccion];
            this[propiedad] += cambio;
            this.movRestante -=1;
    }

    actualizarSprite(){
        if (this.movRestante > 0) {
            this.sprite.prepararAnimacion("caminar-" + this.direccion);
            return;
          }
          this.sprite.prepararAnimacion("quieto-" + this.direccion);
    }

  
}