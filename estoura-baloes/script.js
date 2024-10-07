document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById('game-container');
  const startButton = document.getElementById('start-button');
  let score = 0;
  let gameInterval;
  
  startButton.addEventListener('click', () => {
    score = 0;
    document.getElementById('score').textContent = `Pontos: ${score}`;
    gameContainer.innerHTML = ''; // Limpa balões existentes
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(createBalloon, 1000);
  });
  
  function createBalloon() {
    const balloon = document.createElement('img');
    balloon.className = 'balloon';
    balloon.src = 'img/balão.png';
    balloon.style.left = Math.random() * (gameContainer.clientWidth - 50) + 'px';
    balloon.style.bottom = '-70px';
    gameContainer.appendChild(balloon);
    
    moveBalloon(balloon);
    
    balloon.addEventListener('click', () => {
      balloon.src = 'img/estouro.png'; // Caminho da imagem de explosão
      setTimeout(() => {
        if (gameContainer.contains(balloon)) {
          gameContainer.removeChild(balloon);
        }
      }, 200);
      score++;
      document.getElementById('score').textContent = `Pontos: ${score}`;
    });
  }
  
  function moveBalloon(balloon) {
    let position = -70;
    const speed = Math.random() * 2 + 1;
    
    function frame() {
      position += speed;
      balloon.style.bottom = position + 'px';
      
      if (position > gameContainer.clientHeight) {
        if (gameContainer.contains(balloon)) {
          gameContainer.removeChild(balloon);
        }
      } else {
        requestAnimationFrame(frame);
      }
    }
    
    requestAnimationFrame(frame);
  }
});