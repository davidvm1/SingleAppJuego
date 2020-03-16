var canvas = document.getElementById("juego");
var ctx = canvas.getContext("2d");

var puntaje = document.getElementById("puntos");
var max_puntaje = document.getElementById("maxpuntos");

var puntaje_perder = document.getElementById("puntaje_perder");
var puntaje_max_perder = document.getElementById("puntaje_max_perder");

var puntos = 0;
var tamaño = 3;
var ancho = canvas.width / tamaño - 7;
var fontSize;

var celdas = [];
var perder = false;

var imagenes = [];
var patron;

var localStorageName = "puntaje_max"
var maximos_puntos;


comenzarJuego();

function comenzarJuego() {
    puntos = 0
    puntaje.innerHTML = puntos;
    canvas.style.opacity = "100";
    inicializarPuntajeMaximo();    
    inicializarImagenes();
    crearCeldas();
    dibujarCeldas();
    pegarCelda();
    pegarCelda();
}

function inicializarPuntajeMaximo(){
    maximos_puntos = localStorage.getItem(localStorageName) == null ? 0 : localStorage.getItem(localStorageName);
    max_puntaje.innerHTML = maximos_puntos; 
}

function inicializarImagenes() {
    imagenes[0] = document.getElementById("cuadro_1");
    imagenes[1] = document.getElementById("cuadro_2");
    imagenes[2] = document.getElementById("cuadro_3");
    imagenes[3] = document.getElementById("cuadro_4");
    imagenes[4] = document.getElementById("cuadro_5");
    imagenes[5] = document.getElementById("cuadro_6");
    imagenes[6] = document.getElementById("cuadro_7");
    imagenes[7] = document.getElementById("cuadro_8");
    imagenes[8] = document.getElementById("cuadro_9");
    imagenes[9] = document.getElementById("cuadro_10");
}

function celda(fila, columna) {
    this.valor = 0;
    this.x = columna * ancho + 5 * (columna + 1);
    this.y = fila * ancho + 5 * (fila + 1);

}

function crearCeldas() {
    for (var i = 0; i < tamaño; i++) {
        celdas[i] = [];
        for (var j = 0; j < tamaño; j++) {
            celdas[i][j] = new celda(i, j);

        }
    }
}

function dibujarCelda(celda) {
    ctx.beginPath();
    ctx.rect(celda.x, celda.y, ancho, ancho);

    switch (celda.valor) {
        case 0: ctx.fillStyle = "#FFFFFF"; break;

        case 2:
            patron = ctx.createPattern(imagenes[0], 'repeat');
            ctx.fillStyle = patron;
            break;

        case 4:
            patron = ctx.createPattern(imagenes[1], 'repeat');
            ctx.fillStyle = patron;
            break;

        case 8:
            patron = ctx.createPattern(imagenes[2], 'repeat');
            ctx.fillStyle = patron;
            break;

        case 16:
            patron = ctx.createPattern(imagenes[3], 'repeat');
            ctx.fillStyle = patron;
            break;

        case 32:
            patron = ctx.createPattern(imagenes[4], 'repeat');
            ctx.fillStyle = patron;
            break;

        case 64:
            patron = ctx.createPattern(imagenes[5], 'repeat');
            ctx.fillStyle = patron;
            break;

        case 128:
            patron = ctx.createPattern(imagenes[6], 'repeat');
            ctx.fillStyle = patron;
            break;

        case 256:
            patron = ctx.createPattern(imagenes[7], 'repeat');
            ctx.fillStyle = patron;
            break;

        case 512:
            patron = ctx.createPattern(imagenes[8], 'repeat');
            ctx.fillStyle = patron;
            break;

        case 1024:
            patron = ctx.createPattern(imagenes[9], 'repeat');
            ctx.fillStyle = patron;
            break;

        default: ctx.fillStyle = "#FFFFFF";
    }

    ctx.fill();

    if (celda.valor) {
        fontSize = ancho / 2;
        ctx.font = fontSize + "px Arial;"
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(celda.valor, celda.x + ancho / 2, celda.y + ancho / 2);
    }
}

function dibujarCeldas() {
    for (var i = 0; i < tamaño; i++) {
        for (var j = 0; j < tamaño; j++) {
            dibujarCelda(celdas[i][j]);
        }
    }
}

