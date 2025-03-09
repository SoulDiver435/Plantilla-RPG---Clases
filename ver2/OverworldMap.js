class OverworldMap{
    constructor(config){
        this.gameObjects= config.gameObjects;
        this.walls= config.walls || {};
        this.mapImage= new Image();
        this.mapImage.src= config.mapSrc;
        this.imgMapaCargada= false;
        this.mapImage.onload = () =>{
            this.imgMapaCargada = true;
        }
    }

    dibujarMapa(ctx, personaCamara){
        if(this.imgMapaCargada){
        ctx.drawImage(
            this.mapImage,
            utils.conCelda(6) - personaCamara.x,
            utils.conCelda(4.5) - personaCamara.y)
        }
    }
}



window.OverworldMaps = {
    mapa1: {
    mapSrc: "img/tileset_juego001.png",
    gameObjects: {
        player: new Player({
        x: utils.conCelda(2),
        y: utils.conCelda(2),
        }),

    }


    }
}