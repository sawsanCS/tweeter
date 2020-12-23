/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/**
  * Calculates the Twitter time since the tweet was created
  * @param datetime returned by Twitter API in created_at
  * @return time since in html
  */
 const calculateSince = function(datetime)
 {
     var tTime=new Date(datetime);
     var cTime=new Date();
     var sinceMin=Math.round((cTime-tTime)/60000);
     if(sinceMin==0)
     {
         var sinceSec=Math.round((cTime-tTime)/1000);
         if(sinceSec<10)
           var since='less than 10 seconds ago';
         else if(sinceSec<20)
           var since='less than 20 seconds ago';
         else
           var since='half a minute ago';
     }
     else if(sinceMin==1)
     {
         var sinceSec=Math.round((cTime-tTime)/1000);
         if(sinceSec==30)
           var since='half a minute ago';
         else if(sinceSec<60)
           var since='less than a minute ago';
         else
           var since='1 minute ago';
     }
     else if(sinceMin<45)
         var since=sinceMin+' minutes ago';
     else if(sinceMin>44&&sinceMin<60)
         var since='about 1 hour ago';
     else if(sinceMin<1440){
         var sinceHr=Math.round(sinceMin/60);
     if(sinceHr==1)
       var since='about 1 hour ago';
     else
       var since='about '+sinceHr+' hours ago';
     }
     else if(sinceMin>1439&&sinceMin<2880)
         var since='1 day ago';
     else
     {
         var sinceDay=Math.round(sinceMin/1440);
         var since=sinceDay+' days ago';
     }
     return since;
 };

const renderTweets = function (tweets) {
  $('.posted-tweets').html('');
  tweets.forEach(function (tweet) {
    let tweetElement = createTweetElement(tweet);

    console.log($('.posted-tweets'));

    $('.posted-tweets').prepend(tweetElement);
  });
};

const escape = function(str) {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}
const loadTweets = function () {
  $.ajax({ url: '/tweets', method: 'GET' }).then(function (data) {

    renderTweets(data)
  });
}
const validation = function (tweet) {
  let errorMsg = "";
  if (tweet === "") {
    errorMsg = "type a tweet, please";

  } else if (tweet.length > 140) {
    errorMsg = "should not exceed 140 characters";
  }
  return errorMsg;
}
const createTweetElement = function (tweet) {
  return $(` <article class="tweet">
    <section  class="tweet-header">
      <img src="${tweet.user.avatars}" class="headshot"/>
      <P class='name'>${tweet.user.name}</P>
      <p class="link">${tweet.user.handle}</p>
    </section>
    
    <section class="tweet-content">
    <p>${escape(tweet.content.text)}</p>
    </section>
    
    <footer class="tweet-footer">
    
      <div class="post-date">
     ${calculateSince(tweet.created_at)}
       </div>
    
       <div class="tweet-footer-span">
        <a class="icons" href="#"><i class="fa fa-flag" aria-hidden="true"></i></a>
        <a class="icons" href="#"><i class="fa fa-retweet" aria-hidden="true"></i></a>
        <a class="icons" href="#"><i class="fa fa-heart" aria-hidden="true"></i></a>
        </div>
    
    </footer>
    </article>
    `);
};
$(document).ready(function () {

  $('form').on('submit', function (event) {
    event.preventDefault();
    let val = validation($(this).find("textarea").val());

    if (val === "") {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: function () {
          $('.container .new-tweet form')[0].reset();
          $('#counter').text(140);
          loadTweets();
        }
      });
      loadTweets();
    } else if (val === 'type a tweet, please') {
      $('.error').css('visibility', 'visible');
      $('.error').text(val);
      $('#counter').text(140);
    } else {
      $('.error').css('visibility', 'visible');
      $('.error').text(val);
    
    }
    $('form textarea').on('focus', function (event) {
      $('.error').css('visibility', 'hidden');
    })
  });
  loadTweets();
});

