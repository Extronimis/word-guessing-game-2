let qwerty = document.querySelectorAll(`#qwerty .keyrow button`);
let phrase = document.getElementById('phrase');
let missed = 0;

let start = document.querySelector('#overlay a');
start.addEventListener('click', ()=>{
  let startScreen = document.querySelector(`#overlay`);
  startScreen.style.display = `none`;
   start.addEventListener('click', ()=>{
     console.log('click');
     let list = document.querySelector(`#phrase ul`);
     list.innerHTML = '';
     addPhraseToDisplay(getRandomPhraseAsArray(phrases));
     qwerty.forEach(qwerty => {
       qwerty.classList.remove('chosen');
       qwerty.disabled = false;
     });
     missed= 0;
     const attempts = document.querySelectorAll(`#scoreboard .tries img`);
     attempts.forEach(attempts => {
       attempts.src = "images/liveHeart.png";
     });
     letter.forEach(letter => {
       letter.classList.remove('show');
     });
   });
});

const phrases = [
  `May The Force Be With You`,
  `Kill Two Birds With One Stone`,
  `Another One Bites The Dust`,
  `Hypertext Markup Language`,
  `Cascading Styling Sheets`
];

function randomPhrase(){
  const randomPhrase = Math.floor(Math.random()*5);
  return randomPhrase;
}

function getRandomPhraseAsArray(arr) {
  var splitArray = [];
  var number = randomPhrase();
  splitArray = arr[number];
  return splitArray.split("");
}
var phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
  const item = document.createElement('li');
  const list = document.querySelector(`#phrase ul`);
  item.textContent = arr[i];
  list.append(item);
    if (item.textContent === " ") {
      item.className = "space";
    } else {
      item.className = "letter";
    }
  }}

addPhraseToDisplay(phraseArray);

let button;
for (var i=0; i<qwerty.length; i++) {
  qwerty[i].addEventListener('click', function(event){
    button = event.target;
    console.log(button.textContent);
    button.classList.add("chosen");
    button.disabled = true;
    checkLetter(button);
    if (checkLetter(button) === null) {
      missed ++;
      const attempts = document.querySelector(`#scoreboard .tries img[src="images/liveHeart.png"]`);
      console.log(attempts);
      attempts.src = "images/lostHeart.png";
    }
      show = document.querySelectorAll(`#phrase .show`);
      let overlay = document.querySelector(`#overlay`);
      let overlayText = document.querySelector(`#overlay .title`);
      var letter = document.querySelectorAll('.letter');
      if ( show.length === letter.length  ) {
        overlay.style.display = `flex`;
        overlay.classList.add("win");
        overlayText.innerHTML = '<h2> Congrats! You win!</h2>';
        overlay.classList.remove('lose');

      } if (missed >= 5) {
        overlay.style.display = `flex`;
        overlay.classList.add("lose");
        overlay.classList.remove('win');
        overlayText.innerHTML = '<h2> UH OH! You lose! Retry?</h2>';
      }
    });
  }


var letter = document.querySelectorAll('.letter');
console.log(letter);

function checkLetter(button) {
  var letter = document.querySelectorAll('.letter');
  let letterFound = null;
  for (let i = 0; i < letter.length; i++) {
    if (letter[i].textContent.toLowerCase() === button.textContent) {
    letter[i].classList.add("show");
    letterFound = button.textContent;
  }
}
return letterFound;
}
