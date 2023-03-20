let cardData, userInput;

const $name = $('#name');
const $hp = $('#hp');
const $weakness = $('#weakness');
const $resistance = $('#resistance');
const $retreat = $('#retreat');
const $input = $('input[type="text"]');

$('form').on('submit', handleGetData);

function handleGetData(event) {
  event.preventDefault();
  // calling preventDefault() on a 'submit' event will prevent a page refresh  
  userInput = $input.val();
  // getting the user input
  $.ajax({
    url: 'https://api.pokemontcg.io/v2/cards?q=name:' + '"' + userInput +'"'
  }).then(
    (data) => {
      cardData = data;
      render();
    },
    (error) => {
      console.log('bad request', error);
    }
  );
}

function render() {
  $name.text(cardData.data[0].name);
  $hp.text(cardData.data[0].hp);
  if (cardData.data[0].weaknesses){
    $weakness.text(cardData.data[0].weaknesses[0].type);
  }else {
    $weakness.text('none');
  };
  if (cardData.data[0].resistances){
    $resistance.text(cardData.data[0].resistances[0].type);
  }else {
    $resistance.text('none');
  };
  if (cardData.data[0].retreatCost){
    //All pokemon card have retreat cost of colorless energy
    $retreat.text(cardData.data[0].retreatCost.length + " colorless");
  } else {
    $retreat.text('free');
  };
}