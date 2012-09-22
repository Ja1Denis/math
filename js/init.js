(function (window) {
    "use strict";

    var howMany = 30;

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
            var func = window["generate_" + _a.data("func")];
            var samples = _.map(_.range(howMany), func);
            var samplesString = samples.join("l");
            _a.attr("href", "#exec?f=" + encodeURIComponent(zipString(samplesString)));
        });
    });

    $("#check").live("click", function () {
        var total = 0;
        var filled = 0;
        var incorrect = [];
        $("#samples input").each(function () {
            $(this).css({ color: "", backgroundColor: "" });
            total++;
            var val = $.trim($(this).val());
            if (val.length) {
                filled++;
                var s = $(this).data("s");
                var shouldBe = eval(s);
                var entered = parseInt(val, 10);
                //console.log(shouldBe, entered);
                if (entered != shouldBe) {
                    incorrect.push(toHuman(s));
                    $(this).css({ color: "#f00", backgroundColor: "#fee" });
                }
            }
        });

        var message = "";
        var correct = filled - incorrect.length;
        if (incorrect.length == 0 && total == filled) {
            message = "<h3>Excellent!</h3>All is correct";
        } else if (filled == 0) {
            message = "<h3>All skipped</h3>";
        } else {
            message += "<h4>";
            if (filled < total) {
                message += (total - filled) + " of " + total + " skipped<br>"; //, " + filled + " completed
            }
            if (incorrect.length == 0) {
                if (filled > 0) {
                    message += correct + " correct<br>";
                }
            } else {
                message += correct + " correct<br>";
                message += "Mistakes in " + incorrect.join(", ") + "<br>";
            }
            message += "</h4>";
        }

        $("#message").html(message);

        this.blur();
    });

    var lastPrepared;
    var _template;

    function prepare(samples) {

        if (_.isEqual(lastPrepared, samples)) return;
        lastPrepared = samples;
        var _tbody = $("#samples tbody");
        if (!_template) {
            _template = _tbody.find("tr:first-child").clone();
        }
        _tbody.empty();

        for (var i = 0; i < samples.length; i++) {

            var s = samples[i];
            var _tr = _template.clone();
            _tr.find("td:first-child").html(toHuman(s) + " = ");
            _tr.find("input").attr("name", _.uniqueId("answer")).val('').data("s", s);

            _tr.appendTo(_tbody);
        }
    }

    function zipString(s) {
        return s.replace(/\+/g, 'p').replace(/\-/g, 'm').replace(/\*/g, 'u').replace(/\//g, 'd');
    }

    function unzipString(s) {
        return s.replace(/p/g, '+').replace(/m/g, '-').replace(/u/g, '*').replace(/d/g, '/');
    }

    function toHuman(s) {
        return s.replace(/(\D)/g, " $1 ").replace(/\*/g, "&times;").replace(/\//g, "&divide;");
    }
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

function generate_17plus19_62minus36() {
    // generate
    var type = randomInt(0, 1) ? "-" : "+";
    var pair;
    switch (type) {
        case "+":
            pair = randomPair(11, 89, 11, 89, function (a, b) {
                return a + b < 100 && (a + b) % 10 > 0 && (a % 10 + b % 10 > 10);
            });
            break;
        case "-":
            pair = randomPair(1, 99, 1, 99, function (a, b) {
                return a - b > 0 && a % 10 < b % 10;
            });
            break;
    }

    return pair[0] + type + pair[1];
}

function generate_plus_minus_up_to_100() {
    var type = randomInt(0, 1) ? "-" : "+";
    var pair;
    switch (type) {
        case "+":
            pair = randomPair(0, 100, 0, 100, function (a, b) {
                return a + b <= 100;
            });
            break;
        case "-":
            pair = randomPair(0, 100, 0, 100, function (a, b) {
                return a - b >= 0;
            });
            break;
    }

    return pair[0] + type + pair[1];
}

function generate_mult_divide_up_to_100() {
    var type = randomInt(0, 1) ? "*" : "/";
    var pair;
    switch (type) {
        case "*":
            pair = randomPair(0, 9, 0, 9, function (a, b) {
                return true;
            });
            break;
        case "/":
            pair = randomPair(0, 100, 1, 10, function (a, b) {
                return a % b == 0 && a / b <= 10;
            });
            break;
    }

    return pair[0] + type + pair[1];
}
