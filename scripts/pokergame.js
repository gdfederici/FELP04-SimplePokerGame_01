
function createDeck() { // Goobo/Jack = 11, Donna/Queen = 12, Re/King = 13
    var deck = []; // Inizializzo il mazzo inserendo le carte 1->Re con 4 cicli, uno per ogni seme. / Create the deck by inserting cards 1->King with 4 cycles, one for each suit.
    for (i=1; i<14; i++) {
        deck.push({"value" : i, "suit" : "H"});        
    }
    for (i=1; i<14; i++) {
        deck.push({"value" : i, "suit" : "D"});        
    }
    for (i=1; i<14; i++) {
        deck.push({"value" : i, "suit" : "C"});        
    }
    for (i=1; i<14; i++) {
        deck.push({"value" : i, "suit" : "S"});        
    }
}


function createHand() { // Creo la mano del giocatore. / Create player's hand.
    var hand = []; 
    for (i=0; i<5; i++) { 
        let luck = Math.floor(Math.random() * deck.length); // Numero casuale che individua una carta all'interno del mazzo. / Random number that identifies a card in the deck.
        hand = hand.concat(deck.splice(luck,1)); // Inserire la carta casuale nella mano dal giocatore e al contempo eliminarla dal mazzo. / Insert the random card into the player's hand and remove it from the deck at the same time.
    }
}

function createHandTest() { /* ----- CREAZIONE MANUALE DELLA MANO PER FUNZIONI DI TEST ----- */
    hand = [
        { "value" : 2, "suit" : "H" },
        { "value" : 10, "suit" : "S" },
        { "value" : 11, "suit" : "D" },
        { "value" : 12, "suit" : "C" },
        { "value" : 13, "suit" : "H" },
    ];
}


function orderHand() { // Ordinare la mano del giocatore. / Order the player's hand.
    hand.sort(function (a, b) { return a.value - b.value; }); 
}


function pointsHand() { // Valutazione mano del giocatore. / Player's hand evaluation.
    let sameSuit = 0;
    let contStraight = 0;
    let contStraightA = 0;
    let sameValue = 0;
    let differentValue = [];

    for (i=0; i<hand.length-1; i++) { // Controllo Colore. / Check for Flush.
            if (hand[i].suit == hand[i+1].suit) { sameSuit++; };
    }
    if (sameSuit == 4) { 
        for (i=1; i<hand.length; i++) { // Controllo Scala Reale. / Check for Royal Flush.
            if (hand[i].value == 9+i) { contStraightA++; }
        }
        if (hand[0].value == 1 && contStraightA == 4) { points = 24; }
        else {
            for (i=0; i<hand.length-1; i++) { // Controllo Scala Colore. / Check for Straight Flush.
                if (hand[i].value+1 == hand[i+1].value) { contStraight++; }
            }
            if (contStraight == 4 ) { points = 23; } else { points = 20; }
        }
    }
    else {
        for (i=1; i<hand.length; i++) { // Controllo Scala all'Asso. / Check for Straight Ace.
            if (hand[i].value == 9+i) { contStraightA++; }
        }
        if (hand[0].value == 1 && contStraightA == 4) { points = 19; }
        else {
            for (i=0; i<hand.length-1; i++) { // Controllo Scala. / Check for Straight.
                if (hand[i].value+1 == hand[i+1].value) { contStraight++; }
            }
            if (contStraight == 4 ) { points = 18; }
            else {
                for (i=0; i<hand.length-1; i++) { // Controllo per le carte dello stesso valore. / Check for cards of the same rank. 
                    if (hand[i].value == hand[i+1].value) { sameValue++; }
                    else { differentValue = differentValue.concat(i); }
                }
                switch (sameValue) { // Grazie alla mano ordinata, il numero di carte uguali e la posizione delle diverse permettono la valutazione. / Thanks to the orderly hand, the number of identical cards and the position of the different ones allow evaluation.
                    case 3: // Poker e full. / Four of a Kind and Full House.
                        if (hand[1].value==hand[3].value) { points = 22; }
                        else { points = 21; }
                        break;
                    case 2: // Tris e Doppia Coppia. / Three of a Kind and Two Pair.
                        if ( (differentValue[0] == 2 && differentValue[1] == 3) || (differentValue[0] == 0 && differentValue[1] == 3) || (differentValue[0] == 0 && differentValue[1] == 1) ) { points = 17; }
                        else { points = 16; }
                        break;
                    case 1: // Coppia. / Pair.
                        points = 15;
                        break;
                    case 0: // Carta più alta. / High card.
                        points = hand[4].value;
                        break;
                    default: // Errore. / Some go wrong.
                        points = 0;
                }
            }
        }
    }
}


