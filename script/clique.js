import { CriarJogo } from "./GerarJogo.js";
import { getDificuldade,getTabuleiro,setTabuleiro} from "./dificuldade.js";
import { getTempo, iniciarCronometro, pararCronometro } from "./cronometro.js";

let cronometroDOMAtivo = false; 


function mostrarModalGameOver() {
    document.getElementById('game-over-modal').style.display = 'flex';
   
  }


document.addEventListener('pointerdown', (evento) => {
    if (evento.button !== 0) return;
    const celula = evento.target;


    
    if(celula.classList.contains('cell') && celula.getAttribute('started-game') !== 'true' && !celula.classList.contains('flagAdd')){
        if (!cronometroDOMAtivo){
            iniciarCronometro();
            cronometroDOMAtivo = true;
        }








        let tabuleiro = getTabuleiro();

        if(!tabuleiro){
            const dificuldade = getDificuldade();
            const novotabuleiro = CriarJogo(dificuldade, celula);
            setTabuleiro(novotabuleiro);
            tabuleiro = novotabuleiro;
            console.log("Tabuleiro criado com dimensões:", tabuleiro.length, "x", tabuleiro[0].length);
            console.log(tabuleiro);
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

        function revelarCelulas(linha, coluna) {
            
            const numColunas = tabuleiro[0].length;
            const celulaID = `cell-${linha * numColunas + coluna}`;

            if (
                cellVisitadas.has(celulaID) ||
                linha < 0 || linha >= tabuleiro.length ||
                coluna < 0 || coluna >= tabuleiro[0].length
            ) return;

            cellVisitadas.add(celulaID);

            const elemento = document.getElementById(celulaID);
            const valor = tabuleiro[linha][coluna];

            if (valor === -1) {
                elemento.classList.add('bombAdd');
                pararCronometro();
                mostrarModalGameOver();
            } else if (valor === 0) {
                elemento.classList.add('NumZero');
                elemento.setAttribute('started-game', 'true');

            
                const cruz = [
                    [-1, 0], [0, -1], [0, 1], [1, 0]
                ];
                for (const [dx, dy] of cruz) {
                    revelarCelulas(linha + dx, coluna + dy);
                }

            
                const diagonais = [
                    [-1, -1], [-1, 1], [1, -1], [1, 1]
                ];
                for (const [dx, dy] of diagonais) {
                    const l = linha + dx;
                    const c = coluna + dy;
                    const id = `cell-${l * numColunas + c}`;
                    if (
                        l >= 0 && l < tabuleiro.length &&
                        c >= 0 && c < tabuleiro[0].length &&
                        !cellVisitadas.has(id)
                    ) {
                        const valorDiagonal = tabuleiro[l][c];
                        const el = document.getElementById(id);
                        if (valorDiagonal > 0) {
                            el.textContent = valorDiagonal;
                            el.setAttribute('started-game', 'true');
                            cellVisitadas.add(id);
                        }
                    }
                }
            } else {
                elemento.textContent = valor;
                elemento.setAttribute('started-game', 'true');
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
