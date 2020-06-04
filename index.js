let Twit = require('twit');

let T = new Twit(require('./config.private'));

let stream = T.stream('statuses/filter', {track: '@play_RPS'});

let responses = {'rock': 'paper', 'paper': 'scissors', 'scissors': 'rock'};

stream.on('tweet', tweet => {
  console.log(tweet)
  let move = /@play_RPS\W.*?(rock|paper|scissor)/gmi.exec(tweet.text)[1].toLowerCase();
  let response = `@${tweet.user.screen_name} You played ${move}, but I played ${responses[move]}. I win! Better luck next time.`;
  console.log(response);
  T.post('statuses/update', {
    status: response,
    in_reply_to_status_id: tweet.id_str
  });

});
