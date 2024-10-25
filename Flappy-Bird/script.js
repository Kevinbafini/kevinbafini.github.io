let move_speed = 3, gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('sons/correto.mp3');
let sound_die = new Audio('sons/perdeu.wav');

let bird_props = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
img.src = 'images/Bird.png';
message.classList.add('messageStyle');

document.addEventListener('click', iniciarJogo);
document.addEventListener('touchstart', iniciarJogo);
document.addEventListener('keydown', (e) => {
  if (e.key === " " || e.key === "Enter") {
    iniciarJogo();
  }
});

function iniciarJogo() {
  if (game_state != 'Play') {
    document.querySelectorAll('.pipe_sprite').forEach((e) => {
      e.remove();
    });
    
    img.style.display = 'block';
    img.src = 'images/Bird.png';
    bird.style.top = '40vh';
    game_state = 'Play';
    message.innerHTML = '';
    score_title.innerHTML = 'Pontuação : ';
    score_val.innerHTML = '0';
    message.classList.remove('messageStyle');
    
    bird_props = bird.getBoundingClientRect();
    background = document.querySelector('.background').getBoundingClientRect();
    
    play();
  }
}

function play() {
  function move() {
    if (game_state != 'Play') return;
    
    let pipe_sprite = document.querySelectorAll('.pipe_sprite');
    pipe_sprite.forEach((element) => {
      let pipe_sprite_props = element.getBoundingClientRect();
      bird_props = bird.getBoundingClientRect();
      
      if (pipe_sprite_props.right <= 0) {
        element.remove();
      } else {
        if (bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
          bird_props.left + bird_props.width > pipe_sprite_props.left &&
          bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
          bird_props.top + bird_props.height > pipe_sprite_props.top) {
          game_state = 'End';
          message.innerHTML = 'Você perdeu!'.fontcolor('#ff0000') + '<br>Clique ou pressione espaço para reiniciar o jogo';
          message.classList.add('messageStyle');
          img.style.display = 'none';
          sound_die.play();
          return;
        } else {
          if (pipe_sprite_props.right < bird_props.left && element.increase_score === true) {
            score_val.innerHTML = +score_val.innerHTML + 1;
            sound_point.play();
            element.increase_score = false;
          }
          element.style.left = pipe_sprite_props.left - move_speed + 'px';
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);
  
  let bird_dy = 0;
  
  function apply_gravity() {
    if (game_state != 'Play') return;
    bird_dy += gravity;
    
    function jump() {
      img.src = 'images/Bird-2.png';
      bird_dy = -7.6;
      
      setTimeout(() => {
        img.src = 'images/Bird.png';
      }, 200);
    }
    
    document.addEventListener('touchstart', jump);
    document.addEventListener('click', jump);
    document.addEventListener('keydown', (e) => {
      if (e.key === " " || e.key === "ArrowUp") {
        jump();
      }
    });
    
    if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
      game_state = 'End';
      message.innerHTML = 'Voce perdeu!'.fontcolor('#ff0000') + '<br>Clique ou pressione espaço para reiniciar o jogo';
      message.classList.add('messageStyle');
      img.style.display = 'none';
      sound_die.play();
      return;
    }
    
    bird.style.top = bird_props.top + bird_dy + 'px';
    bird_props = bird.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);
  
  let pipe_separation = 0;
  let pipe_gap = 50;
  
  function create_pipe() {
    if (game_state != 'Play') return;
    
    if (pipe_separation > 130) {
      pipe_separation = 0;
      
      let pipe_posi = Math.floor(Math.random() * 40) + 10;
      let pipe_sprite_inv = document.createElement('div');
      pipe_sprite_inv.className = 'pipe_sprite';
      pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
      pipe_sprite_inv.style.left = '100vw';
      
      document.body.appendChild(pipe_sprite_inv);
      let pipe_sprite = document.createElement('div');
      pipe_sprite.className = 'pipe_sprite';
      pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
      pipe_sprite.style.left = '100vw';
      pipe_sprite.increase_score = true;
      
      document.body.appendChild(pipe_sprite);
    }
    pipe_separation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}