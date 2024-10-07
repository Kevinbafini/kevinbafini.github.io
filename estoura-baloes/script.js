document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById('game-container');
  let score = 0;
  
  function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * (gameContainer.clientWidth - 50) + 'px';
    balloon.style.bottom = '-70px';
    gameContainer.appendChild(balloon);
    
    moveBalloon(balloon);
    
    balloon.addEventListener('click', () => {
      gameContainer.removeChild(balloon);
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
        gameContainer.removeChild(balloon);
      } else {
        requestAnimationFrame(frame);
      }
    }
    
    requestAnimationFrame(frame);
  }
  
  setInterval(createBalloon, 1000);
});