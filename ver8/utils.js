const utils = {
    conCelda(n){
        return n*16
    },

    coordCelda(x,y){
        return `${x*16},${y*16}`
    },

    siguientePosicion(inicialX, inicialY, direccion){
    let x= inicialX;
    let y= inicialY;

    let tamaño=16;

    if(direccion==="arriba"){
        y-= tamaño
    }else if(direccion=== "abajo"){
        y+=tamaño
    }else if (direccion === "derecha"){
        x += tamaño
    }else if(direccion === "izquierda"){
        x -= tamaño
    }

    return {x,y}
    },

    emitirEvento(nombre,detalle){
        const evento= new CustomEvent(nombre,{
            detail: detalle
        });
        document.dispatchEvent(evento)
        
    }
}

//FUENTE GLOBAL------------------------------
const charAncho= 8;
const charAlto= 8;

const chars = [
    "!$%&'()+,-.¡¿",
  "0123456789:;<=>?",
  "@ABCDEFGHIJKLMNO",
  "PQRSTUVWXYZ[/]_",
  "abcdefghijklmno",
  "pqrstuvwxyz{|}"
  ]

const imgFonts = new Image();
imgFonts.src = "img/font_juego_prac02.png"

//FUENTE CONTADOR--------------------------------

const charsContador = [
    "x1234567890"
  ];

