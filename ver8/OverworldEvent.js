class OverworldEvent{
    constructor({map,evento}){
        this.map= map;
        this.evento= evento;
    }

    quieto(resolve){
        const quien= this.map.gameObjects[this.evento.quien];
        quien.iniciarComportamiento({
            map: this.map},
            {tipo: "quieto",
            direccion: this.evento.direccion,
            tiempo: this.evento.tiempo
            }
        )

        const manejadorCompletado= e =>{
            if(e.detail.quienId === this.evento.quien){
                document.removeEventListener("PersonaQuietaCompleto", manejadorCompletado);
                resolve();
            }
        }

        document.addEventListener("PersonaQuietaCompleto", manejadorCompletado)

    }

    caminar(resolve){
        const quien = this.map.gameObjects[this.evento.quien];
        quien.iniciarComportamiento(
            {map: this.map},
            {
            tipo: "caminar",
            direccion: this.evento.direccion,
            reintentar: true
        })

        // Set up a handler to complete when correct person is done walking, then resolve the event
        const manejadorCompletado = e => {
            if(e.detail.quienId === this.evento.quien){
                document.removeEventListener("PersonaCaminandoCompleto", manejadorCompletado);
                resolve();
            }
        }

        document.addEventListener("PersonaCaminandoCompleto", manejadorCompletado)
    }

    init(){
        return new Promise(resolve => {
            // if (!this.evento || !this.evento.tipo) {
            //     console.error("Evento no válido:", this.evento);
            //     resolve(); // Resuelve la promesa para evitar bloqueos
            //     return;
            // }
            this[this.evento.tipo](resolve);
        });
    }
}