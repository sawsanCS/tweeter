/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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
    </article>`)
  };
$(document).ready(function () {
   
    $('form').on('submit', (event)=> {
        event.preventDefault();
    $.ajax({url: '/tweets', method: 'POST'}).then( res => console.log(res));
    $.ajax({url: '/tweets', method: 'GET'}).then( res => {
        for (const tweet of Object.values(res)) {
            const tweetElement = createTweetElement(tweet);
            console.log( $('.tweet'));
            $('.tweet').prepend(tweetElement);
        } 
    });
    });
    
});

{/* <article class="tweet">

<section  class="tweet-header">
  <img src="https://i.imgur.com/73hZDYK.png" class="headshot"/>
  <P class='name'>Newton</P>
  <p class="link">@Newton</p>
</section>

<section class="tweet-content">
<p>Some Tweet that came to my mind</p>
</section>

<footer class="tweet-footer">

  <div class="post-date">
    10 days ago
   </div>

   <div class="tweet-footer-span">
    <a class="icons" href="#"><i class="fa fa-flag" aria-hidden="true"></i></a>
    <a class="icons" href="#"><i class="fa fa-retweet" aria-hidden="true"></i></a>
    <a class="icons" href="#"><i class="fa fa-heart" aria-hidden="true"></i></a>
    </div>

</footer>
</article> */}
