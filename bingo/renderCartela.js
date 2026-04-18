const { createCanvas, loadImage } = require('canvas');

async function gerarImagem(cartela, marcados, tema) {
  console.log("CARTELA:", cartela);
  const base = await loadImage(`./assets/${tema}.png`);
  const stamp = await loadImage(`./assets/${tema}_carimbo.png`);

  const path = require('path');

  const canvas = createCanvas(base.width, base.height);
  const ctx = canvas.getContext('2d');

  // fundo
  ctx.drawImage(base, 0, 0);

// 🔢 CONFIG GRID
const cols = 4;
const rows = 4;

const startX = 410;
const startY = 410;
const gap = 430;

// 🎯 CENTROS DOS QUADRADOS
const centers = [];

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    centers.push({
      x: startX + col * gap,
      y: startY + row * gap
    });
  }
}

// 🔤 TEXTO
ctx.fillStyle = '#000';
ctx.font = '200px sans-serif'; // ⚠️ melhor que Arial no Render
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// 🔢 DESENHAR NÚMEROS
cartela.forEach((num, i) => {
  const pos = centers[i];
  if (!pos) return;

  const text = num.toString();

// 🖤 borda preta
ctx.strokeStyle = '#000';
ctx.lineWidth = 5;
ctx.strokeText(text, pos.x, pos.y);

// 🤍 número branco
ctx.fillStyle = '#fff';
ctx.fillText(text, pos.x, pos.y);
  });

  ctx.shadowColor = '#000';
ctx.shadowBlur = 5;

  // carimbos
  marcados.forEach((num, i) => {
  const index = cartela.indexOf(num);
  if (index === -1) return;

  const col = index % cols;
  const row = Math.floor(index / cols);

  const pos = centers[index];
if (!pos) return;

ctx.drawImage(stamp, pos.x - 40, pos.y - 40, 80, 80);
});

  return canvas.toBuffer();
}

module.exports = { gerarImagem };
