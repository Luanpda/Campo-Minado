function criarTabuleiroVazio(dificuldade) {
   if(dificuldade === 'facil') return Array.from({ length: 8 }, () => Array(10).fill(0));
   if(dificuldade === 'medio') return Array.from({ length: 14 }, () => Array(18).fill(0));
   if(dificuldade === 'dificil') return Array.from({ length: 24 }, () => Array(10).fill(0));
  }

function celulasProibidas(celula){
    console.log(celula);
    const celulaclicada = celula.id;
    const numero = parseInt(celulaclicada.split('-')[1]); 

    const linhaClicada = Math.floor(numero / 10); 
    const colunaClicada = numero % 10;
    const proibidas = [];
    const posicoes = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0,0],[0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];

    for(const [x,y] of posicoes){
        const novalinha = linhaClicada + x;
        const novacoluna = colunaClicada + y;
        proibidas.push([novalinha,novacoluna])
    }
    return proibidas;
}






function gerarBombas(dificuldade,tabuleiro,celula){
    if(dificuldade === 'facil'){
        const linhas = tabuleiro.length;
        const colunas = tabuleiro[0].length;
        console.log('gerarbomba'+celula);
        const proibidas = celulasProibidas(celula);
        let bombasColocadas = 0;
        
        
        while( bombasColocadas < 10){
            const linha = Math.floor(Math.random() * linhas);
            const coluna = Math.floor(Math.random() * colunas);

            const éProibida = proibidas.some(([x, y]) => x === linha && y === coluna);


            if(tabuleiro[linha][coluna] !== -1 && !éProibida){
                tabuleiro[linha][coluna] = -1;
                bombasColocadas++;
            }
        }
    }
}

function colocarNumeros(dificuldade,tabuleiro){
    const linhas = tabuleiro.length;
    const colunas = tabuleiro[0].length;
    const posicoes = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];
    if(dificuldade === 'facil'){
        for(let i = 0;i < linhas; i++){ 
                for(let j = 0; j < 10; j++){
                    if(tabuleiro[i][j] === -1){
                        for(const [x,y] of posicoes){
                            const novalinha = x + i;
                            const novacoluna = y + j;

                            if (
                                novalinha >= 0 && novalinha < linhas &&
                                novacoluna >= 0 && novacoluna < colunas &&
                                tabuleiro[novalinha][novacoluna] !== -1
                              ) {
                                tabuleiro[novalinha][novacoluna] += 1;
                              }

                        }

                        }
                    }

            }
            

        }
    }



export function CriarJogo(dificuldade,celula){
    const dificulty = dificuldade;
    const cell = celula;
    console.log("criarjogo"+cell);
    if(dificulty === 'facil'){
        const tabuleiro = criarTabuleiroVazio(dificulty);
        gerarBombas(dificulty,tabuleiro,cell);
        colocarNumeros(dificulty,tabuleiro);
        return tabuleiro;
        
    }
}

