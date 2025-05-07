import { CriarJogo } from "./GerarJogo.js";
import { getDificuldade,getTabuleiro,setTabuleiro} from "./dificuldade.js";

function mostrarModalGameOver() {
    document.getElementById('game-over-modal').style.display = 'flex';
    // Opcional: desabilita interações no tabuleiro
    // document.getElementById('tabuleiro').style.pointerEvents = 'none';
  }


document.addEventListener('pointerdown', (evento) => {
    if (evento.button !== 0) return;
    const celula = evento.target;


    
    if(celula.classList.contains('cell') && celula.getAttribute('started-game') !== 'true' && !celula.classList.contains('flagAdd')){

        let tabuleiro = getTabuleiro();

        if(!tabuleiro){
            const dificuldade = getDificuldade();
            const novotabuleiro = CriarJogo(dificuldade, celula);
            setTabuleiro(novotabuleiro);
            tabuleiro = novotabuleiro;
            console.log("Tabuleiro criado com dimensões:", tabuleiro.length, "x", tabuleiro[0].length);
        }
        const colunas = tabuleiro[0].length;
        
        const celulaid = celula.id;
        const numero = parseInt(celulaid.split('-')[1]);
        const linhaClicada = Math.floor(numero / colunas); 
        const colunaClicada = numero % colunas;
        const posicoes = [
            [-1, 0], 
            [0, -1], [0, 0], [0, 1],
            [1, 0]
        ];

       
            
        
        const cellVisitadas = new Set();

        function revelarCelulas(linha, coluna){
            const numColunas = tabuleiro[0].length;
            const celulaID = `cell-${linha * numColunas + coluna}`;
            
            
            if(cellVisitadas.has(celulaID) || linha < 0 || linha >= tabuleiro.length || coluna < 0 || coluna >= tabuleiro[0].length) {
                return;
            }

            cellVisitadas.add(celulaID);
            const elemento = document.getElementById(celulaID);
            const valor = tabuleiro[linha][coluna];
            if(valor !== 0){
                if(valor === -1){
                    elemento.classList.add('bombAdd');
                    mostrarModalGameOver();
                }else{
                    elemento.textContent = valor;

                }
                
               
            }
            document.getElementById(celulaID).setAttribute('started-game', 'true');
            
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

document.addEventListener('contextmenu',(evento) => {
    const celula = evento.target;
    
    if( celula.classList.contains('cell') ){


        if(!celula.textContent){

            if( !celula.classList.contains('flagAdd')){
                celula.classList.add('flagAdd');
                evento.preventDefault();
            }else{
                celula.classList.remove('flagAdd');
                evento.preventDefault();
            }
        }else{
            evento.preventDefault();
        }

    }
    
});
