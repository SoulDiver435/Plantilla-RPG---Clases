class ComportamientoNpcs{
    constructor(config){
        this.overworld = config.overworld;
        this.map= config.map;
        this.ctx= config.ctx;

    }

    comportamientoNpcs() {
        const npcs = Object.values(this.map.gameObjects).filter(object => object instanceof Npc);

        Object.values(npcs).forEach((npc) => {
        let comportamientoActual = npc.comportamiento[0]
        // console.log(comportamientoActual);
        if(this.map.mostrarMensaje || this.map.isCutScenePlaying){
            return
        }

        if(comportamientoActual.startsWith("quieto")){
            // this.map.añadirPared(npc.x, npc.y);
            if(npc.tiempoQuieto > 0){
                npc.tiempoQuieto--
            }else{
                npc.comportamiento.push(npc.comportamiento.shift());
                npc.tiempoQuieto = 60;
            }
        }else if (comportamientoActual.startsWith("caminar")){
            

            const [propiedad,cantidad] = npc.movimientoNpc[comportamientoActual] || [];

            let direccionNpc= this.obtenerDireccionNpc(propiedad,cantidad);
            npc.direccion= direccionNpc;

            if(this.map.estaEspacioOcupado(npc.x,npc.y,direccionNpc)){
                // npc.sprite.animActual = "quieto" + direccionNpc
                this.map.añadirPared(npc.x, npc.y);
                npc.movRestante = 0;
                return
            }

            
            if(npc.movRestante === 0){
                this.map.moverPared(npc.x,npc.y,direccionNpc)
                npc.movRestante =16
                
            }

            
            this.map.eliminarPared(npc.x,npc.y);
            npc[propiedad] += parseInt(cantidad);
            
            
            npc.movRestante--;
            
            
            
            // Si ya terminó el movimiento, cambia comportamiento

            if(npc.movRestante === 0){
                let siguienteComportamiento = npc.comportamiento[1];

                if(siguienteComportamiento && siguienteComportamiento.startsWith("caminar")){
                    
                    npc.comportamiento.push(npc.comportamiento.shift());
                    npc.movRestante = 16;
                    
                }else {
                    
                    npc.comportamiento.push(npc.comportamiento.shift())
                }
            }
        }

        })
      }

      obtenerDireccionNpc(propiedad, cantidad){
        if (propiedad === "y" && cantidad === "-1") return "arriba";
        if (propiedad === "y" && cantidad === "1") return "abajo";
        if (propiedad === "x" && cantidad === "-1") return "izquierda";
        if (propiedad === "x" && cantidad === "1") return "derecha";
        return "abajo"; // Valor por defecto
      }
}