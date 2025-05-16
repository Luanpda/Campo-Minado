let segundos = 0;
let minutos = 0;
let cronometroid = null

function iniciarCronometro() {
  if (cronometroid !== null) return; 

  cronometroid = setInterval(() => {
    const cronometro = document.getElementById('cronometro');
    cronometro.textContent = `${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2, '0')}`;
    segundos++;
    if (segundos === 60) {
      segundos = 0;
      minutos++;
    }
  }, 1000);
}

function getTempo() {
    return { segundos, minutos };
}
function pararCronometro() {
  clearInterval(cronometroid);
  cronometroid = null;
}

function resetarCronometro() {
  segundos = 0;
  minutos = 0;
  pararCronometro();
}

export { iniciarCronometro, getTempo, pararCronometro, resetarCronometro };
