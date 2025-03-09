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
        this.mapLayout = config.mapLayout;
        this.puertas = config.puertas
    }

    dibujarMapa(ctx, personaCamara){
        if(this.imgMapaCargada){
        ctx.drawImage(
            this.mapImage,
            utils.conCelda(6) - personaCamara.x,
            utils.conCelda(4.5) - personaCamara.y)
        }
    }

    estaEspacioOcupado(actualX, actualY, direccion){
        const {x,y} = utils.siguientePosicion(actualX,actualY, direccion);
        return this.walls[`${x},${y}`] || false;
    }

    llenarWalls(){
        this.mapLayout.forEach((row, y) => {
            row.split("").forEach((cell, x) => {
              if (cell === "#") {
                this.walls[utils.coordCelda(x, y)] = true;
              }
            });
          });
    }

}



window.OverworldMaps = {
    mapa1: {
    mapSrc: "img/tileset_juego001.png",
    gameObjects: {
        // player: new Player({
        // x: utils.conCelda(9),
        // y: utils.conCelda(2),
        // }),

    },
    walls: {
        // [utils.coordCelda(0,0)]: true
    },
    puertas:{
        [utils.coordCelda(9,1)]: {destino: "mapa2",x:7, y: 8, direccion: "arriba"}
    }
    ,
    mapLayout: [
        ".......................................",
        "#########.#########...##################",
        "#.....666........#...#.666...####.66.##",
    ]
    },
    mapa2: {
        mapSrc: "img/map3_tile.png",
        gameObjects: {
            player: new Player({
            x: utils.conCelda(7),
            y: utils.conCelda(8),
            }),
    
        },
        walls: {
        },
        puertas: {
            [utils.coordCelda(7,9)]: {destino: "mapa1",x:9, y: 2,direccion: "abajo"}
        }
        ,
        mapLayout: [
            "...............",
            "...............",
            "...............",
            "...##########..",
            "..#..........#.",
            "..#..........#.",
            "..#..........#.",
            "..#..........#.",
            "..#..........#.",
            "...####.#####..",  
        ]
    }
}