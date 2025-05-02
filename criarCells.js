import { setDificuldade } from "./dificuldade.js";
import { resetarTabuleiro } from "./dificuldade.js";
const container = document.querySelector('.container');

function criarcells(linhas,colunas){
    for(let i = 0;i < linhas * colunas; i++){
        const cell = document.createElement('div');
        cell.id = `cell-${i}`;
        cell.classList.add('cell');
        cell.setAttribute('started-game', 'false');
                
        container.appendChild(cell);
    }
}



document.addEventListener('pointerdown',(evento) =>{
    
    const botao = evento.target.id;
    if (botao === 'facil'){
        container.style.gridTemplateColumns = "repeat(10, 30px)";
        container.innerHTML = "";
        resetarTabuleiro();
        criarcells(8,10);
        setDificuldade('facil');

    }
    if (botao === 'medio'){
        container.innerHTML = "";
        resetarTabuleiro();
        container.style.gridTemplateColumns = "repeat(18, 30px)";
        criarcells(14,18);
        setDificuldade('medio');
        
    }
    if (botao === 'dificil'){
        container.innerHTML = "";
        resetarTabuleiro();
        container.style.gridTemplateColumns = "repeat(24, 30px)";
        criarcells(20,24);
        setDificuldade('dificil');
        
    }


})




  