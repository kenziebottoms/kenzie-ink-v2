$(document).ready(function(){
    Barba.Pjax.init();
    Barba.Prefetch.init();

    var FadeTransition = Barba.BaseTransition.extend({
        start: function() {
            // This function is automatically called as soon the Transition starts
            Promise
            .all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this));
            if (window.location.pathname.indexOf("ink") >= 0) {
                $(".page-heading").addClass("left");
                $(".page-heading").removeClass("center");
                $(".page-heading").removeClass("right");
            } else if (window.location.pathname.indexOf("kenzie") >= 0) {
                $(".page-heading").addClass("right");
                $(".page-heading").removeClass("center");
                $(".page-heading").removeClass("left");
            } else {
                $(".page-heading").removeClass("left");
                $(".page-heading").removeClass("right");
            }
        },

        fadeOut: function() {
            // this.oldContainer is the HTMLElement of the old Container
            return $(this.oldContainer).animate({ opacity: 0 }, 350).promise();
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

            $el.animate({ opacity: 1 }, 350, function() {
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
function initDragon() {
    // play triangle
    $('#dragon').drawPolygon({
        fillStyle: '#333',
        x: 215, y: 135,
        radius: 60,
        sides: 3,
        rotate: 90
    });

    $("#dragon").click(function() {
        $('#dragon').clearCanvas();
        plot(iterate($('.dragon input').attr("value")), 4);
    });

    $(".dragon input").on("change keyup paste click", function() {
        $('#dragon').clearCanvas();
        plot(iterate($('.dragon input').val()), 4);
    });

    function iterate(n) {
        if (n == 1) {
            return [1];
        } else {
            var first = iterate(n-1);
            var second = iterate(n-1);
            second.reverse();
            second = invert(second);
            return $.merge(first, $.merge([1], second));
        }
    }
    function invert(arr) {
        var arr2 = $.map(arr, function(x) {
            return x*(-1);
        });
        return arr2;
    }
    function plot(arr, interval) {
        var location = [220, 100];
        var pts = [[location[0],location[1]+interval], location];

        // N=0, E=1, S=2, W=3
        direction = 0;
        for (var i=2; i<arr.length+2; i++) {
            if (arr[i-2] == 1) {
                result = turnRight(location, direction, interval).slice();
                location = result[0].slice();
                pts[i] = result[0].slice();
                direction = result[1];
            } else if (arr[i-2] == -1) {
                result = turnLeft(location, direction, interval).slice();
                location = result[0].slice();
                pts[i] = result[0].slice();
                direction = result[1];
            }
        }
        var obj = {
            strokeStyle: '#333',
            strokeWidth: 1,
            rounded: false
        };
        for (var p=0; p<pts.length; p++) {
            obj['x'+(p+1)] = pts[p][0];
            obj['y'+(p+1)] = pts[p][1];
        }
        $("#dragon").drawLine(obj);


        function step(location, direction, interval) {
            newLoc = location.slice();
            if (direction == 0) {
                newLoc[1] = newLoc[1] - interval;
            } else if (direction == 1) {
                newLoc[0] = newLoc[0] + interval;
            } else if (direction == 2) {
                newLoc[1] = newLoc[1] + interval;
            } else if (direction == 3) {
                newLoc[0] = newLoc[0] - interval;
            }
            return newLoc;
        }
        function turnRight(location, direction, interval) {
            direction = (direction + 1) % 4;
            newLoc = step(location, direction, interval);
            return [newLoc, direction];
        }
        function turnLeft(location, direction, interval) {
            direction = (direction + 3) % 4;
            newLoc = step(location, direction, interval);
            return [newLoc, direction];
        }
    }
}