function pegarCelda() {
    var contador = 0;
    for (var i = 0; i < tamaño; i++) {
        for (var j = 0; j < tamaño; j++) {
            if (!celdas[i][j].valor) {
                contador++;
            }
        }
    }

    if (!contador) {
        terminarJuego();
        return;
    }

    while (true) {
        var fila = Math.floor(Math.random() * tamaño);
        var columna = Math.floor(Math.random() * tamaño);
        if (!celdas[fila][columna].valor) {
            celdas[fila][columna].valor = 2 * Math.ceil(Math.random() * 2);
            dibujarCeldas();
            return;
        }
    }
}

function moverArriba() {
    if (!perder) {
        for (var j = 0; j < tamaño; j++) {
            for (var i = 1; i < tamaño; i++) {
                if (celdas[i][j].valor) {
                    var fila = i;
                    while (fila > 0) {
                        if (!celdas[fila - 1][j].valor) {
                            celdas[fila - 1][j].valor = celdas[fila][j].valor;
                            celdas[fila][j].valor = 0;
                            fila--;
                        }
                        else if (celdas[fila - 1][j].valor == celdas[fila][j].valor) {
                            celdas[fila - 1][j].valor *= 2;
                            puntos += celdas[fila - 1][j].valor;
                            celdas[fila][j].valor = 0;
                            break;
                        }
                        else {
                            break;
                        }
                    }
                }

            }
        }
        puntaje.innerHTML = puntos;
        pegarCelda();
    }
}

function moverAbajo() {
    if (!perder) {
        for (var j = 0; j < tamaño; j++) {
            for (var i = tamaño - 2; i >= 0; i--) {
                if (celdas[i][j].valor) {
                    var fila = i;
                    while (fila + 1 < tamaño) {
                        if (!celdas[fila + 1][j].valor) {
                            celdas[fila + 1][j].valor = celdas[fila][j].valor;
                            celdas[fila][j].valor = 0;
                            fila++;
                        }
                        else if (celdas[fila + 1][j].valor == celdas[fila][j].valor) {
                            celdas[fila + 1][j].valor *= 2;
                            puntos += celdas[fila + 1][j].valor;
                            celdas[fila][j].valor = 0;
                            break;
                        }
                        else {
                            break;
                        }
                    }
                }

            }
        }
        puntaje.innerHTML = puntos;
        pegarCelda();
    }
}

function moverDer() {
    if (!perder) {
        for (var i = 0; i < tamaño; i++) {
            for (var j = tamaño - 2; j >= 0; j--) {
                if (celdas[i][j].valor) {
                    var col = j;
                    while (col + 1 < tamaño) {
                        if (!celdas[i][col + 1].valor) {
                            celdas[i][col + 1].valor = celdas[i][col].valor;
                            celdas[i][col].valor = 0;
                            col++;
                        }
                        else if (celdas[i][col].valor == celdas[i][col + 1].valor) {
                            celdas[i][col + 1].valor *= 2;
                            puntos += celdas[i][col + 1].valor;
                            celdas[i][col].valor = 0;
                            break;
                        }
                        else {
                            break;
                        }
                    }
                }

            }
        }
        puntaje.innerHTML = puntos;
        pegarCelda();
    }
}

function moverIzq() {
    if (!perder) {
        for (var i = 0; i < tamaño; i++) {
            for (var j = 1; j < tamaño; j++) {
                if (celdas[i][j].valor) {
                    var col = j;
                    while (col - 1 >= 0) {
                        if (!celdas[i][col - 1].valor) {
                            celdas[i][col - 1].valor = celdas[i][col].valor;
                            celdas[i][col].valor = 0;
                            col--;
                        }
                        else if (celdas[i][col].valor == celdas[i][col - 1].valor) {
                            celdas[i][col - 1].valor *= 2;
                            puntos += celdas[i][col - 1].valor;
                            celdas[i][col].valor = 0;
                            break;
                        }
                        else {
                            break;
                        }
                    }
                }

            }
        }
        puntaje.innerHTML = puntos;
        pegarCelda();
    }
}

function terminarJuego() {
    canvas.style.opacity = "0.5";
    loss = true
    
    maximos_puntos = Math.max(puntos, maximos_puntos);
    localStorage.setItem(localStorageName, maximos_puntos);

    puntaje_perder.innerHTML = puntos;
    puntaje_max_perder.innerHTML = maximos_puntos;

    cambiarSeccion(18);
    comenzarJuego();

}