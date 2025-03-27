class LogicaContadores {
  constructor(config) {
    this.overworld = config.overworld;
    this.ctx = config.ctx;
    this.map = config.map;

    this.imgCofreContador = new Image();
    this.imgCofreContador.src = "img/chestcounterimg.png";

    this.imgFontsContador = new Image();
    this.imgFontsContador.src = "img/font_counter_chest.png";
  }

  capturarPosicionCaracterContador(letra) {
    for (let row = 0; row < charsContador.length; row++) {
      let index = charsContador[row].indexOf(letra);
      if (index !== -1) {
        return {
          x: index * 16,
          y: row * 16, // Filas diferentes para mayúsculas, minúsculas y números
        };
      }
    }
    return null; // Si la letra no está en el sprite sheet
  }

  setCounterUI(texto, inicioX, inicioY, ctx) {
    ctx.drawImage(this.imgCofreContador, utils.conCelda(1), utils.conCelda(0));

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
        let pos = this.capturarPosicionCaracterContador(letra);
        if (pos) {
          ctx.drawImage(this.imgFontsContador, pos.x, pos.y, 16, 16, x, y, 16, 16);
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
