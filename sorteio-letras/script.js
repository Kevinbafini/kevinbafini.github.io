function sortearLetra() {
  const resultadoElemento = document.getElementById('resultado');
  
  // Variáveis para controlar a animação dos números passando
  let contador = 0;
  const intervalo = 50; // Intervalo de tempo entre a mudança de números (em milissegundos)
  const duracao = 2000; // Duração da animação dos números passando (em milissegundos)
  
  // tocar som de sorteio
  document.getElementById("sorteioSom").play();
  
  // Função para gerar letra do A ao Z
  function gerarLetraAleatoria() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letras[Math.floor(Math.random() * letras.length)];
  }
  
  // Inicia a animação dos números passando
  const intervaloId = setInterval(() => {
    contador = gerarLetraAleatoria();
    resultadoElemento.textContent = contador;
  }, intervalo);
  
  // Para a animação após a duração especificada e exibe o número final
  setTimeout(() => {
    clearInterval(intervaloId);
    resultadoElemento.textContent = contador;
  }, duracao);
}