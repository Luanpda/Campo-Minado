function criarTabuleiroVazio(dificuldade) {
   if(dificuldade === 'facil') return Array.from({ length: 8 }, () => Array(10).fill(0));
   if(dificuldade === 'medio') return Array.from({ length: 14 }, () => Array(18).fill(0));
   if(dificuldade === 'dificil') return Array.from({ length: 20 }, () => Array(24).fill(0));
  }

function celulasProibidas(celula,colunas){
    console.log(celula);
    const celulaclicada = celula.id;
    const numero = parseInt(celulaclicada.split('-')[1]); 

    const linhaClicada = Math.floor(numero / colunas); 
    const colunaClicada = numero % colunas;
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
    
        const linhas = tabuleiro.length;
        const colunas = tabuleiro[0].length;
        
        const proibidas = celulasProibidas(celula,colunas);
        let bombasColocadas = 0;
        let bombas;

        if(dificuldade === 'facil') {
        bombas = 10;
        
        } else if(dificuldade === 'medio') {
        bombas = 40;

        } else if(dificuldade === 'dificil') {
        bombas = 70;  
         }
        
        while( bombasColocadas < bombas){
            const linha = Math.floor(Math.random() * linhas);
            const coluna = Math.floor(Math.random() * colunas);

            const éProibida = proibidas.some(([x, y]) => x === linha && y === coluna);


            if(tabuleiro[linha][coluna] !== -1 && !éProibida){
                tabuleiro[linha][coluna] = -1;
                bombasColocadas++;
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
                for(let j = 0; j < colunas; j++){
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
            

        } else if(dificuldade === 'medio'){
            for(let i = 0;i < linhas; i++){ 
                    for(let j = 0; j < colunas; j++){
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
                console.log(tabuleiro);
            

        } else if(dificuldade === 'dificil'){
            for(let i = 0;i < linhas; i++){ 
                for(let j = 0; j < colunas; j++){
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
    const tabuleiro = criarTabuleiroVazio(dificuldade);
    gerarBombas(dificuldade, tabuleiro, celula);
    colocarNumeros(dificuldade, tabuleiro); 
    return tabuleiro;
   
   
}

