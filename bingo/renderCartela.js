const { createCanvas, loadImage } = require('canvas');

async function gerarImagem(cartela, marcados, tema) {
  const base = await loadImage(`./assets/${tema}.png`);
  const stamp = await loadImage(`./assets/${tema}_carimbo.png`);

  const mapa = require(`./bingo/maps/default.js`);

  const canvas = createCanvas(base.width, base.height);
  const ctx = canvas.getContext('2d');

  // fundo
  ctx.drawImage(base, 0, 0);

  // carimbos
  marcados.forEach(num => {
    const pos = mapa[num];
    if (pos) {
      ctx.drawImage(stamp, pos.x, pos.y, 40, 40);
    }
  });

  return canvas.toBuffer();
}

module.exports = { gerarImagem };
