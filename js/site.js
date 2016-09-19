$(document).ready(function(){

    initGallery();
    initDragon();

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
                initGallery();
                initDragon();
            }
        }
    },
    smoothState = $("#wrapper").smoothState(options).data('smoothState');
}); 

function initGallery() {
    $('.art.ribbon a').click(function(event) {
        event.preventDefault();
        $a = $(this);
        $('.feature').css('background-image', $a.children('div').css('background-image'));
        $('.feature-wrapper p').html('<span>'+$a.attr('date')+'</span> '+$a.attr('title'));
    });
}