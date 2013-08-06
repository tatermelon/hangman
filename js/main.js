var hangman = hangman || {};

$(function() {
    hangman.game = Hangman();
    hangman.game.render();
    
    /* Init handlers */
    $('.letter').off().click(function() {
        if (!$(this).hasClass('disabled')) {
            var letter = $(this).text();
            hangman.game.submitGuess(letter);
            
            $(this).addClass('disabled');
        }
    });
    
    $('#email-input').keyup(function() {
        if ($(this).val() != '') {
            $('#play-btn').removeClass('disabled');
        } else {
            $('#play-btn').addClass('disabled');
        }
    });
    
    $('.play-btn').click(function() {
        if (!$(this).hasClass('disabled')) {
            hangman.game.startSession();
        }
    });
    
    $(window).resize(function() {
        hangman.game.setWindowHeight($(window).height());
        hangman.game.render();
    });
});