const { createCanvas, loadImage } = require('canvas');

async function gerarImagem(cartela, marcados = [], tema) {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

  const fundo = await loadImage(`./assets/${tema}.png`);
  const carimbo = await loadImage(`./assets/${tema}_carimbo.png`);

  ctx.drawImage(fundo, 0, 0, 500, 500);

  // 🔥 POSIÇÕES (VAMOS AJUSTAR DEPOIS)
  let index = 0;

  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {

      let posX = 50 + x * 80;
      let posY = 50 + y * 80;

      const numero = cartela[index];

      ctx.fillStyle = "#000";
      ctx.font = "20px Arial";
      ctx.fillText(numero, posX, posY);

      // 🔴 carimbo
      if (marcados.includes(numero)) {
        ctx.drawImage(carimbo, posX - 20, posY - 20, 50, 50);
      }

      index++;
    }
  }

  return canvas.toBuffer();
}

module.exports = { gerarImagem };
