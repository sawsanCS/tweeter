$(document).ready(function () {
    // --- our code goes here ---
    $("#tweet-text").on('keypress', function() {
        
        document.getElementById('counter').innerHTML = parseInt( (document.getElementById('counter').innerText)- 1);//The this keyword is a reference to the button
      });
  });
  