// Seleciona o topo do presente
const topoPresente = document.getElementById("topo-presente");

// Adiciona evento de clique ao topo
topoPresente.addEventListener("click", (event) => {
  // Impede que cliques no topo propaguem para outras partes
  event.stopPropagation();
  
  // Reproduz som
  const audio = document.getElementById("som-presente");
  audio.play();
  
  // Mostra o texto do presente
  const texto = document.getElementById("texto-presente");
  texto.classList.add("mostrar");
  
  // Gera confetes após uma pequena pausa (para sincronizar com a animação de abertura)
  setTimeout(() => {
    gerarConfetes();
  }, 500); // Ajuste o tempo conforme necessário
});

// Função para gerar confetes
function gerarConfetes() {
  const caixa = document.getElementById("presente");
  
  confetti({
    particleCount: 150, // Quantidade de confetes
    spread: 100, // Dispersão horizontal
    origin: {
      x: 0.5, // Centro da caixa no eixo X
      y: 0.4, // Posição inicial no eixo Y (ajustar conforme necessário)
    },
  });
  
  confetti({
    particleCount: 150,
    spread: 120,
    origin: {
      x: 0.5,
      y: 0.3,
    },
  });
}

// Previne que o clique em outras partes do presente dispare a animação
document.getElementById("presente").addEventListener("click", (event) => {
  event.stopPropagation();
});