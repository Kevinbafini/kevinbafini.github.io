document.addEventListener("DOMContentLoaded", () => {
  const player1Container = document.getElementById('player1-container');
  const player2Container = document.getElementById('player2-container');
  const startButtonSingle = document.getElementById('start-button-single');
  const startButtonDuo = document.getElementById('start-button-duo');
  const winnerDisplay = document.getElementById('winner');
  let score1 = 0;
  let score2 = 0;
  let gameInterval1, gameInterval2;
  const winningScore = 10;
  
  startButtonSingle.addEventListener('click', () => {
    resetGame();
    score1 = 0;
    document.getElementById('score1').textContent = `Jogador 1: ${score1}`;
    player1Container.style.flex = '1';
    player2Container.classList.add('hidden');
    gameInterval1 = setInterval(() => createBalloon(player1Container, 'player1'), 1000);
  });
  
  startButtonDuo.addEventListener('click', () => {
    resetGame();
    score1 = 0;
    score2 = 0;
    document.getElementById('score1').textContent = `Jogador 1: ${score1}`;
    document.getElementById('score2').textContent = `Jogador 2: ${score2}`;
    player1Container.style.flex = '1';
    player2Container.classList.remove('hidden');
    gameInterval1 = setInterval(() => createBalloon(player1Container, 'player1'), 1000);
    gameInterval2 = setInterval(() => createBalloon(player2Container, 'player2'), 1000);
  });
  
  function createBalloon(container, playerClass) {
    const balloon = document.createElement('img');
    balloon.className = `balloon ${playerClass}`;
    balloon.src = 'img/balão.png'; // Caminho da imagem do balão
    balloon.style.left = Math.random() * (container.clientWidth - 50) + 'px';
    balloon.style.bottom = '-70px';
    balloon.style.width = '175px';
    balloon.style.height = '175px';
    container.appendChild(balloon);
    
    moveBalloon(balloon, container, playerClass);
    
    balloon.addEventListener('click', () => {
      balloon.src = 'img/estouro.png'; // Caminho da imagem de explosão
      setTimeout(() => {
        if (container.contains(balloon)) {
          container.removeChild(balloon);
        }
      }, 200);
      
      if (playerClass === 'player1') {
        score1++;
        document.getElementById('score1').textContent = `Jogador 1: ${score1}`;
        if (score1 >= winningScore) {
          declareWinner('Jogador 1');
        }
      } else if (playerClass === 'player2') {
        score2++;
        document.getElementById('score2').textContent = `Jogador 2: ${score2}`;
        if (score2 >= winningScore) {
          declareWinner('Jogador 2');
        }
      }
    });
  }
  
  function moveBalloon(balloon, container, playerClass) {
    let position = -70;
    const speed = Math.random() * 2 + 1;
    
    function frame() {
      position += speed;
      balloon.style.bottom = position + 'px';
      
      if (position > container.clientHeight) {
        if (container.contains(balloon)) {
          container.removeChild(balloon);
        }
      } else {
        requestAnimationFrame(frame);
      }
    }
    
    requestAnimationFrame(frame);
  }
  
  function declareWinner(player) {
    winnerDisplay.textContent = `${player} venceu!`;
    clearInterval(gameInterval1);
    clearInterval(gameInterval2);
  }
  
  function resetGame() {
    winnerDisplay.textContent = '';
    clearInterval(gameInterval1);
    clearInterval(gameInterval2);
    player1Container.innerHTML = '<p id="score1">Jogador 1: 0</p>';
    player2Container.innerHTML = '<p id="score2">Jogador 2: 0</p>';
    player1Container.style.flex = '1';
    player2Container.classList.add('hidden');
  }
});