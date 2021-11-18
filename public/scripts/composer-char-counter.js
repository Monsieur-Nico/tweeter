$(document).ready(function() {
  $('#tweet-text').on('keyup', function(e) {
    const input = (this.value.length);
    const counterValue = (140 - input);
    const counter = $(this).closest('.new-tweet').find('.counter');

    if (counterValue < 0) {
      counter.css('color', 'red')

    } else {
        counter.css('color', '#5B5B5B')
    }

    $(this)
      .closest('.new-tweet')
      .find('.counter')
      .text(counterValue)

  });
});