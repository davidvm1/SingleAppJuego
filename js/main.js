
var secciones = [];
var tiempo_splash = 7000;

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
