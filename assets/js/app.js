let deck = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0
let puntosComputadora = 0

// Referencias en el DOM
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')

const cartasJugador = document.querySelector('#jugador-cartas')
const cartasComputadora = document.querySelector("#computadora-cartas")

// const advertisement = document.querySelector("#advertisement")

let puntajes = document.querySelectorAll('small')

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo)
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    }

    deck = _.shuffle(deck)
    return deck
}
crearDeck()

// Funcion para pedir carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay mas cartas en el deck'
    }
    const ultimaCarta = deck.pop()

    return ultimaCarta
}

// valor de cartas
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1)

    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1

    // if(isNaN(valor)) {
    //     puntos = (valor === 'A') ? 11 : 10
    // } else {
    //     puntos = valor * 1
    // }
    // return valor
}

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta()
        puntosComputadora = puntosComputadora + valorCarta(carta)
        puntajes[1].innerText = puntosComputadora

        const imgCarta = document.createElement('img')
        imgCarta.src = `../cartas/${carta}.png`
        imgCarta.classList.add('carta')
        cartasComputadora.append(imgCarta)

        if (puntosJugador > 21) {
            break
        }
    } while (
        (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21)
    )

    // Alertas que anuncian quien gano el juego

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Empate')
        } else if (puntosMinimos > 21) {
            alert('Computadora Gana')
        } else if (puntosComputadora > 21) {
            alert('Jugador Gana')
        } else {
            alert('Empate')
        }
    }, 10)
}

// Eventos

// Evento para que el usuario tome una carta
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta()
    puntosJugador = puntosJugador + valorCarta(carta)
    puntajes[0].innerText = puntosJugador

    const imgCarta = document.createElement('img')
    imgCarta.src = `../cartas/${carta}.png`
    imgCarta.classList.add('carta')
    cartasJugador.append(imgCarta)

    if (puntosJugador > 21) {
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugador)
    } else if (puntosJugador === 21) {
        btnPedir.disabled = true
        btnDetener.disabled = true
    }
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugador)
})
