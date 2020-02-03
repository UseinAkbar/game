var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

// $(document).on('keydown', function() {
//   if (started == false) {
//     $('#level-title').text('Level ' + level);
//     nextSequence();
//     $('.myHint').remove();
//     started = true;
//   }
// });
//
// $(document).on('keydown', function(event) {
//   var currentKey = event.key;
//   if (currentKey == 'q' || currentKey == 'w' || currentKey == 'a' || currentKey == 's') {
//     var userChosenKey = $('.' + currentKey).attr('id');
//     userClickedPattern.push(userChosenKey);
//     $('.' + currentKey).fadeOut(100).fadeIn(100)
//     soundKeydown(currentKey);
//     animateKey(currentKey);
//     checkAnswer(userClickedPattern.length - 1);
//   } else {
//     console.log(false);
//   }
// })

$('.btn').on('click', function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  $('#' + userChosenColour).fadeOut(100).fadeIn(100)
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

$(document).on('click', function() {
    if (started == false) {
      $('#level-title').text('Level ' + level);
      nextSequence();
      $('.myHint').remove();
      started = true;
    }

})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');

    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);

    startOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);

  $('#' + randomChosenColors).fadeIn(100).fadeOut(100).fadeIn(100)
  playSound(randomChosenColors);
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);

}

// function soundKeydown(key) {
//   switch (key) {
//     case 'q':
//       var audio = new Audio('sounds/green.mp3')
//       audio.play()
//       break;
//     case 'w':
//       var audio = new Audio('sounds/red.mp3')
//       audio.play()
//       break;
//     case 'a':
//       var audio = new Audio('sounds/yellow.mp3')
//       audio.play()
//       break;
//     case 's':
//       var audio = new Audio('sounds/blue.mp3')
//       audio.play()
//       break;
//     default:
//     console.log(false);
//
//   }
// }

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3')
  audio.play()
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed')


  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed')
  }, 100);
}

// function animateKey(keyword) {
//   $('.' + keyword).addClass('pressed');
//
//   setTimeout(function() {
//     $('.' + keyword).removeClass('pressed')
//   }, 100)
// }

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
