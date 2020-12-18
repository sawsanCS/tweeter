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
const calculateSince = function (datetime) {
  let tTime = new Date(datetime);
  let cTime = new Date();
  let sinceMin = Math.round((cTime - tTime) / 60000);
  if (sinceMin == 0) {
    let sinceSec = Math.round((cTime - tTime) / 1000);
    if (sinceSec < 10)
      let since = 'less than 10 seconds ago';
    else if (sinceSec < 20)
      let since = 'less than 20 seconds ago';
    else
      let since = 'half a minute ago';
  }
  else if (sinceMin == 1) {
    let sinceSec = Math.round((cTime - tTime) / 1000);
    if (sinceSec == 30)
      let since = 'half a minute ago';
    else if (sinceSec < 60)
      let since = 'less than a minute ago';
    else
      let since = '1 minute ago';
  }
  else if (sinceMin < 45)
    let since = sinceMin + ' minutes ago';
  else if (sinceMin > 44 && sinceMin < 60)
    let since = 'about 1 hour ago';
  else if (sinceMin < 1440) {
    let sinceHr = Math.round(sinceMin / 60);
    if (sinceHr == 1)
      let since = 'about 1 hour ago';
    else
      let since = 'about ' + sinceHr + ' hours ago';
  }
  else if (sinceMin > 1439 && sinceMin < 2880)
    let since = '1 day ago';
  else {
    let sinceDay = Math.round(sinceMin / 1440);
    let since = sinceDay + ' days ago';
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

const escape = function (str) {
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
          $('.counter').text(140)
          loadTweets();
        }
      });
      loadTweets();
    } else {
      $('.error').css('visibility', 'visible');
      $('.error').text(val);
    }
    $('form textarea').on('focus', function (event) {
      $('.error').css('visibility', 'hidden');
    })
  });
});
