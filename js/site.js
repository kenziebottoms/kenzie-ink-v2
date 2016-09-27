$(document).ready(function(){

    init();

    // SmoothState
    'use strict';
    
    var options = {
        prefetch: true,
        cacheLength: 2,
        onBefore: function($trigger, $container) {
        },
        onStart: {
            duration: 250,
            render: function ($container) {
                // Add your CSS animation reversing class
                $container.addClass('is-exiting');
                // Restart your animation
                smoothState.restartCSSAnimations();
            }
        },
        onReady: {
            duration: 0,
            render: function ($container, $newContent) {
                // Remove your CSS animation reversing class
                $container.removeClass('is-exiting');
                $('.active').removeClass('active');
                // Inject the new content
                $container.html($newContent);
                init();
            }
        }
    },
    smoothState = $("#wrapper").smoothState(options).data('smoothState');
}); 

function init() {
    initGallery();
    if (window.location.href.indexOf("dragon") >= 0) {
        initDragon();
    }
    if (window.location.href.indexOf("nanobox") >= 0) {
        initNano();
    }
}

function initGallery() {
    $('.art.ribbon a').click(function(event) {
        event.preventDefault();
        $a = $(this);
        $('.feature').css('background-image', $a.children('div').css('background-image'));
        $('.feature-wrapper p').html('<span>'+$a.attr('date')+'</span> '+$a.attr('title'));
    });
}
function initNano() {
    $("textarea#nano").on("change keyup paste", function() {
        var wordCount = $(this).val().split(' ').length;
        $("#progress-bar").width(wordCount/$('input#goal').val()*$('#progress-wrapper').width());
    });
}