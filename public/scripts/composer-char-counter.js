$(document).ready(function () {
    // --- our code goes here ---
    // $('form').on('submit', (event)=> {
    //     event.preventDefault();
    // });
    $("#tweet-text").on('keypress', function() {
        
        document.getElementById('counter').innerHTML = parseInt( (document.getElementById('counter').innerText)- 1);//The this keyword is a reference to the button
        if (document.getElementById('counter').innerHTML < 0) {
            $('.counter').css('color', 'red');
        }
      });
      $('.posted-tweets').on('mouseover', function(){
          $('.link').css('visibility', 'visible');
      });
      $('.posted-tweets').on('mouseout', function(){
        $('.link').css('visibility', 'hidden');
    });
     
  });
  