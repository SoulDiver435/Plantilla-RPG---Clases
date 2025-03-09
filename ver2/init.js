document.addEventListener("DOMContentLoaded", () => {
    const overworld = new Overworld({
        element: document.querySelector(".contenedor-juego")
    });
    
    overworld.init()
})