function displayHand() {
    let cardValue = "";
    messageStart = "Le tue carte. / Your cards:<br/><ul>";
    for (i=0; i<hand.length; i++) {
        switch (hand[i].value) {
            case 13:
                cardValue = "K";
                break;
            case 12:
                cardValue = "Q";
                break;
            case 11:
                cardValue = "J";
                break;
            default:
                cardValue = hand[i].value;
        } 
        messageStart += "<li>" + cardValue + "<sup>" + hand[i].suit + "</sup></li>";
        cardValue = "";
    }
    messageStart += "</ul>";
    document.getElementById("simplepokergame-start").innerHTML = messageStart;
}


function displayPoints () {
    var finalPoint = "";
    switch (points) {
        case 24:  
            finalPoint = "Scala Reale / Royal Flush";
            break;
        case 23:  
            finalPoint = "Scala Colore / Straight Flush";
            break;
        case 22:  
            finalPoint = "Poker / Four of a Kind";
            break;
        case 21:  
            finalPoint = "Full / Full House";
            break;
        case 20:  
            finalPoint = "Colore / Flush";
            break;
        case 19:  
            finalPoint = "Scala all'Asso / Straight Ace";
            break;
        case 18:  
            finalPoint = "Scala / Straight";
            break;
        case 17:  
            finalPoint = "Tris / Three of a Kind";
            break;
        case 16:  
            finalPoint = "Doppia Coppia / Two Pair";
            break;
        case 15:  
            finalPoint = "Coppia / Pair";
            break;
        case 13:  
            finalPoint = "Carta più alta -> Re / High Card -> King";
            break;
        case 12:  
            finalPoint = "Carta più alta -> Donna / High Card -> Queen";
            break;
        case 11:  
            finalPoint = "Carta più alta -> Goobbo / High Card -> Jack";
            break;
        case 10:  
            finalPoint = "Carta più alta -> 10 / High Card -> 10";
            break;
        case 9:  
            finalPoint = "Carta più alta -> 9 / High Card -> 9";
            break;
        case 8:  
            finalPoint = "Carta più alta -> 8 / High Card -> 8";
            break;
        case 7:  
            finalPoint = "Carta più alta -> 7 / High Card -> 7";
            break;
        case 6:  
            finalPoint = "Carta più alta -> 6 / High Card -> 6";
            break;
        case 5:  
            finalPoint = "Carta più alta -> 5 / High Card -> 5";
            break;
        case 4:  
            finalPoint = "Carta più alta -> 4 / High Card -> 4";
            break;
        case 3:  
            finalPoint = "Carta più alta -> 3 / High Card -> 3";
            break;
        case 2:  
            finalPoint = "Carta più alta -> 2 / High Card -> 2";
            break;
        case 1:  
            finalPoint = "Carta più alta -> 1 / High Card -> 1";
            break;
        default:
            finalPoint = "Errore. / Some go wrong.";
    }
    document.getElementById("simplepokergame-end").innerHTML = finalPoint;
}

var points = 0;
createDeck();
createHandTest();
displayHand();
orderHand();
pointsHand();
displayPoints();