function toRad(deg) {
  return deg * (Math.PI / 180.0);
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function easeOutSine(x) {
  return Math.sin((x * Math.PI) / 2);
}

function getPercent(input, min, max) {
  return (((input - min) * 100) / (max - min)) / 100;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const centerX = width / 2;
const centerY = height / 2;
const radius = width / 2;

// Definindo os itens
let items = [];

// Definir roleta de letras como principal ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  updateItems('letters');
});

function updateItems(type) {
  // Remove a classe ativa de todos os botões
  const buttons = document.querySelectorAll("#sortTypeButtons button");
  buttons.forEach(button => button.classList.remove("active-button"));
  
  // Adiciona a classe ativa ao botão selecionado
  const activeButton = [...buttons].find(button => button.textContent.includes(type.charAt(0).toUpperCase() + type.slice(1)));
  if (activeButton) {
    activeButton.classList.add("active-button");
  }
  
  // Atualizar os itens da roleta
  if (type === "letters") {
    items = [];
    for (let i = 0; i < 26; i++) {
      items.push(String.fromCharCode(65 + i));
    }
  } else if (type === "numbers") {
    items = [];
    for (let i = 0; i <= 9; i++) {
      items.push(i.toString());
    }
  } else if (type === "themes") {
    items = ["Cidade", "Animal", "Objeto", "Fruta", "País", "Nome", "Cor", "Comida", "Profissão", "Esporte"];
  }
  
  createWheel();
}

let currentDeg = 0;
let step = 360 / items.length;
let colors = [];
let itemDegs = {};

const colorsList = [
  "#00BA96", "#098E8E", "#42C6DB", "#376DBC", "#003296",
  "#311960", "#48256D", "#6600BF", "#6252BA", "#A489F7",
  "#A150FF", "#86248E", "#C92D6D", "#EF6CAD", "#8E175E",
  "#8D1F26", "#6F2033", "#5B3610", "#D34529", "#BC753C",
  "#FFB000", "#EABD00", "#BFC400", "#7BA946", "#619A51",
  "#325B32",
];

function createWheel() {
  step = 360 / items.length;
  colors = [];
  for (let i = 0; i < items.length; i++) {
    colors.push(colorsList[i % colorsList.length]);
  }
  draw();
}

function draw() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, toRad(0), toRad(360));
  ctx.fillStyle = `rgb(${33},${33},${33})`;
  ctx.lineTo(centerX, centerY);
  ctx.fill();
  
  let startDeg = currentDeg;
  for (let i = 0; i < items.length; i++, startDeg += step) {
    let endDeg = startDeg + step;
    
    let color = colors[i];
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
    ctx.fillStyle = color;
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    
    // style texto
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(toRad((startDeg + endDeg) / 2));
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = '26px sans-serif';
    ctx.fillText(items[i], radius - 60, 10);
    ctx.restore();
    
    itemDegs[items[i]] = {
      "startDeg": startDeg,
      "endDeg": endDeg
    };
    
    if (startDeg % 360 < 360 && startDeg % 360 > 270 && endDeg % 360 > 0 && endDeg % 360 < 90) {
      document.getElementById("winner").innerHTML = items[i];
    }
  }
}

let speed = 0;
let maxRotation = randomRange(360 * 3, 360 * 6);
let pause = false;

function animate() {
  if (pause) {
    // Certificar que a roleta parou completamente antes de soltar os confetes
    if (speed === 0) {
      // Tocar som de confete
      document.getElementById("audioConfetti").play();
      
      // Soltar confetes
      launchConfetti();
    }
    return;
  }
  speed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * 20;
  if (speed < 0.01) {
    speed = 0;
    pause = true;
  }
  currentDeg += speed;
  draw();
  window.requestAnimationFrame(animate);
}

function spinWithSpeed(swipeDistance) {
  if (speed !== 0) {
    return;
  }
  
  // Converte a distância do swipe em velocidade para o giro
  maxRotation = 0;
  currentDeg = 0;
  createWheel();
  draw();
  
  // Ajusta a rotação com base na distância do swipe
  let randomItem = items[Math.floor(Math.random() * items.length)];
  maxRotation = (360 * (3 + Math.min(swipeDistance / 100, 3))) - itemDegs[randomItem].endDeg + 10; // Controle de velocidade baseado no swipe
  itemDegs = {};
  pause = false;
  window.requestAnimationFrame(animate);
}

function launchConfetti() {
  const duration = 2 * 1000; // 2 segundos
  const end = Date.now() + duration;
  
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
    
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

let isDragging = false;
let startX = 0;
let startY = 0;
let swipeDistance = 0;

canvas.addEventListener("touchstart", (e) => {
  if (speed !== 0) {
    return; // Impede nova rotação enquanto a roleta ainda está girando
  }
  
  // Toca o som da roleta após a interação do usuário
  document.getElementById("audioRoleta").play();
  
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
  isDragging = true;
});

canvas.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  
  const touch = e.touches[0];
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;
  
  swipeDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
});

canvas.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
    
    if (swipeDistance > 50) {
      // Apenas gira se a distância do swipe for maior que 50px
      spinWithSpeed(swipeDistance);
    }
    
    swipeDistance = 0;
  }
});

// Inicializar os itens da roleta ao carregar
updateItems();