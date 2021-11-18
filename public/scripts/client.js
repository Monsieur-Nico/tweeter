/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // loops through tweets
  for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    const element = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweetsSection').prepend(element);
  }
};

const createTweetElement = tweetObj => {
  return $(`
  <article class="articleTweet fullArticle">
        <header class="articleTweet header">
          <i class="far fa-user-circle"></i>
          ${tweetObj.user.name}
        </header>
        <p class="articleTweet paragraph">
          ${tweetObj.content.text}
        </p>
        <footer class="articleTweet footer">
          <p class='tweetDate'>${$.timeago(tweetObj.created_at)}</p>
          <div class=buttons>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`);
};

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
    .then((data) => {
      renderTweets(data);
    })
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  console.log(div.innerHTML);
  return div.innerHTML;
};

const postTweets = (serializedData) => {
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: { text: escape(serializedData) }
  }).then(() => {
    loadTweets()
    $('#tweet-text').val('');
  })
};

function displayError(div) {
  const x = document.getElementById(div);
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

$(document).ready(function() {

  loadTweets();

  $('#target').submit(function(event) {
    event.preventDefault();
    const $content = $('#tweet-text').val();
    if ($content === "") {
      $("#errorMessage").slideDown("slow");
      $("#errorMessage2").slideUp("slow");
    } else if ($content.length > 140) {
      $("#errorMessage2").slideDown("slow");
      $("#errorMessage").slideUp("slow");
    } else {
      postTweets($content);
      $("#errorMessage").slideUp("slow");
      $("#errorMessage2").slideUp("slow");
    }
  });
});