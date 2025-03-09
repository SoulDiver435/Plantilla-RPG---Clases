class Overworld {
    constructor(config){
        this.element= config.element;
        this.canvas= this.element.querySelector(".canvas-juego");
        this.ctx= this.canvas.getContext("2d");
        this.map= null;
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

        requestAnimationFrame(()=>{
            step();
        })
    }
    step();
    }

    cambiarMapa(destino){
        this.map= new OverworldMap(window.OverworldMaps[destino.destino]);

        this.map.gameObjects.player= new Player({
            x:utils.conCelda(destino.x),
            y: utils.conCelda(destino.y),
            direccion: destino.direccion
        })
    }

    init(){
    this.map = new OverworldMap(window.OverworldMaps.mapa2);
    this.directionInput= new DirectionInput();
    this.directionInput.init();
    this.directionInput.direccion;
    this.gameLoop()
    
    }
}