(function (window) {
    "use strict";

    $(document).live("pagebeforechange", function (e, data) {
        if (data.toPage[0] == $("#exec").get(0)) {
            var options = data.options;
            if (options.pageData && options.pageData.f) {
                var f = options.pageData.f;
                var samples = unzipString(f).split("l");
                prepare(samples);
            }
        }
    });

    $("#home").live("pagebeforeshow", function () {
        $(".samples-link").each(function () {
            var _a = $(this);
            var func = window["generate" + _a.data("func")];
            var samples = _.map(_.range(50), func);
            var samplesString = samples.join("l");
            _a.attr("href", "#exec?f=" + encodeURIComponent(zipString(samplesString)));
        });
    });

})(window);

function zipString(s) {
    return s.replace(/\+/g, 'p').replace(/\-/g, 'm');
}

function unzipString(s) {
    return s.replace(/p/g, '+').replace(/m/g, '-');
}


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

function generate17plus19_62minus36() {
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

function generate_plus_minus_up_to_100() {
}

function prepare(samples) {
    var _tbody = $("#samples tbody");
    var _template = _tbody.find("tr:first-child").clone();
    _tbody.empty();


    for (var i = 0; i < samples.length; i++) {

        var s = samples[i];
        var _tr = _template.clone();
        _tr.find("td:first-child").text(s + " = ");
        _tr.find("input").attr("name", _.uniqueId("answer")).val('');

        _tr.appendTo(_tbody);
    }
}