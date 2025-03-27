class Overworld {
    constructor(config){
        this.element= config.element;
        this.canvas= this.element.querySelector(".canvas-juego");
        this.ctx= this.canvas.getContext("2d");
        this.map= null;
        this.opacidad= 0;
        this.transicionActiva=false;

        this.cofresAbiertos= 0;
        this.cantidadGemas= 0;

        this.isAPressed= false;
        this.keyXPressed= false;

        this.logicaContadores= null;
        this.logicaGemas= null;
        this.comportamientoNpcs= null;

        this.gemasRecolectadasGlobal = {};
        
        
    }

    gameLoop(){        
    const step = () => {
        // console.log("stepping...");
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        const personaCamara= this.map.gameObjects.player;
     
        // this.map.llenarWalls();
        this.map.gameObjects.player.actualizarPlayer({
            flecha: this.directionInput.direccion,
            map: this.map,
        })

        Object.values(this.map.gameObjects).forEach(obj => {
            if (obj instanceof Npc) {
                obj.actualizarNpc({
                    map:this.map
                });
            }
        });

        // this.map.activarTerremoto()
        this.map.forzarAnimacionNpc()
        // this.comportamientoNpcs.comportamientoNpcs()     

        this.map.dibujarMapa(this.ctx,personaCamara);
        this.map.dibujarObjetos(this.ctx, personaCamara);

        Object.values(this.map.gameObjects).sort((a,b) => {
            return a.y - b.y;
        }).forEach(object => {
            object.sprite.dibujarSprite(this.ctx, personaCamara)
        })
        
        
        this.map.initInterCofres();
        this.map.interaccionCofres(this);
     
        this.map.dibujarGemas(personaCamara, this.ctx);
        this.map.detectarCapturarGema(this);

      

        this.map.dibujarMensaje(this.ctx, this.map.mensajeActual,utils.conCelda(1),utils.conCelda(6.5),180)
        this.map.gestionDialogoMensajes(this);
        this.logicaContadores.setCounterUI(`x${this.cofresAbiertos}`,utils.conCelda(3), utils.conCelda(0.5), this.ctx)
        this.logicaGemas.setHudGemas(`x${this.cantidadGemas}`, utils.conCelda(9), utils.conCelda(0.5))

        this.map.gameObjects.player.verificarPuertas({
            map:this.map,
            overworld: this
        })

        if(this.transicionActiva){
            this.ctx.fillStyle = `rgba(0, 0, 0, ${this.opacidad})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        requestAnimationFrame(()=>{
            step();
        })
    }
    step();
    }

    cambiarMapa(destino){
        this.transicionActiva = true;
        let velocidad = 0.01; 

        const fadeOut = () => {
            this.opacidad += velocidad;

            if (this.opacidad < 1) {
                requestAnimationFrame(fadeOut);
            } else {
                // Cuando la pantalla está negra, cambiamos el mapa
                this.map.eliminarPared(this.map.gameObjects.player.x,this.map.gameObjects.player.y)
                this.map = new OverworldMap({...window.OverworldMaps[destino.destino], nombreMapa: destino.destino, // 👈 Pasamos el nombre del mapa
                gemasRecolectadasGlobal: this.gemasRecolectadasGlobal,
                gameObjects: {
                    // 2. Mantener todos los objetos del mapa destino (NPCs, cofres, etc.)
                    ...window.OverworldMaps[destino.destino].gameObjects,
                    // 3. Actualizar solo el player con las nuevas coordenadas
                    player: new Player({
                      x: utils.conCelda(destino.x),
                      y: utils.conCelda(destino.y),
                      direccion: destino.direccion
                    })}
                });

                this.comportamientoNpcs= new ComportamientoNpcs({map: this.map})
                this.map.llenarWalls()
                // Iniciar fadeIn
                fadeIn();
            }
        };

        const fadeIn = () => {
            this.opacidad -= velocidad;

            if (this.opacidad > 0) {
                requestAnimationFrame(fadeIn);
            } else {
                this.transicionActiva = false; // Desactivar la transición
            }
        };

        fadeOut();
    }

    init(){
        this.map = new OverworldMap({
            ...window.OverworldMaps.mapa1, // Nombre de tu mapa inicial
            nombreMapa: "mapa1",
            gemasRecolectadasGlobal: this.gemasRecolectadasGlobal
          });
          this.map.montarObjetos()
    this.logicaContadores= new LogicaContadores({
        overworld: this,
        ctx: this.ctx,
        map: this.map,
    });
    this.map.llenarWalls();
    this.logicaGemas= new LogicaGemas({
        overworld: this,
        ctx: this.ctx,
        map: this.map,
    });

    this.comportamientoNpcs = new ComportamientoNpcs({
        overworld: this,
        map: this.map,
        ctx: this.ctx,
    })

    
    this.directionInput= new DirectionInput();
    this.directionInput.init();
    this.directionInput.direccion;

    document.addEventListener("keydown", (e) =>{
        if(e.code === "KeyX"){
            this.isAPressed= true;
            // console.log("apressed: " + this.isAPressed);

        }
    })

    document.addEventListener("keyup", (e)=> {
        if(e.code === "KeyX"){
            this.isAPressed = false;
            this.keyXPressed= false;

            // console.log("apressed: " + this.isAPressed);
        }
    })
    
    this.gameLoop()
    
    document.addEventListener("keydown", (e) => {
        if(e.code === "KeyD"){
           console.log("loop npc1: " + this.map.gameObjects.npc1.loopComportamiento[0].tipo);
           
            
            
            
        }
    })
    
    }
}