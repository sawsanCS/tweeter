$(document).ready(function () {
    // --- our code goes here ---
    $("#tweet-text").on('input', function () {
        
        let tweetLength = $(this).val().length;
     
      
        $('#counter').text(140 - tweetLength);
        if (tweetLength > 140) {
            $('#counter').css('color', 'red');
        } else {
            $('#counter').css('color', 'black');
        }
    });

  

        //     document.getElementById('counter').innerHTML = parseInt( (document.getElementById('counter').innerText)- 1);//The this keyword is a reference to the button
        //     if (document.getElementById('counter').innerHTML < 0) {
        //         $('.counter').css('color', 'red');
        //     }
        //   });
        $('.posted-tweets').on('mouseover', function () {
            $('.link').css('visibility', 'visible');
        });
        $('.posted-tweets').on('mouseout', function () {
            $('.link').css('visibility', 'hidden');
        });

    });

