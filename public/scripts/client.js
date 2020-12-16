/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function (tweets) {
  $('.posted-tweets').html('');
  tweets.forEach(function (tweet) {
    let tweetElement = createTweetElement(tweet);
  
    console.log( $('.posted-tweets'));

    $('.posted-tweets').prepend(tweetElement);
});
};
const loadTweets = function(){
  $.ajax({url: '/tweets', method: 'GET'}).then(function(data) {
   
    renderTweets(data)});
}
const validation = function(tweet) {
  if (tweet==="") {
    $('.counter').text("type a tweet, please");
    return false;
  } else if (tweet.length > 140) {
    $('.counter').text("should not exceed 140 characters");
    return false;
  } else {
    return true;
  }
}
const createTweetElement = function(tweet) {
    return $(` <article class="tweet">
    <section  class="tweet-header">
      <img src="${tweet.user.avatars}" class="headshot"/>
      <P class='name'>${tweet.user.name}</P>
      <p class="link">${tweet.user.handle}</p>
    </section>
    
    <section class="tweet-content">
    <p>${tweet.content.text}</p>
    </section>
    
    <footer class="tweet-footer">
    
      <div class="post-date">
     ${tweet.created_at};
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
    $('form').on('submit', function(event) {
      
        event.preventDefault();
       if ( validation($(this).find("textarea").val())){
        $.ajax({
          url: '/tweets',
          method: 'POST',
          data: $(this).serialize(),
          success: function() {
            $('.container .new-tweet form')[0].reset();
            
            loadTweets();
          }
      });
   
      loadTweets();


       }
        
  });
});
