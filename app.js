(function($, CNFG) {
    var $home, $ul;

    function clearAll() {
        $ul.html("");
    }

    function urlize(n) {
        return "url(img/" + n.toLowerCase().replace(/ /g, "_").replace(/\W/g, "") + ".png)";
    }
    function mkclick(h) {
        return function() {
            window.location = h;
        };
    }
    function goCategory(cat) {
        var x, y, z;
        if (!(x = CNFG.clubs[cat]))
            throw new Error("invalid category: " + cat);
        clearAll();
        for (y in x) {
            z =
                $("<li>").append(
                    $("<h2>").append(
                        $("<a>").html(
                            y
                        ).attr("href", x[y])
                    )
                );
            z.css('backgroundImage', urlize(cat + "__" + y));
            z.click(mkclick(x[y]));
            $ul.append(z);
        }
    }
    function mkClickGoCategory(cat) {
        return function(e) {
            goCategory(cat);
            e.preventDefault();
        }
    }

    function goHome() {
        clearAll();
        var category, z;
        for (category in CNFG.clubs) {
            z =
                $("<li>").append(
                    $("<h2>").append(
                        $("<a>").attr("href", "#").html(
                            category
                        ).click(mkClickGoCategory(category))
                    )
                );
            z.css("backgroundImage", urlize(category));
            z.click(mkClickGoCategory(category));
            $ul.append(z);
        }
    }

    function main() {
        $home = $("#head h1 a");
        $ul = $("#act");
        $home.click(function(e) {
            goHome();
            e.preventDefault();
        });
        goHome();
    }
    $(window).ready(main);
})(jQuery, CNFG);
