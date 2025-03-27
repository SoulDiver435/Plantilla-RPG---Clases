class OverworldMap{
    constructor(config){
        this.gameObjects= config.gameObjects || {};
        this.walls= config.walls || {};
        this.mapImage= new Image();
        this.mapImage.src= config.mapSrc;
        this.imgMapaCargada= false;
        this.mapImage.onload = () =>{
            this.imgMapaCargada = true;
        }
        this.mapLayout = config.mapLayout;
        this.puertas = config.puertas

        this.portalAbierto= false;

        this.cofres = config.cofres || [];
        this.gemas = config.gemas || []

        this.cofreCerca= false;
        this.imgCofre= new Image()
        this.imgCofre.src = "img/chest000.png";

        this.imgGema= new Image();
        this.imgGema.src= "img/gemsprite.png"
        // this.gemasRecolectadas = new Set();
        

        this.mostrarMensaje= false;
        this.imgCajaTexto= new Image();
        this.imgCajaTexto.src= "img/text_box.png"
        this.mensajeActual= ""
        this.clicksMsj= null;

        this.interaccionMsjActivado= false;

        this.objetoCercano=null;
        this.mapaIniciado= false;

        this.nombreMapa = config.nombreMapa; // Nuevo: nombre del mapa
        this.gemasRecolectadasGlobal = config.gemasRecolectadasGlobal || {}; // Registro global

    // Inicializa el Set para este mapa si no existe
        if (!this.gemasRecolectadasGlobal[this.nombreMapa]) {
      this.gemasRecolectadasGlobal[this.nombreMapa] = new Set();
        }

        this.isCutScenePlaying = false;

        }

    //DIBUJADO ----------------------------------

    dibujarMapa(ctx, personaCamara){
        if(this.imgMapaCargada){
            ctx.drawImage(
                this.mapImage,
                utils.conCelda(6) - personaCamara.x,
                utils.conCelda(4.5) - personaCamara.y);
        }        
    }

    //Dibujar Objetos
    dibujarObjetos(ctx, personaCamara){
        this.dibujarCofres(ctx, utils.conCelda(1),0,0,0, personaCamara)
    }

    //-------------------------------------------

    //DIBUJAR MENSAJES---------------------------

    dibujarMensaje(ctx, texto, inicioX, inicioY, maxAncho){
    if(!this.mostrarMensaje) return;

    const xCajaTexto= utils.conCelda(0);
    const yCajaTexto= utils.conCelda(6); 

    ctx.drawImage(this.imgCajaTexto,xCajaTexto,yCajaTexto);

    //------------------------------------------------------

    let x= inicioX;
    let y= inicioY;
    let espacioAncho= charAncho;
    let palabras = texto.split(" ");
    let anchoDeLinea= 0;

    for (let i = 0; i < palabras.length; i++) {
        let palabra = palabras[i];
        let anchoPalabra = palabra.length * charAncho; // Tamaño total de la palabra
      
        // Si la palabra no cabe, saltar a la siguiente línea
        if (anchoDeLinea + anchoPalabra > maxAncho) {
            x = inicioX;
            y += charAlto; // Mueve a la siguiente línea
            anchoDeLinea = 0;
        }
      
        // Dibuja cada letra de la palabra
        for (let letra of palabra) {
            let pos = this.capturarPosicionCaracter(letra);
            if (pos) {
                ctx.drawImage(imgFonts, pos.x, pos.y, charAncho, charAlto, x, y, charAncho, charAlto);
                x += charAncho;
                anchoDeLinea += charAncho;
            }
        }
      
        // Añadir espacio entre palabras (pero no al final de una línea nueva)
        if (i < palabras.length - 1) {
            x += espacioAncho;
            anchoDeLinea += espacioAncho;
        }
      }

    }

    //Capturar Caracteres fuente GLOBAL

    capturarPosicionCaracter(letra){
        for (let row = 0; row < chars.length; row++) {
            let index = chars[row].indexOf(letra);
            if (index !== -1) {
                return {
                    x: index * charAncho,
                    y: row * charAlto // Filas diferentes para mayúsculas, minúsculas y números
                };
            }
        }
        return null; // Si la letra no está en el sprite sheet
    }

    //Gestion Dialogo y Mensajes
    gestionDialogoMensajes(){

        if(!this.interaccionMsjActivado){
        this.gestionDialogolistener = (e)=> {
            if(e.code === "KeyX"){
                if(!this.mostrarMensaje){

                this.objetoCercano= this.buscarObjetoCercano(this.gameObjects.player.x,this.gameObjects.player.y,this.gameObjects.player.direccion);

                if(this.objetoCercano){
                    this.mostrarMensaje= true;
                    this.clicksMsj= this.objetoCercano.dialogo.length - 1;
                    this.mensajeActual= this.objetoCercano.dialogo[0];
                    console.log("Dialogo: " + this.mensajeActual);
                    
                }

                }else{
                    if(this.clicksMsj > 0){
                        this.clicksMsj--;
                        this.mensajeActual= this.objetoCercano.dialogo[this.objetoCercano.dialogo.length-this.clicksMsj - 1];
                        console.log("Dialogo: " + this.mensajeActual);
                        
                    }else{
                        this.mostrarMensaje=false;
                        this.mensajeActual= "";
                        this.objetoCercano= null;
                        
                    }
                }



             
            }
        }
        document.addEventListener("keydown", this.gestionDialogolistener)
        this.interaccionMsjActivado= true;
        }

    }

    //------------------------------------------

    //COFRES------------------------------------

    //Dibujar Cofres
    dibujarCofres(ctx, Xabierto, Yabierto, Xcerrado, Ycerrado, personaCamara){
        this.cofres.forEach((cofre) => {
            const cofreX = cofre.x + utils.conCelda(6) - personaCamara.x;
            const cofreY = cofre.y + utils.conCelda(4.5) - personaCamara.y;

            if(cofre.abierto){
                ctx.drawImage(
                    this.imgCofre,
                    Xabierto,
                    Yabierto,
                    16,
                    16,
                    cofreX,
                    cofreY,
                    16,
                    16
                );
            }else if(!cofre.abierto){
                ctx.drawImage(
                    this.imgCofre,
                    Xcerrado,
                    Ycerrado,
                    16,
                    16,
                    cofreX,
                    cofreY,
                    16,
                    16
                )
            }

        })
    }

    //Detectar Cofres
    estaCercaCofre(actualX, actualY, direccion){
    const {x,y} = utils.siguientePosicion(actualX,actualY,direccion);
    return this.cofres.some((cofre) => cofre.x === x && cofre.y === y);
    }

    //Inicializar Interaccion con cofres
    initInterCofres(){
        const playerX= this.gameObjects.player.x;
        const playerY= this.gameObjects.player.y;
        const playerDireccion= this.gameObjects.player.direccion;

        if(this.estaCercaCofre(playerX, playerY, playerDireccion)){
            this.cofreCerca = true;
            return
        }

        if(!this.estaCercaCofre(playerX, playerY, playerDireccion)){
            this.cofreCerca = false
        }
    }

    //Accionar Interaccion con cofres
    interaccionCofres(overworld){
        if(overworld.isAPressed && this.cofreCerca){
            console.log("interactuando con cofree!!!!");
            const playerX= this.gameObjects.player.x
            const playerY= this.gameObjects.player.y
            const playerDireccion= this.gameObjects.player.direccion

            const { x, y } = utils.siguientePosicion(
                playerX,
                playerY,
                playerDireccion
              );
        
              let cofreEncontrado = this.cofres.find(
                (cofre) => cofre.x === x && cofre.y === y
              );
        
              if(cofreEncontrado && !cofreEncontrado.abierto){
                cofreEncontrado.abierto = true;
                this.mostrarMensaje= true;
                this.clicksMsj = 0;
                overworld.cofresAbiertos +=1;
                this.portalAbierto= this.detectarPortalAbierto(overworld);

                if(!this.portalAbierto){
                    this.mensajeActual= `¡Abriste ${overworld.cofresAbiertos} cofre(s)! ¡Fantabuloso! :)`;
                console.log("COFRE ABIERTO!");
                }else{
                    this.mensajeActual= `¡Abriste el ultimo cofre! Se abrio un portal en algun lugar...`
                }
                
              }
            
        }
    }

    //---------------------------------------------
    //DETECTAR PORTAL ABIERTO----------------------

    detectarPortalAbierto(overworld){
        return overworld.cofresAbiertos > 6;
    }

    //MONTAR OBJETOS-------------------------------

    montarObjetos(){
        this.cofres.forEach((cofre) => {
            const cofreX = cofre.x;
            const cofreY = cofre.y;

            this.añadirPared(cofreX,cofreY);
        })

        Object.keys(this.gameObjects).forEach(key => {
            let objeto= this.gameObjects[key];
            
            objeto.id= key;
            objeto.montar(this)
            console.log(`Asignando ID ${key} a`, objeto);
        })
    }

    //INTERACCIONES--------------------------------

    estaEspacioOcupado(actualX, actualY, direccion){
        const {x,y} = utils.siguientePosicion(actualX,actualY, direccion);
        return this.walls[`${x},${y}`] || false;
    }

    //LLENAR WALLS Y GEMAS DINAMICAMENTE
    llenarWalls() {
        this.gemas = []; // Resetear el array local
        this.mapLayout.forEach((row, y) => {
          row.split("").forEach((cell, x) => {
            if (cell === "#") this.walls[utils.coordCelda(x, y)] = true;
            if (cell === "6") {
              const coord = `${utils.conCelda(x)},${utils.conCelda(y)}`;
              // Verificar si la gema NO fue recolectada en ESTE mapa
              if (!this.gemasRecolectadasGlobal[this.nombreMapa].has(coord)) {
                this.gemas.push({ x: utils.conCelda(x), y: utils.conCelda(y) });
              }
            }
          });
        });
      }
    

    //AÑADIR PAREDES
    añadirPared(x,y){
        this.walls[`${x},${y}`] = true;
    }

    //ELIMINAR PAREDES
    eliminarPared(x,y){
        delete this.walls[`${x},${y}`]
    }

    //MOVER PAREDES
    moverPared(fueX, fueY, direccion){
        this.eliminarPared(fueX,fueY);
        const{x,y} = utils.siguientePosicion(fueX,fueY,direccion);

        this.añadirPared(x,y);
    }

    //GEMAS----------------------------------------------
    //DIBUJAR GEMAS
    dibujarGemas(personaCamara,ctx){
        this.gemas.forEach((gema) => {
            const xGema =  gema.x + utils.conCelda(6) - personaCamara.x;
            const yGema =  gema.y -8 + utils.conCelda(4.5) - personaCamara.y;
        
                ctx.drawImage(this.imgGema, xGema, yGema)
            
        })
        }

    //INTERACCION CON GEMAS
    detectarCapturarGema(overworld) {
        this.gemas = this.gemas.filter(gema => {
          const coord = `${gema.x},${gema.y}`;
          if (this.gameObjects.player.x === gema.x && 
              this.gameObjects.player.y === gema.y) {
            overworld.cantidadGemas++;
            console.log("cantidadgemas: " + overworld.cantidadGemas);
            
            // Registrar en el Set del mapa actual
            this.gemasRecolectadasGlobal[this.nombreMapa].add(coord);
            return false; // Eliminar gema del array local
          }
          return true;
        });
      }

    //ESTA OBJETO CERCA???
    buscarObjetoCercano(actualX, actualY, direccion){
        const{x,y} = utils.siguientePosicion(actualX, actualY,direccion);
        return Object.values(this.gameObjects).find(o => o.x === x && o.y ===y) || null;
    }

    //FORZAR ANIMACION NPC
    forzarAnimacionNpc(){
        if(this.mostrarMensaje && this.objetoCercano){
            const playerX= this.gameObjects.player.x;
            const playerY= this.gameObjects.player.y;

            if(playerX > this.objetoCercano.x){
                this.objetoCercano.sprite.frameActual = 0;
                this.objetoCercano.sprite.animActual = "quieto-derecha";
            }else if(playerX < this.objetoCercano.x){
                this.objetoCercano.sprite.frameActual = 0;
                this.objetoCercano.sprite.animActual = "quieto-izquierda";
            }else if(playerY > this.objetoCercano.y){
                this.objetoCercano.sprite.frameActual = 0;
                this.objetoCercano.sprite.animActual = "quieto-abajo";
            }else if(playerY < this.objetoCercano.y){
                this.objetoCercano.sprite.frameActual = 0;
                this.objetoCercano.sprite.animActual = "quieto-arriba";
            }
        }
    }

    async iniciarCutScene(eventos){
        this.isCutScenePlaying = true;

        for(let i=0; i< eventos.length; i++){
            const manejadorEvento = new OverworldEvent({
                evento: eventos[i],
                map: this,
            })
            await manejadorEvento.init()
        }
        this.isCutScenePlaying= false;
    }

}



