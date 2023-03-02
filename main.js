//----------------------------------------------declaro variables-----------------------------
let estadoHorno = 'apagado';
let videoHornoActual;
let puertaHorno;
let puertaBloqueada = false;
let sonido;

//---------------------------------------------

window.onload = () => {
    videoHornoActual = document.getElementById('video-hornoJS');
    puertaHorno = document.getElementById('puerta-hornoJS');

    
//----------------para detectar cuando el user toca la puerta:
puertaHorno.onclick = () => {    
        avanzarAnimacion();    
}

//-----------------controla el estado en que se encuentra el horno----------------
function avanzarAnimacion(){    
    //depende de lo q' tenga como parámetro, ingresa a determinado case
    switch (estadoHorno) { 
        case 'apagado':    //------------------------pasos q' quiero q' se ejecuten:
            bloquearPuerta(true); //-----p/bloquear la puerta en los momentos en los q no queremos q el user interactue c/ el programa y resetee.
            reproducirSonido('audio_puerta', false);
            mostrarVideo();
            reproducirVideo('horno-abriendo-puerta')
            cuandoTerminaAvanzarA('cocinando');
            break;
        
        case 'cocinando':
            reproducirVideo('horno-cocinando');
            reproducirSonido('audio_timer', true);
            cuandoTerminaAvanzarA('tarta-lista'); //p/q' corra automáticamente la animación
            break;


    }
}

//-------------------------------------------------funciones q' usaré en el switch
function reproducirSonido(nombreSonido, loopearSonido) {
    sonido = new Audio(`${nombreSonido}.mp3`);
    sonido.play();
    sonido.loop = loopearSonido; //pasandole T o F para que haga en bucle o no
}

//-------------------------------
function mostrarVideo() {
    videoHornoActual.classList.remove('hidden');
}
//---------------------------------
function ocultarVideo() {
    videoHornoActual.classList.add('hidden');
}
//----------------------------------
function reproducirVideo(nombreVideo) {
    videoHornoActual.src = `${nombreVideo}.webm`;
    videoHornoActual.play();
}

//esta función se fija cuando termina el video, y apenas eso suceda, va a actualizar el estado con la funcion actualizarEstadoA()
function cuandoTerminaAvanzarA(estado) {
    videoHornoActual.onended = () => {
        actualizarEstadoA(estado);
        avanzarAnimacion();
    }
}


function actualizarEstadoA(estado){
    estadoHorno = estado;
}

function bloquearPuerta(traba) {
    puertaBloqueada = traba; //---q' corra la animación solo si la puerta no está bloqueada.
}


}