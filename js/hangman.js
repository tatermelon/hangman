var Handlers = {
    startSession: function(resp) {
        hangman.game.setState(resp);
        
        $('#main').hide();
        $('#hangman').show();
        $('.letter').removeClass('disabled');
        
        hangman.game.render();
    },
    
    guess: function(resp) {
        hangman.game.setState(resp);
    }
};


var Hangman = function() {
    var SERVER_URL = 'http://hangman.coursera.org';
    var ALIVE = 'alive';
    var WON = 'won';
    var LOST = 'lost';
    var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                   'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    var images = {};
    
    var windowHeight = $(window).height();
    
    var currentState = '';
    var gameKey = '';
    var phrase = '';
    var state = '';
    var numTriesLeft = 0;
    
    /* Load letter buttons */
    for (var i in LETTERS) {
        var letter = LETTERS[i];
        
        $('#letters')
            .append($('<span>')
                .text(letter)
                .attr('id', 'letter-' + letter)
                .attr('class', 'letter button')
            );
    }
    
    /* Preload images */
    for (var i = 0; i <= 5; i++) {
        images['life' + i] = new Image();
        images['life' + i].src = 'img/photos/hangman-' + i + '.jpg';
    }
    
    /* Assumes initially positioned at top of page */
    var setCentered = function(accessor) {
        $(accessor).each(function() {
            var elementHeight = $(this).height();
            var MIN_PADDING = 20;
            var padding;
            
            if (windowHeight - elementHeight > (MIN_PADDING * 2)) {
                padding = (windowHeight - elementHeight) / 2;
            } else {
                padding = MIN_PADDING;
                $(this).css('padding-bottom', padding + 'px');
            }
            
            $(this).css('padding-top', padding + 'px');
        });
    };
    
    var sendRequest = function(url, callback, data) {
        $.ajax({
            dataType: 'jsonp',
            url: url,
            data: {
                callback: callback,
                data: JSON.stringify(data)
            }
        });
    };
    
    return {
        render: function() {
            setCentered('.vertically-centered');
        },
        
        setWindowHeight: function(height) {
            windowHeight = height;
        },
        
        startSession: function() {
            var url = SERVER_URL + '/hangman/game';
            var data = {
                email: $('#email-input').val()
            };
            
            sendRequest(url, 'Handlers.startSession', data);
        },
        
        setState: function(gameState) {
            gameKey = gameState['game_key'];
            phrase = gameState['phrase'];
            state = gameState['state'];
            numTriesLeft = gameState['num_tries_left'];
            
            if (state == ALIVE) {
                $('#game-over').hide();
                $('#hangman').show();
                
                $('#phrase').text(phrase);
                $('#hangman-graphic').attr('src', images['life' + numTriesLeft].src);
            } else {
                $('#hangman').hide();
                $('#game-over').show();
                
                if (state == WON) {
                    $('#game-status').text('You win!');
                } else if (state == LOST) {
                    $('#game-status').text('Oh no! You died =/');
                }
            }
            
            if (currentState != state) {
                hangman.game.render();
            }
            
            currentState = state;
            
        },
        
        submitGuess: function(letter) {
            var url = SERVER_URL + '/hangman/game/' + gameKey; 
            var data = {
                guess: letter
            };
            
            sendRequest(url, 'Handlers.guess', data);
        }
    };
};
