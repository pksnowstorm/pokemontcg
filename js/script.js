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
    },
    (error) => {
      console.log('bad request', error);
    }
  );
}

function render() {
  for (i = 0; i <cardData.data.length; i++){
    $('#image').append('<img src="' + cardData.data[i].images.small + '">');
  };
}

$("button").click(function(){
  $("p").empty();
});