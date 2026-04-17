// bingo/game.js

let bingoAtivo = false;
let jogadores = {};
let numerosSorteados = [];

function iniciarBingo() {
  bingoAtivo = true;
  jogadores = {};
  numerosSorteados = [];
}

function entrar(userId, tema = 'power') {
  if (!bingoAtivo) return null;

  if (!jogadores[userId]) {
    jogadores[userId] = {
      userId,
      tema,
      cartela: gerarCartela(),
      marcados: []
    };
  }

  return jogadores[userId];
}

// cria cartela simples (1-75)
function gerarCartela() {
  const nums = [];
  while (nums.length < 25) {
    const n = Math.floor(Math.random() * 75) + 1;
    if (!nums.includes(n)) nums.push(n);
  }
  return nums;
}

function sortear() {
  if (!bingoAtivo) return null;

  const n = Math.floor(Math.random() * 75) + 1;
  numerosSorteados.push(n);

  // marca nos jogadores
  Object.values(jogadores).forEach(j => {
    if (j.cartela.includes(n)) {
      j.marcados.push(n);
    }
  });

  return n;
}

module.exports = {
  iniciarBingo,
  entrar,
  sortear
};
