class Npc extends GameObject{
    constructor(config){
        super(config);
        // this.x
        // this.y 
        // this.sprite
        // this.direccion
        this.movRestante= 0;
        this.dialogo= config.dialogo;
        // this.comportamiento= config.comportamiento || [];
        this.movimientoNpc = {
            "arriba": ["y",-1],
            "abajo": ["y",1],
            "izquierda": ["x",-1],
            "derecha": ["x",1],
          }
        // this.tiempoQuieto = 60;
        // this.id= config.id || null

    }

    actualizarNpc(estado){
        if(estado.map.mostrarMensaje){
            return
        }

        if(this.movRestante> 0){
            this.actualizarPosicionNpc();
        }else{
            this.actualizarSpriteNpc(estado)
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
            this.actualizarSpriteNpc(estado)
        }

        if(comportamiento.tipo === "quieto"){
            setTimeout(() => {
                
                utils.emitirEvento("PersonaQuietaCompleto", {
                    quienId: this.id
                })
            }, comportamiento.tiempo);
        }
    }

    actualizarPosicionNpc(estado){

        const [propiedad,cambio] = this.movimientoNpc[this.direccion];
        this[propiedad] += cambio;
        this.movRestante -=1;

        if(this.movRestante === 0){
            if (!this.id) {
                console.warn("NPC no tiene ID asignado!");
                return;
            }
            utils.emitirEvento("PersonaCaminandoCompleto", {
                quienId: this.id
            })
        }
}

    actualizarSpriteNpc(estado){
        if(estado.map.mostrarMensaje && estado.map.objetoCercano){
            setTimeout(() => {
                this.actualizarSpriteNpc(estado)
            }, 50);
            }
      
        if (this.movRestante > 0) {
            this.sprite.prepararAnimacion("caminar-" + this.direccion);
            return;
          }
          this.sprite.prepararAnimacion("quieto-" + this.direccion);

      
    }

    
}