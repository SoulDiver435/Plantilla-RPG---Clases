class LogicaGemas {
  constructor(config) {
    this.overworld = config.overworld;
    this.ctx = config.ctx;
    this.map = config.map;
    this.imgHudGemas= new Image();
    this.imgHudGemas.src = "img/gemsprite.png"
  }

  setHudGemas(texto, inicioX, inicioY) {
    this.ctx.drawImage(this.imgHudGemas, utils.conCelda(8), utils.conCelda(0) + 8);

    let x = inicioX;
    let y = inicioY;
    let espacioAncho = 16;
    let palabras = texto.split(" ");
    let anchoDeLinea = 0;

    for (let i = 0; i < palabras.length; i++) {
      let palabra = palabras[i];
      // let anchoPalabra = palabra.length * 16; // Tamaño total de la palabra

      // Dibuja cada letra de la palabra
      for (let letra of palabra) {
        let pos = this.overworld.logicaContadores.capturarPosicionCaracterContador(letra);
        if (pos) {
          this.ctx.drawImage(this.overworld.logicaContadores.imgFontsContador, pos.x, pos.y, 16, 16, x, y, 16, 16);
          x += 16;
          anchoDeLinea += 16;
        }
      }

      // Añadir espacio entre palabras (pero no al final de una línea nueva)
      if (i < palabras.length - 1) {
        x += espacioAncho;
        anchoDeLinea += espacioAncho;
      }
    }
  }
}
