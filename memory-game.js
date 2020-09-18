"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);
let c1;
let c1Color;

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    let card = document.createElement("div");

    card.setAttribute("class", color);
    card.addEventListener("click", handleCardClick); 
    document.getElementById("game").appendChild(card)
  }
}

/** Flip a card face-up. */
let counter = 0;

function flipCard(card) {
  // ... you need to write this ...
  
  if (counter < 2) {
    if(card !== c1  && card.getAttribute("class")!== c1Color) {
      card.style.backgroundColor = card.getAttribute("class");
      c1 = card;
      c1Color = card.getAttribute("class");
      // c1.getAttribute("class");
      // c1.classList.add("checked")
      // card.classList.add("checked");
      //counter++;
      console.log(c1Color);
    } 
    //counter++;
  }

  else if (card !== c1  && card.getAttribute("class") !== c1Color) {
    setTimeout(function() {unFlipCard(c1); unFlipCard(card)}, 1000);
    card.style.backgroundColor = card.getAttribute("class");
    console.log("card: ", card.getAttribute("class"), "c1: ", c1Color);
    console.log("NO-MATCH");
  }
  
  else if (card !== c1 && card.getAttribute("class") === c1Color) {
    card.style.backgroundColor = card.getAttribute("class");
    card.removeEventListener("click", handleCardClick);
    c1.removeEventListener("click", handleCardClick);
    c1Color = "";
    c1 = "";
    counter = 0;
    console.log("MATCH");
  }
  // else {
  //   counter = 0;
  // }
  console.log("c1Color: ", c1Color, "c1: ", c1, "c2Color: ", card.getAttribute("class"));
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // unflip after a set amount of time
  card.style.backgroundColor = "#fff";
  counter = 0;
  c1Color = "";
  c1 = "";
  console.log("WORKING");
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // flip card only if there are less than 2 cards already flipped
  counter++;
  if (counter <= 2) {
    console.log("clicked!", "counter: ", counter);
    flipCard(evt.target);
  }
}


                // if (card.getAttribute("class") !== c1) {
                //   card.style.backgroundColor = card.getAttribute("class");
                //   c1 = card.getAttribute("class");
                //   console.log("P2")
                // }
                // else {
                //   card.style.backgroundColor = card.getAttribute("class");
                // }

                // make sure there's only two cards
                // card.classList.add("checked");