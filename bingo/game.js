// bingo/game.js

let game = {
  ativo: false,
  numeros: [],
  sorteados: [],
  jogadores: {}
};

function iniciarBingo() {
  game.ativo = true;
  game.numeros = Array.from({ length: 75 }, (_, i) => i + 1);
  game.sorteados = [];
  game.jogadores = {};
}

function gerarCartela() {
  let nums = new Set();

  while (nums.size < 25) {
    nums.add(Math.floor(Math.random() * 75) + 1);
  }

  return Array.from(nums);
}

function entrar(userId) {
  if (!game.ativo) return false;

  game.jogadores[userId] = {
    cartela: gerarCartela(),
    marcados: []
  };

  return game.jogadores[userId];
}

function sortear() {
  if (!game.ativo || game.numeros.length === 0) return null;

  const index = Math.floor(Math.random() * game.numeros.length);
  const numero = game.numeros.splice(index, 1)[0];

  game.sorteados.push(numero);

  // marcar automaticamente
  for (let id in game.jogadores) {
    let player = game.jogadores[id];

    if (player.cartela.includes(numero)) {
      player.marcados.push(numero);
    }
  }

  return numero;
}

module.exports = {
  iniciarBingo,
  entrar,
  sortear,
  game
};
