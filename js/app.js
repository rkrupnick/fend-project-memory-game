// TODO: Add nice animation for match and not match

/*
 * Create a list that holds all of your card images
 */
const standardImages = ["fa-gem", "fa-gem", "fa-paper-plane", "fa-paper-plane",
  "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf",
  "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

const starWarsImages = ["fa-mandalorian", "fa-mandalorian", "fa-old-republic",
  "fa-old-republic", "fa-rebel", "fa-rebel", "fa-sith", "fa-sith", "fa-galactic-senate",
  "fa-galactic-senate", "fa-galactic-republic", "fa-galactic-republic", "fa-empire",
  "fa-empire", "fa-first-order", "fa-first-order"];

const transportationImages = ["fa-ambulance", "fa-ambulance", "fa-bus", "fa-bus",
  "fa-car", "fa-car", "fa-fighter-jet", "fa-fighter-jet", "fa-helicopter", "fa-helicopter",
  "fa-space-shuttle", "fa-space-shuttle", "fa-subway", "fa-subway", "fa-taxi", "fa-taxi"];
/*
* Create array from card deck in HTML
*/
const deck = document.querySelectorAll(".card");
const cards = Array.from(deck);
const moves = document.querySelector(".moves");
const stars = document.querySelector(".stars");
const restart = document.querySelector(".restart");
const choices = document.querySelector("#choices");
const close = document.querySelector(".close");
const modal = document.getElementById("modal");
const endGame = document.querySelector(".end-game");
const no = document.querySelector(".no");
const yes = document.querySelector(".yes");

let openCards = [];
let moveCounter = 0;
let matchCounter = 0;
let numberStars = 3;
let cardImages = standardImages;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
startGame();

function startGame() {
  shuffle(cardImages);
  addImagestoCards();
}

function addImagestoCards() {
  for (let i=0; i<cards.length; i++) {
    cards[i].children[0].classList.add(cardImages[i]);
  }
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
    endGame.innerText = `You won! It took you ${moveCounter} turns! You finished with ${numberStars} stars!`;
    modal.style.display = "block";
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
  if (moveCounter === 21) {
    numberStars = 2;
    removeStar(0);
  }
  else if (moveCounter === 31) {
    numberStars = 1;
    removeStar(1);
  }
}

function removeStar(star) {
  stars.children[star].children[0].classList.remove("fa");
  stars.children[star].children[0].classList.add("far");
}

function resetStars() {
  stars.children[0].children[0].classList.remove("far");
  stars.children[0].children[0].classList.add("fa");
  stars.children[1].children[0].classList.remove("far");
  stars.children[1].children[0].classList.add("fa");
}

function startAgain() {
  for (let i=0; i<cards.length; i++) {
    if (cardImages === starWarsImages) {
      cards[i].children[0].classList = "fab";
    } else {
    cards[i].children[0].classList = "fa";
    }
    cards[i].classList = "card";
  }
  moveCounter = 0;
  moves.innerText = moveCounter;
  matchCounter = 0;
  resetStars();
  startGame();
}

document.getElementById("deck").addEventListener("click", function(e) {
  if(e.target && e.target.nodeName == "LI") {
    showImage(e);
    openCards.unshift(e.target);    // Add clicked card to openCards array
    updateMoves();
    openCardsMatch(); // Check if cards Match
  }
});

restart.addEventListener("click", function() {
  startAgain();
})

choices.addEventListener("click", function(e) {
  if(e.target && e.target.nodeName == "LI") {
    if (e.target.classList.value === "standard choice") {
      cardImages = standardImages;
      startAgain();
    } else if (e.target.classList.value === "star-wars choice") {
      cardImages = starWarsImages;
      startAgain();
    }
    else if (e.target.classList.value === "transportation choice") {
      cardImages = transportationImages;
      startAgain();
    }
  }
});

// To close the modal
close.addEventListener("click", function() {
  modal.style.display = "none";
})

no.addEventListener("click", function() {
  modal.style.display = "none";
})

// To restart from modal
yes.addEventListener("click", function() {
  startAgain();
})
