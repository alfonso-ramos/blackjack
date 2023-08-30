let deck = [

]
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

const crearDeck = () => {

    for( let i = 2; i <= 10; i++) {
        for( let tipo of tipos){
            deck.push( i + tipo)
        }
    }

    for (let tipo of tipos){
        for(let esp of especiales){
            deck.push( esp + tipo)
        }
    }

    deck = _.shuffle(deck)
    console.log(deck)

    return deck
}
crearDeck()
// Funcion para pedir carta

const pedirCarta = () => {

    if ( deck.length === 0 ){
        throw 'No hay mas cartas en el deck'
    }
    const ultimaCarta = deck.pop()

    return ultimaCarta
}
pedirCarta()