window.OverworldMaps = {
    mapa1: {
    mapSrc: "img/tileset_juego001.png",
    gameObjects: {
        player: new Player({
        x: utils.conCelda(9),
        y: utils.conCelda(2),
        }),
        npc1: new Npc({
            // id:"npc1",
            x: utils.conCelda(3),
            y: utils.conCelda(3),
            src: "img/alien_spritesheet.png",
            dialogo: ["Hola ¿como estas?", "Encantado de conocerte.", "¡Adios!"],
            // loopComportamiento: ["quieto-abajo","caminar-izquierda","caminar-izquierda","quieto-izquierda","quieto-izquierda","caminar-derecha","caminar-derecha",],
            loopComportamiento: [
                {tipo: "quieto", direccion: "abajo", tiempo: 800},
                {tipo: "caminar", direccion: "izquierda"},
                {tipo: "caminar", direccion: "izquierda"},
                {tipo: "quieto", direccion: "izquierda", tiempo: 800},
                {tipo: "caminar", direccion: "derecha"},
                {tipo: "caminar", direccion: "derecha"},

            ],
        }),
        npc2: new Npc({
            // id:"npc2",
            x: utils.conCelda(11),
            y: utils.conCelda(3),
            src: "img/alien_spritesheet.png",
            dialogo: ["Rayos, estoy perdido.", "¿Donde estara la salida?"],
            // loopComportamiento: ["quieto-arriba", "quieto-arriba","caminar-abajo","quieto-abajo","quieto-abajo","caminar-arriba", "quieto-arriba"],
            loopComportamiento: [
                {tipo: "quieto", direccion: "arriba", tiempo: 800},
                {tipo: "quieto", direccion: "abajo", tiempo: 800},
            ]
        })

    },
    walls: {
        // [utils.coordCelda(0,0)]: true
    },
    puertas:{
        [utils.coordCelda(9,1)]: {destino: "mapa2",x:7, y: 8, direccion: "arriba"}
    }
    ,
    mapLayout: [
        ".........#.............................",
        "#########.#########...##################",
        "#.....666........#...#.......####....##",
    ],
    cofres : [
        { x: utils.conCelda(11), y: utils.conCelda(5), abierto: false },
        { x: utils.conCelda(25), y: utils.conCelda(12), abierto: false },
        { x: utils.conCelda(3), y: utils.conCelda(11), abierto: false },
        { x: utils.conCelda(9), y: utils.conCelda(14), abierto: false },
        { x: utils.conCelda(1), y: utils.conCelda(24), abierto: false },
        { x: utils.conCelda(18), y: utils.conCelda(32), abierto: false },
        { x: utils.conCelda(36), y: utils.conCelda(26), abierto: false },
      ],
      gemas: []
    },
    mapa2: {
        mapSrc: "img/map3_tile.png",
        gameObjects: {
            // player: new Player({
            // x: utils.conCelda(7),
            // y: utils.conCelda(8),
            // }),
            npcA: new Npc({
                x: utils.conCelda(6),
                y: utils.conCelda(6),
                src: "img/alien_spritesheet.png",
                dialogo: ["Que misterio tan grande", "Estoy algo asustado..."],
                comportamiento: ["quieto-abajo","quieto-izquierda","quieto-izquierda","caminar-derecha","caminar-izquierda",],
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
            "..#...66.....#.",
            "..#..........#.",
            "..#..........#.",
            "..#..........#.",
            "...####.#####..",
            "...##########..",  
        ], 
        cofres:[],
        gemas: [],
    }
}