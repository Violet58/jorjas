const { createCanvas, loadImage } = require('canvas');

async function gerarImagem(cartela, marcados, tema) {
  console.log("CARTELA:", cartela);
  const base = await loadImage(`./assets/${tema}.png`);
  const stamp = await loadImage(`./assets/${tema}_carimbo.png`);

  const path = require('path');

const mapa = require(path.join(__dirname, 'maps', 'default.js'));

  const canvas = createCanvas(base.width, base.height);
  const ctx = canvas.getContext('2d');

  // fundo
  ctx.drawImage(base, 0, 0);

  const cols = 5;
const rows = 5;

const startX = 50;   // ajuste fino
const startY = 50;   // ajuste fino
const cellW = 100;   // largura de cada quadrado
const cellH = 100;   // altura de cada quadrado

ctx.fillStyle = '#000';
ctx.font = 'bold 28px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

cartela.forEach((num, i) => {
  const pos = centers[i];

  ctx.fillText(num.toString(), pos.x, pos.y);
});

  // carimbos
  marcados.forEach((num, i) => {
  const index = cartela.indexOf(num);
  if (index === -1) return;

  const col = index % cols;
  const row = Math.floor(index / cols);

  const x = startX + col * cellW;
  const y = startY + row * cellH;

  ctx.drawImage(stamp, x, y, cellW, cellH);
});

  return canvas.toBuffer();
}

module.exports = { gerarImagem };
