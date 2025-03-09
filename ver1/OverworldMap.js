class OverworldMap{
    constructor(config){
        this.gameObjects= config.gameObjects;
        // this.walls= config.walls || {};
        this.mapImage= new Image();
        this.mapImage.src= config.mapSrc;
        this.imgMapaCargada= false;
        this.mapImage.onload = () =>{
            this.imgMapaCargada = true;
        }
    }

    dibujarMapa(ctx){
        if(this.imgMapaCargada){
        ctx.drawImage(this.mapImage,0,0)
        }
    }
}



window.OverworldMaps = {
    mapa1: {
    mapSrc: "img/tileset_juego001.png",
    gameObjects: {
        player: new Player({
        esControlable:true,
        x: utils.conCelda(2),
        y: utils.conCelda(2),
        }),

    }


    }
}