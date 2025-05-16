let JogoDif = null;
let tabuleiro = null;

export function setDificuldade(dificuldade){
    JogoDif = dificuldade;
}

export function getDificuldade(){
    return JogoDif;
}


export function getTabuleiro() {
    return tabuleiro;
}

export function setTabuleiro(novoTabuleiro) {
    tabuleiro = novoTabuleiro;
}3

export function resetarTabuleiro() {
    tabuleiro = null;
}