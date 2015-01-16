var GuessTheCard = function() {
  this.deck = new Deck();
  this.suits = this.deck.suits;
  this.values = this.deck.values;

  this.reset();
};

GuessTheCard.prototype = {
  guessIsCorrect: function() {
    return this.secretCard.value == this.valueGuess && this.secretCard.suit == this.suitGuess;
  },

  _chooseCardWithImage: function() {
    var cardOptions = [
      new Card(this.deck, this.deck.FOUR, this.deck.SPADE),
      new Card(this.deck, this.deck.FOUR, this.deck.CLUB)
    ];
    var index = Math.floor(Math.random() * (cardOptions.length));
    return cardOptions[index];
  },

  reset: function() {
    this.deck.collect();
    this.deck.shuffle();

    this.secretCard = this._chooseCardWithImage();
    // this.secretCard = this.deck.draw(1);
    this.suitGuess = this.deck.HEART;
    this.valueGuess = this.deck.ACE;
  },

  createValueButton: function(value, onValueSelect) {
    //<a id="value-a" href="" title="Ace">A</a>
    var valueButton = document.createElement('a');
    valueButton.id = 'value-' + value.shortName;
    valueButton.title = value.name;
    valueButton.innerHTML = value.shortName;

    var self = this;
    valueButton.addEventListener('click', function(event) {
      self.valueGuess = value;
      onValueSelect(this, value);
      event.stopPropagation();
      event.preventDefault();
      return false;
    }, false);

    return valueButton;
  },

  createSuitButton: function(suit, onSuitSelect) {
    // <a id="suit-club" href="" title="Clubs"><img src='images/club.png' alt='club'/></a>
    var suitButton = document.createElement('a');
    suitButton.id = 'suit-' + suit.name.toLowerCase();
    suitButton.title = suit.name + 's';

    var suitImg = document.createElement('img');
    suitImg.alt = suit.name;
    suitImg.src = 'cards/images/' + suit.name.toLowerCase() + '.png';
    suitButton.appendChild(suitImg);

    var self = this;
    suitButton.addEventListener('click', function(event) {
      self.suitGuess = suit;
      onSuitSelect(this, suit);
      event.stopPropagation();
      event.preventDefault();
      return false;
    }, false);

    return suitButton;
  }
}
