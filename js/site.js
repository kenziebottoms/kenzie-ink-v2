$(document).ready(function(){
    Barba.Pjax.init();
    Barba.Prefetch.init();

    var FadeTransition = Barba.BaseTransition.extend({
        start: function() {
            // This function is automatically called as soon the Transition starts
            Promise
            .all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this));
        },

        fadeOut: function() {
            // this.oldContainer is the HTMLElement of the old Container
            return $(this.oldContainer).animate({ opacity: 0 }).promise();
        },

        fadeIn: function() {
            // this.newContainer is the HTMLElement of the new Container
            // At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
            // Please note, newContainer is available just after newContainerLoading is resolved!
            var _this = this;
            var $el = $(this.newContainer);

            $(this.oldContainer).hide();

            $el.css({
                visibility : 'visible',
                opacity : 0
            });

            $el.animate({ opacity: 1 }, 400, function() {
                // Do not forget to call .done() as soon your transition is finished!
                // .done() will automatically remove from the DOM the old Container
                _this.done();
            });
        }
    });

    Barba.Pjax.getTransition = function() {
        return FadeTransition;
    };

    init();
    
    Barba.Dispatcher.on("transitionCompleted", function() {
        init();
    });

}); 

function init() {
    console.log("init");
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