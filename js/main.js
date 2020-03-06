
var secciones = [];
var tiempo_splash = 5000;

window.onload = function(){
    inicializarReferencias();
    setTimeout(cambiarSplash, tiempo_splash);
}
function inicializarReferencias(){
    secciones[1] = document.getElementById("seccion_1");
    secciones[2] = document.getElementById("seccion_2");
    secciones[3] = document.getElementById("seccion_3");
    secciones[4] = document.getElementById("seccion_4");
    secciones[5] = document.getElementById("seccion_5");
    secciones[6] = document.getElementById("seccion_6");
    secciones[7] = document.getElementById("seccion_7");
    secciones[8] = document.getElementById("seccion_8");
    secciones[9] = document.getElementById("seccion_9");
    secciones[10] = document.getElementById("seccion_10");
    secciones[11] = document.getElementById("seccion_11");
    secciones[12] = document.getElementById("seccion_12");
    secciones[13] = document.getElementById("seccion_13");
    secciones[14] = document.getElementById("seccion_14");
    secciones[15] = document.getElementById("seccion_15");
}

function cambiarSplash(){
    secciones[1].className = "splash oculto";
    secciones[2].className = "inicio";
}

function cambiarSeccion(id_seccion){
    for (var i in secciones){
        secciones[i].classList.add("oculto");  
    }

    secciones[id_seccion].classList.add("animated");
    secciones[id_seccion].classList.add("headShake");
    secciones[id_seccion].classList.remove("oculto");
}
