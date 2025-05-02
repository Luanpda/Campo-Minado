import { setDificuldade } from "./dificuldade.js";
import { resetarTabuleiro } from "./dificuldade.js";


const container = document.querySelector('.container');
const select = document.getElementById('dificuldade');
function criarcells(linhas,colunas){
    for(let i = 0;i < linhas * colunas; i++){
        const cell = document.createElement('div');
        cell.id = `cell-${i}`;
        cell.classList.add('cell');
        cell.setAttribute('started-game', 'false');
                
        container.appendChild(cell);
    }
}



select.addEventListener('change', () => {
    const dificuldade = select.value;

    container.innerHTML = "";
    resetarTabuleiro();

    if (dificuldade === 'facil') {
        container.style.gridTemplateColumns = "repeat(10, 28px)";
        criarcells(8, 10);
        setDificuldade('facil');

    } else if (dificuldade === 'medio') {
        container.style.gridTemplateColumns = "repeat(18, 28px)";
        criarcells(14, 18);
        setDificuldade('medio');

    } else if (dificuldade === 'dificil') {
        container.style.gridTemplateColumns = "repeat(24, 28px)";
        criarcells(20, 24);
        setDificuldade('dificil');
    }
});


  