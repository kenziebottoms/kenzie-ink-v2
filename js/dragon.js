function initDragon() {
    // play triangle
    $('#dragon').drawPolygon({
        fillStyle: '#333',
        x: 215, y: 235,
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
        var location = [220, 120];
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