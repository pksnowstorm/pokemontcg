let cardData, userInput;

const $name = $('#name');
const $rules = $('#rules');
const $hp = $('#hp');
const $type = $('#type');
const $attacks = $('#attacks');
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
  if (cardData.data[0].rules){
    $rules.text(cardData.data[0].rules);
  }else {
    $rules.text('none')
  }
  $hp.text(cardData.data[0].hp);
  $type.text(cardData.data[0].types);
  if (cardData.data[0].attacks){
    for (i = 0; i < cardData.data[0].attacks.length; i++){
      $("#attacks").append("<tr><td>"+ cardData.data[0].attacks[i].name + "</td></tr>" 
    + "<tr><td>" + (cardData.data[0].attacks[i].cost).join(" ") + "</td></tr>" 
    + "<tr><td>" + cardData.data[0].attacks[i].damage +"</td></tr>" 
    + "<tr><td>" + cardData.data[0].attacks[i].text + "</td></tr>");
    };
  };
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
    $retreat.text(cardData.data[0].retreatCost.join(" "));
  } else {
    $retreat.text('free');
  };
}