document.getElementById("pokemon").style.display = "none";
let cardData, userInput;

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
      document.getElementById("pokemon").style.display = "block";
    },
    (error) => {
      console.log('bad request', error);
    }
  );
}

function render() {
  for (i = 0; i <cardData.data.length; i++){
    let rules = '';
    let abiity = '';
    let attack = '';
    let weakness = '';
    let resistance = '';
    let retreat = '';
    if (cardData.data[i].rules){
      rules = cardData.data[i].rules;
    }else {
      rules = "none";
    };
    if (cardData.data[i].abilities){
      ability = cardData.data[i].abilities[0].name + ': ' + cardData.data[i].abilities[0].text;
    } else {
      ability = 'none';
    };
    if (cardData.data[i].attacks){
      for (j = 0; j < cardData.data[i].attacks.length; j++){
        attack = attack + cardData.data[i].attacks[j].name + " " + cardData.data[i].attacks[j].cost.join(" ") + " " + cardData.data[i].attacks[j].damage + " " + cardData.data[i].attacks[j].text + " || ";
      };
    };
    if (cardData.data[i].weaknesses){
      weakness = cardData.data[i].weaknesses[0].type;
    }else {
      weakness ='none';
    };
    if (cardData.data[i].resistances){
      resistance = cardData.data[i].resistances[0].type;
    }else {
      resistance = 'none';
    };
    if (cardData.data[i].retreatCost){
      retreat = cardData.data[i].retreatCost.join(" ");
    } else {
      retreat = 'free';
    };
    $('table tbody').append('<tr><td><img src="' + cardData.data[i].images.small + '"</td>' + '<td>' + cardData.data[i].name + '</td>' + '<td>' + rules + '</td>' + '<td>' + cardData.data[i].hp + '</td>' +'<td>' + cardData.data[i].types + '</td>' + '<td>' + ability + '</td>' + '<td>' + attack + '</td>' + '<td>' + weakness + '</td>' + '<td>' + resistance + '</td>' + '<td>' + retreat + '</td></tr>');
  };
}

$("button").click(function(){
  $("tbody").empty();
  document.getElementById("pokemon").style.display = "none";
});