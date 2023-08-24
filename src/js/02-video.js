import Player from '@vimeo/player';
let throttle = require('lodash.throttle');
const player = new Player('vimeo-player', {
  id: 19231868,
  width: 640,
});

// player.on('timeupdate', function () {
//   console.log('played the video!');
// });
const onTimeUpdate = function (data) {
  // data is an object containing properties specific to that event
  let videoSecond = data.seconds;
  localStorage.setItem('videoplayer-current-time', JSON.stringify(videoSecond));
};
let pauseSeconds = JSON.parse(localStorage.getItem('videoplayer-current-time'));

player.on('timeupdate', throttle(onTimeUpdate, 1000));

player
  .setCurrentTime(pauseSeconds)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
