function sortearNumero() {
  const resultadoElemento = document.getElementById('resultado');
  const tipoElemento = document.getElementById('tipo');
  
  // Variáveis para controlar a animação dos números passando
  let contador = 0;
  const intervalo = 50; // Intervalo de tempo entre a mudança de números (em milissegundos)
  const duracao = 2000; // Duração da animação dos números passando (em milissegundos)
  
  // tocar som de sorteio
  document.getElementById("SomSorteio").play();
  
  // Função para gerar um número aleatório de 1 a 99
  function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 99) + 1;
  }
  
  // Inicia a animação dos números passando
  const intervaloId = setInterval(() => {
    contador = gerarNumeroAleatorio();
    resultadoElemento.textContent = contador;
  }, intervalo);
  
  // Para a animação após a duração especificada e exibe o número final
  setTimeout(() => {
    clearInterval(intervaloId);
    const numeroFinal = gerarNumeroAleatorio();
    resultadoElemento.textContent = numeroFinal;
    
    // Definir se é par ou ímpar
    const tipoTexto = numeroFinal % 2 === 0 ? 'Par' : 'Ímpar';
    tipoElemento.textContent = tipoTexto;
    
    // Mostrar a indicação de par ou ímpar com animação
    tipoElemento.classList.remove('opacity-0', 'translate-y-5');
    tipoElemento.classList.add('opacity-100', 'translate-y-0');
  }, duracao);
  
  // limpa o indicador de par ou ímpar ao sortear outro número
  tipoElemento.textContent = '';
  tipoElemento.classList.add('opacity-0', 'translate-y-5');
}