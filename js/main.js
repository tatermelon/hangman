var hangman = hangman || {};

$(function() {
    var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                    
    for (var i in LETTERS) {
        var letter = LETTERS[i];
        
        $('#letters')
            .append($('<span>')
                .text(letter)
                .attr('id', 'letter-' + letter)
                .attr('class', 'letter button')
            );
    }
    
    $('.letter').off().click(function() {
        if (!$(this).hasClass('disabled')) {
            var letter = $(this).text();
            hangman.submitGuess(letter);
            
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
            hangman.startSession();
        }
    });
    
    hangman = Hangman();
    hangman.render();
    
    $(window).resize(function() {
        hangman.setWindowHeight($(window).height());
        hangman.render();
    });
});