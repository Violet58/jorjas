// bingo/game.js

const { createCanvas, loadImage } = require('canvas');

async function gerarImagem(cartela, marcados, tema) {
  console.log("CARREGANDO:", `./assets/${tema}.png`);
console.log("CARREGANDO STAMP:", `./assets/${tema}_carimbo.png`);
console.log("MAPA:", `./maps/${tema}.js`);
  const base = await loadImage(`./assets/${tema}.png`);
  const stamp = await loadImage(`./assets/${tema}_carimbo.png`);
  const mapa = require(`./maps/${tema}.js`);

  const canvas = createCanvas(base.width, base.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(base, 0, 0);

  marcados.forEach(num => {
    const pos = mapa[num];
    if (pos) {
      ctx.drawImage(stamp, pos.x, pos.y, 40, 40);
    }
  });

  return canvas.toBuffer();
}

module.exports = { gerarImagem };
