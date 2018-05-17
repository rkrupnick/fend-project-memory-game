// TODO: Add nice animation for match and not match

/*
 * Create a list that holds all of your card images
 */
const cardImages = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
  "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf",
  "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

/*
* Create array from card deck in HTML
*/
const deck = document.querySelectorAll('.card');
const cards = Array.from(deck);
const moves = document.querySelector('.moves');

let openCards = [];
let moveCounter = 0;
let matchCounter = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cardImages);

for (let i=0; i<cards.length; i++) {
  cards[i].children[0].classList.add(cardImages[i]);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 function showImage(e) {
  e.target.classList.add("open", "show"); // Add open and show class to clicked card
 }

 function openCardsMatch() {
  if (openCards.length === 2) {
    if (openCards[0].children[0].classList.value === openCards[1].children[0].classList.value) {
      lockMatchedCards(openCards);
      matchCounter += 1;
    }  else {
    setTimeout(function() {
      hideUnmatchedCards();
    }, 750)
  }
  checkWin();
 }
}

function checkWin() {
  if (matchCounter === 8) {
    alert(`You won! It took you ${moveCounter} turns!`);
  }
}

 function lockMatchedCards() {
  openCards[0].classList.add("match");
  openCards[1].classList.add("match");
  openCards = [];

 }

 function hideUnmatchedCards() {
  openCards[0].classList.remove("open", "show");
  openCards[1].classList.remove("open", "show");
  openCards = [];
 }

 function updateMoves() {
  moveCounter += 1;
  moves.innerText = moveCounter;
 }

 document.getElementById("deck").addEventListener("click", function(e) {
  if(e.target && e.target.nodeName == "LI") {
    showImage(e);
    openCards.unshift(e.target);    // Add clicked card to openCards array
    updateMoves();
    openCardsMatch(); // Check if cards Match
  }
 });
