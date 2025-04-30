import { CriarJogo } from "./GerarJogo.js";


let tabuleiro = null;


document.addEventListener('pointerdown', (evento) => {
    const celula = evento.target;
    const celulaid = celula.id;
    const numero = parseInt(celulaid.split('-')[1]);
    const linhaClicada = Math.floor(numero / 10); 
    const colunaClicada = numero % 10;


    
    if(celula.classList.contains('cell') && celula.getAttribute('started-game') !== 'true'){
        if(!tabuleiro){
            tabuleiro = CriarJogo('facil', celula);
        }
        const posicoes = [
            [-1, 0], 
            [0, -1], [0, 0], [0, 1],
            [1, 0]
        ];

       
            
        
        const cellVisitadas = new Set();

        function revelarCelulas(linha, coluna){
            const celulaID = `cell-${linha * 10 + coluna}`;
            
            // Verificar se já foi visitada ou está fora dos limites
            if(cellVisitadas.has(celulaID) || linha < 0 || linha >= 8 || coluna < 0 || coluna >= 10) {
                return;
            }

            cellVisitadas.add(celulaID);
            const elemento = document.getElementById(celulaID);
            const valor = tabuleiro[linha][coluna];
            if(valor !== 0){
                elemento.textContent = valor;
               
            }
            document.getElementById(celulaID).setAttribute('started-game', 'true');
            // Se for 0, revelar todas as células vizinhas
            if(valor === 0){
                elemento.classList.add('NumZero');
                for(const [x, y] of posicoes){
                    revelarCelulas(linha + x, coluna + y);
                }
            }
        }

        revelarCelulas(linhaClicada, colunaClicada);
    }
});