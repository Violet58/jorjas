const MAX_PLAYERS = 9;

let bingoAtivo = false;

const jogadores = {};
const cartelasUsadas = [];

const cartelasDisponiveis = [
  "power",
  "sally_face",
  "omori",
  "fnf",
  "fnf2",
  "hello_kitty",
  "denji",
  "poppy_playtime",
  "g"
];

function iniciarBingo() {
  bingoAtivo = true;
  Object.keys(jogadores).forEach(k => delete jogadores[k]);
  cartelasUsadas.length = 0;
}

function pegarCartelaAleatoria() {
  const restantes = cartelasDisponiveis.filter(c => !cartelasUsadas.includes(c));

  if (restantes.length === 0) {
    return null; // acabou pool
  }

  const escolha = restantes[Math.floor(Math.random() * restantes.length)];
  cartelasUsadas.push(escolha);

  return escolha;
}

function entrar(userId) {
  if (!bingoAtivo) return null;

  // já tem cartela
  if (jogadores[userId]) {
    return jogadores[userId];
  }

  const tema = pegarCartelaAleatoria();

  if (!tema) {
    return null; // sem cartelas
  }

  const player = {
    userId,
    tema,
    cartela: [], // se você quiser manter números também
    marcados: []
  };

  jogadores[userId] = player;

  return player;
}

function sortear() {
  if (!bingoAtivo) return null;

  const n = Math.floor(Math.random() * 75) + 1;

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
