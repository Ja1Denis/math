(function (window) {
    "use strict";
    window.modules = [];

    $(function () {
        // all modules should be ready
        _.each(window.modules, function (m) {
            
        });
    });
})(window);

function randomInt(minInclude, maxInclude) {
    //var result = null;
    //while (result == null || matchFunc != null && !matchFunc(result))
    var r = Math.random();
    var sections = maxInclude - minInclude + 1;
    var oneSection = 1 / sections;
    var sectionNumber = Math.floor(r / oneSection);
    return minInclude + sectionNumber;
}

function randomPair(min1, max1, min2, max2, matchFunc) {
    do {
        var n1 = randomInt(min1, max1);
        var n2 = randomInt(min2, max2);
    } while (matchFunc != null && !matchFunc(n1, n2));
    return [n1, n2];
}

function generate17p19_62m36() {
    // generate
    var type = randomInt(0, 1) ? "-" : "+";

    var pair;

    switch (type) {
        case "+":
            pair = randomPair(11, 89, 11, 89, function (a, b) {
                return a + b < 100 && (a + b) % 10 > 0 && (a % 10 + b % 10 > 10);
            });
        default:
            pair = randomPair(11, 89, 11, 89, function (a, b) {
                return a + b < 100 && (a + b) % 10 > 0 && (a % 10 + b % 10 > 10);
            });
    }

    return pair[0] + type + pair[1];
}


modules.push(
    {
        name: "17 + 19, 62 - 36",
        generate: function (n) {
            var many
            for (var i = 0; i < n; i++) {

            }
        }
    }
);