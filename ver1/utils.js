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
    }
}

