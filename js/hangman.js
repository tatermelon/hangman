var Handlers = {
    startSession: function(resp) {
        hangman.setState(resp);
        
        $('#main').hide();
        $('#hangman').show();
        $('.letter').removeClass('disabled');
        
        hangman.render();
    },
    
    guess: function(resp) {
        hangman.setState(resp);
    }
};


var Hangman = function() {
    var SERVER_URL = 'http://hangman.coursera.org';
    var ALIVE = 'alive';
    var WON = 'won';
    var LOST = 'lost';
    
    var windowHeight = $(window).height();;
    
    var gameKey = '';
    var phrase = '';
    var state = '';
    var numTriesLeft = 0;
    
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
                $('#try-count').text(numTriesLeft);
            } else {
                $('#hangman').hide();
                $('#game-over').show();
                
                if (state == WON) {
                    $('#game-status').text('You win!');
                } else if (state == LOST) {
                    $('#game-status').text('Oh no! You died =/');
                }
            }
            
            hangman.render();
            
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
