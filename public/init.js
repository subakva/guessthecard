function initPage() {
  var gtc = new GuessTheCard();

  var sender = document.getElementById('sender-img');
  var message = document.getElementById('message');
  var speechBubble = document.getElementById('speech-bubble');
  var valuesContainer = document.getElementById('values');
  var suitsContainer = document.getElementById('suits');

  /* Set up the value buttons. */
  var selectedValue = document.getElementById('selected-value');
  for(var i = 0; i < gtc.values.length; i++) {
    var valueButton = gtc.createValueButton(gtc.values[i], function(button, value) {
      selectedValue.innerHTML = value.name;
    });
    valuesContainer.appendChild(valueButton);
  }
  
  /* Set up the suit buttons. */
  var selectedSuit = document.getElementById('selected-suit');
  for(var i = 0; i < gtc.suits.length; i++) {
    var suitButton = gtc.createSuitButton(gtc.suits[i], function(button, suit) {
      selectedSuit.innerHTML = suit.name + 's';
    });
    suitsContainer.appendChild(suitButton);
  }

  setMessage();

  /* Set up the guess button. */
  var guess = document.getElementById('guess');
  guess.addEventListener('click', function() {
    var secret = gtc.secretCard;
    var fileName = secret.value.shortName.toLowerCase() + '-' + secret.suit.name.toLowerCase() + '.jpg';
    if (gtc.guessIsCorrect()) {
      var imgPath = 'wowee/' + fileName;
      setMessage(imgPath, 'THAT\'S IT!', 'THAT\'S IT!');
    } else {
      var imgPath = 'notsomuch/' + fileName;
      setMessage(imgPath, 'No.', 'No.<br/>Alright, one more. Concentrate this time.');
    }
  }, false);

  var newCard = document.getElementById('new-card');
  newCard.addEventListener('click', function() {
    setMessage();
    reset();
  }, false);

  var askTim = document.getElementById('ask-tim');
  askTim.addEventListener('click', function() {
    setMessage('tim-bubble.jpg', 'Tim says...', '<em>Trust in Terrence.<br/>God is on his side.</em>', true);
    var color = gtc.secretCard.suit.color;
    speechBubble.innerHTML = 'I think it\'s a ' + color + ' card, dude. I\'m almost sure of it. I\'d stake my reputation on it.';
  }, false);

  function setMessage(image, alt, text, showBubble) {
    sender.src = 'images/' + (image ? image : 'guess.jpg');
    sender.alt = alt ? alt : 'Guess the card.';
    message.innerHTML = text ? text : 'Tune in to my mind. I&apos;m sending you an image of the card...';
    speechBubble.style.display = showBubble ? 'block' : 'none';
  }

  function reset() {
    gtc.reset();
    selectedSuit.innerHTML = gtc.suitGuess.name + 's';
    selectedValue.innerHTML = gtc.valueGuess.name;
  }
  reset();
}
