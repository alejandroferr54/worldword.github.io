// Declaracion de elementos globales.
// ---------------------------------------------------
// Definiendo variables globales
let intentos = 6;
let intenta = 0;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
const VERDE = "#79b851";
const AMARILLO = "#f3c237";
const GRIS = "#a4aec4";
// Formula para conseguir valores aleatorios y asignarlo a palabra
let random = Math.floor(Math.random() * diccionario.length);
// Recogiendo elementos del html por su ID
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const grid = document.getElementById("grid");
const valor = input.value;
// 
let palabra;
// API
fetch ('https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase')
  .then(response => response.json())
  .then(response => {
    palabra = response[0]
    console.log(palabra + " <---- Palabra Correcta")
  })
  .catch(err => {
    console.log(err)
    palabra = diccionario[random]
    console.log(palabra + " <---- Palabra Correcta")
  })

// Eventos
button.addEventListener("click", principal);

window.addEventListener('load', () => {
    console.log('-------------------------------');
    console.log('PÁGINA HECHA POR LUIS FERREIRA');
    console.log('-------------------------------');
    console.log()
    console.log('La página por defecto usa api');
    console.log('Si quieres probar la funcionalidad aleatoria')
    console.log('Debes poner una letra y descomponer la api')
    console.log('La idea es usar la lista local en caso de error en api')
    console.log('-------------------------------');
})
input.addEventListener("input", updateValue);


// --FUNCIONES -----------------

// ---------------HANDLERS
// Conseguir el size de un elemento dom por ID
function conseguirSize(id) {
    let value = document.getElementById(id);
    let size = value.textLength;
    return size;
};
//  Filtro para saber si la entrada posee un número
function filtroNumber(valor) {
    let number = [1,2,3,4,5,6,7,8,9,0];
    for (let i in number) {
        if (valor.includes(number[i]) === true) {
            return false;
        }
    }
}
function antiUndefined(a) {
    let b = [undefined, null];
    for (let i in b) {
        if (a[i] === b[i]) {
            return true;
        }
    }
}
// Se modifica la entrada desde el input
// Si no tiene 5 caracteres no habilita su boton

function updateValue(e) {
    let filtro = e.srcElement.value
    let entrada = e.srcElement.textLength
    let fix = filtroNumber(filtro)
    if ((entrada === 5 || (fix === undefined))) {
        if ((fix !== false) || (filtro === undefined)) {
            button.style.backgroundColor = "#494846";
            button.disabled = false;
        } else {
            button.disabled = true;
            button.style.backgroundColor = GRIS;
        }
    } else {
        button.disabled = true;
        button.style.backgroundColor = "#757370";
    }
};
// Funcion al terminar 
function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
    contenedor.style.backdropFilter = 'invert(80%)';
}


// Se lee el intento y se consigue esa data
function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    intento = intento.trim(); // Eliminar especios en blanco
    return intento;
};

function antiTRIM(a) {
    let b = a
    return b.trim()
}
// Funcion principal
// ---------------FUNCION PRINCIPAL
function principal(){
    const INTENTO = antiTRIM(leerIntento());
    const ROW = document.createElement('div');
    ROW.className = 'row';
    let contenedor = document.getElementById('guesses');
    let size = document.getElementById("guess-input").value;
    size = size.length;
    console.log(palabra + " <---- Palabra Correcta");

    if ((size === 5) && (INTENTO !== palabra) && (intenta < intentos) && (antiUndefined(INTENTO) !== true) ) { // Condicionales
        // Si el tamaño de la palabra es igual a 5 debe ser exacto
        // Si el intento es diferente de la palabra aleatoria
        // Si el usuario no uso todos sus intentos
        intenta++ // Contador de intentos
        for (let i in palabra) {
            if ((INTENTO[i] === ' ') || (INTENTO[i] === undefined) || (INTENTO[i] === "UNDEFINED") || (INTENTO[i] === "undefined")) {
                terminar('Tienes espacios en blanco');
                setTimeout(() => {
                    location.reload()
                }, 4000);
            } else {
                console.log(intenta);
                const SPAN = document.createElement('span');
                SPAN.className = 'letter';
                if (INTENTO[i] === palabra[i] ) {
                    SPAN.innerHTML = INTENTO[i]; // El cuadradito.
                    SPAN.style.color = "#FFFFFF";
                    SPAN.style.borderColor = VERDE;
                    SPAN.style.backgroundColor = VERDE; // El color del fondo
                } else if (palabra.includes(INTENTO[i])) {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.color = "#FFFFFF";
                    SPAN.style.borderColor = AMARILLO;
                    SPAN.style.backgroundColor = AMARILLO;
                } else {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.color = "#FFFFFF";
                    SPAN.style.borderColor = GRIS;
                    SPAN.style.backgroundColor = GRIS;
                }
                ROW.appendChild(SPAN); // Se muetran los datos
            }
        } 
        grid.appendChild(ROW); // Se muestran los datos

    } else {
        if (INTENTO === palabra) {
            for (let i in INTENTO) {
                const SPAN = document.createElement('span');
                SPAN.className = 'letter';
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.color = "#FFFFFF";
                SPAN.style.borderColor = VERDE;
                SPAN.style.backgroundColor = VERDE;
                contenedor.style.fontFamily = "";
                ROW.appendChild(SPAN);
                grid.appendChild(ROW);
                contenedor.style.fontFamily = "Anton";
                contenedor.style.color = "#00000";
                terminar('GANASTE 😎');
                
            } 
        } else if (intenta === intentos ){
            terminar('Usaste todos tus intentos, la palabra era ' + palabra);
            setTimeout(() => {
                location.reload()
            }, 4000);
        } else {
            terminar('El valor debe tener 5 caracteres.');
            setTimeout(() => {
                location.reload()
            }, 4000);
        }
    }
}

