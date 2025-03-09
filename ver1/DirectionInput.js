class DirectionInput{
    constructor(){
        this.direccionesPresionadas = [];
        this.mapaDirecciones = {
            "ArrowUp": "arriba",
            "ArrowDown": "abajo",
            "ArrowLeft" : "izquierda",
            "ArrowRight" : "derecha"
        }
        // this.touchArriba= document.querySelector(".controlArriba"),
        // this.touchAbajo= document.querySelector(".controlAbajo"),
        // this.touchIzquierda= document.querySelector(".controlIzq"),
        // this.touchDerecha= document.querySelector(".controlDer"),
        // this.touchA= document.querySelector(".botonCirc")
    }

    get direccion (){
        return this.direccionesPresionadas[0];
    }

    init(){

        document.addEventListener("keydown", e => {
            const dir= this.mapaDirecciones[e.code];

            if( dir && this.direccionesPresionadas.indexOf(dir) === -1){
                this.direccionesPresionadas.unshift(dir)
                // console.log(this.direccionesPresionadas);
                            
                
            }
        })

        document.addEventListener("keyup", e => {
            const dir = this.mapaDirecciones[e.code];
            const index= this.direccionesPresionadas.indexOf(dir);

            if(index > -1){
                this.direccionesPresionadas.splice(index,1);
                // console.log(this.direccionesPresionadas);
            }
        })


//TOUCH--------------------------------------------------------

// //ARRIBA
// this.touchArriba.addEventListener("touchstart", e =>{
//     const dir= "arriba"

//     this.touchArriba.style.backgroundColor = "black"

//     if( dir && this.direccionesPresionadas.indexOf(dir) === -1){
//         this.direccionesPresionadas.unshift(dir);         
//     }  
// })

// this.touchArriba.addEventListener("touchend", e =>{
//     const dir = "arriba";
//     const index= this.direccionesPresionadas.indexOf(dir);

//     this.touchArriba.style.backgroundColor = "#456"

//     if(index > -1){
//         this.direccionesPresionadas.splice(index,1);
//         // console.log(this.direccionesPresionadas);
//     }
// });

// //ABAJO
// this.touchAbajo.addEventListener("touchstart", e =>{
//     const dir= "abajo"

// this.touchAbajo.style.backgroundColor = "black"

//     if( dir && this.direccionesPresionadas.indexOf(dir) === -1){
//         this.direccionesPresionadas.unshift(dir);         
//     }  
// })

// this.touchAbajo.addEventListener("touchend", e =>{
//     const dir = "abajo";
//     const index= this.direccionesPresionadas.indexOf(dir);

//      this.touchAbajo.style.backgroundColor = "#456";

//     if(index > -1){
//         this.direccionesPresionadas.splice(index,1);
//         // console.log(this.direccionesPresionadas);
//     }
// });

// //IZQUIERDA
// this.touchIzquierda.addEventListener("touchstart", e =>{
//     const dir= "izquierda";

//     this.touchIzquierda.style.backgroundColor = "black"

//     if( dir && this.direccionesPresionadas.indexOf(dir) === -1){
//         this.direccionesPresionadas.unshift(dir);         
//     }  
// })

// this.touchIzquierda.addEventListener("touchend", e =>{
//     const dir = "izquierda";
//     const index= this.direccionesPresionadas.indexOf(dir);

//     this.touchIzquierda.style.backgroundColor = "#456";

//     if(index > -1){
//         this.direccionesPresionadas.splice(index,1);
//         // console.log(this.direccionesPresionadas);
//     }
// })

// //DERECHA
// this.touchDerecha.addEventListener("touchstart", e =>{
//     const dir= "derecha";

//     this.touchDerecha.style.backgroundColor = "black"

//     if( dir && this.direccionesPresionadas.indexOf(dir) === -1){
//         this.direccionesPresionadas.unshift(dir);         
//     }  
// })

// this.touchDerecha.addEventListener("touchend", e =>{
//     const dir = "derecha";
//     const index= this.direccionesPresionadas.indexOf(dir);

//     this.touchDerecha.style.backgroundColor = "#456";

//     if(index > -1){
//         this.direccionesPresionadas.splice(index,1);
//         // console.log(this.direccionesPresionadas);
//     }
// })

// //BOTON A

// this.touchA.addEventListener("touchstart", e =>{
    

//     this.touchA.style.backgroundColor = "black"
// })

// this.touchA.addEventListener("touchend", e =>{
    

//     this.touchA.style.backgroundColor = "#456";
   
// })




    }
}