class Overworld {
    constructor(config){
        this.element= config.element;
        this.canvas= this.element.querySelector(".canvas-juego");
        this.ctx= this.canvas.getContext("2d");
        this.map= null;
        this.opacidad= 0;
        this.transicionActiva=false;
    }

    gameLoop(){        
    const step = () => {
        // console.log("stepping...");
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        const personaCamara= this.map.gameObjects.player;
     
        this.map.llenarWalls();
        this.map.gameObjects.player.actualizarPlayer({
            flecha: this.directionInput.direccion,
            map: this.map,
        })

        // this.map.gameObjects.player.actualizarSprite();
        

        this.map.dibujarMapa(this.ctx,personaCamara);

        Object.values(this.map.gameObjects).forEach(object => {
            object.sprite.dibujarSprite(this.ctx, personaCamara)
        })

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
                this.map = new OverworldMap(window.OverworldMaps[destino.destino]);
                this.map.gameObjects.player = new Player({
                    x: utils.conCelda(destino.x),
                    y: utils.conCelda(destino.y),
                    direccion: destino.direccion
                });

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
    this.map = new OverworldMap(window.OverworldMaps.mapa2);
    this.directionInput= new DirectionInput();
    this.directionInput.init();
    this.directionInput.direccion;
    this.gameLoop()
    
    }
}