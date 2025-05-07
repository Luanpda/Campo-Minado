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
       
       

        if(dificuldade === 'facil') {
        
        const bombasPorQuadrante = 4;
        colocarBombas(0, linhas / 2,0, colunas / 2,bombasPorQuadrante,tabuleiro,proibidas);
        //superior direito
        colocarBombas(0, linhas/2, colunas/2 , colunas,bombasPorQuadrante,tabuleiro,proibidas);
        //inferior esquerdo
        colocarBombas(linhas/2, linhas,0,colunas/2,bombasPorQuadrante,tabuleiro,proibidas);
        //inferior direito
        colocarBombas(linhas/2, linhas,colunas/2,colunas,bombasPorQuadrante,tabuleiro,proibidas);;
        
        } else if(dificuldade === 'medio') {
        
        const bombasPorQuadrante = 10;
        colocarBombas(0, linhas / 2,0, colunas / 2,bombasPorQuadrante,tabuleiro,proibidas);
        //superior direito
        colocarBombas(0, linhas/2, colunas/2 , colunas,bombasPorQuadrante,tabuleiro,proibidas);
        //inferior esquerdo
        colocarBombas(linhas/2, linhas,0,colunas/2,bombasPorQuadrante,tabuleiro,proibidas);
        //inferior direito
        colocarBombas(linhas/2, linhas,colunas/2,colunas,bombasPorQuadrante,tabuleiro,proibidas);;

        } else if(dificuldade === 'dificil') {
        
        const bombasPorQuadrante = 18;

        //superior esquerdo
        colocarBombas(0, linhas / 2,0, colunas / 2,bombasPorQuadrante,tabuleiro,proibidas);
        //superior direito
        colocarBombas(0, linhas/2, colunas/2 , colunas,bombasPorQuadrante,tabuleiro,proibidas);
        //inferior esquerdo
        colocarBombas(linhas/2, linhas,0,colunas/2,bombasPorQuadrante,tabuleiro,proibidas);
        //inferior direito
        colocarBombas(linhas/2, linhas,colunas/2,colunas,bombasPorQuadrante,tabuleiro,proibidas);

    }
        
       
    
}

function colocarBombas(LinhaIic, LinhaFin,ColunaInic,ColunaFinal,Quantidade,tabuleiro,proibidas){
    let colocadas = 0;
    while(colocadas < Quantidade){
        const linha = Math.floor(Math.random() * (LinhaFin - LinhaIic)) + LinhaIic;
        const coluna = Math.floor(Math.random() * (ColunaFinal - ColunaInic)) + ColunaInic;

        const éProibida = proibidas.some(([x, y]) => x === linha && y === coluna);

        if (tabuleiro[linha][coluna] !== -1 && !éProibida) {
            tabuleiro[linha][coluna] = -1;
            colocadas++;
        }
    }
    return colocadas;

}

function colocarNumeros(dificuldade,tabuleiro){
    const linhas = tabuleiro.length;
    const colunas = tabuleiro[0].length;
    const posicoes = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];

    function posicionarNum(linhas,colunas){
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


    if(dificuldade === 'facil'){
       posicionarNum(linhas,colunas)
            

        } else if(dificuldade === 'medio'){
            posicionarNum(linhas,colunas)
            console.log(tabuleiro);
            

        } else if(dificuldade === 'dificil'){
            posicionarNum(linhas,colunas);
            console.log(tabuleiro);
        }



        
    }



export function CriarJogo(dificuldade,celula){
    const tabuleiro = criarTabuleiroVazio(dificuldade);
    gerarBombas(dificuldade, tabuleiro, celula);
    colocarNumeros(dificuldade, tabuleiro); 
    return tabuleiro;
   
   
}

