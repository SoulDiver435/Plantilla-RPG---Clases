class GameObject {
    constructor(config){
        this.id= null;
        this.estaMontado= false;
        this.x= config.x || 0;
        this.y= config.y || 0;
        this.direccion= config.direccion || "abajo";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "img/spritesheet_bluya.png"
        })

        this.loopComportamiento= config.loopComportamiento || [];
        this.loopComportamientoIndex= 0;
        
    }

    montar(map){
        this.estaMontado= true;
        map.añadirPared(this.x,this.y);

        setTimeout(()=> {
            this.realizarComportamientoEvento(map)
        },100)
    }

    async realizarComportamientoEvento(map){
        if(map.isCutScenePlaying || this.loopComportamiento.length === 0){
            return
        }
        // console.log("Iniciando comportamiento con ID:", this.id);
        let eventConfig= this.loopComportamiento[this.loopComportamientoIndex];
        eventConfig.quien= this.id;

        const manejadorEvento = new OverworldEvent({map, evento: eventConfig});
        await manejadorEvento.init();

        this.loopComportamientoIndex +=1;
        if(this.loopComportamientoIndex=== this.loopComportamiento.length){
            this.loopComportamientoIndex = 0;
        }

        this.realizarComportamientoEvento(map)
    }
}