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
     

        this.map.gameObjects.player.actualizarPlayer({
            flecha: this.directionInput.direccion
        })
        

        this.map.dibujarMapa(this.ctx,personaCamara);

        Object.values(this.map.gameObjects).forEach(object => {
            object.sprite.dibujarSprite(this.ctx, personaCamara)
        })

        requestAnimationFrame(()=>{
            step();
        })
    }
    step();
    }

    init(){
    this.map = new OverworldMap(window.OverworldMaps.mapa1);
    this.directionInput= new DirectionInput();
    this.directionInput.init();
    this.directionInput.direccion;
    this.gameLoop()
    
    }
}