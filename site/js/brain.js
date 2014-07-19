$(document).ready(function() {

    // Keyword variables for search
    var region = '';
    var dx = '';
    var cog = '';
    var terms = '';

    // Create "brain" variable by selecting <svg> with D3.
    var brain = d3.select("svg");

    // Variables based on lobule, lobe, area, and border classes.
    var lobes = d3.select("#Lobes").selectAll("path, text");
    var lobules = d3.select("#Gyri").selectAll("path, text");
    var areas = d3.select("#Areas").selectAll("path, text, line, ellipse");
    var borders = brain.selectAll(".border");

    // "regions" variable to refer to lobes, lobules, and areas at once
    var regions = brain.selectAll("path, ellipse");

    // Start tracking which lobules and lobes are clicked with a new "unclicked" class added to all.
    lobules.classed({
        "unclicked": true
    });
    lobes.classed({
        "unclicked": true
    });
    areas.classed({
        "unclicked": true
    });

    // On hover
    regions.on("mouseover", function() {

        $(this).parent().children("text").css({
            'fill': '#FEFADD'
        });

        d3.select(this).transition().
        duration(400).
        style({
            'fill': '#FFDF12'
        });

    }).on("mouseout", function() {

        if (d3.select(this).classed("unclicked")) {

            d3.select(this).transition().duration(300).
            style({
                'fill': '#FFDF12'
            }).
            transition().duration(400).
            style({
                'fill': '#FEFADD'
            }).
            transition().duration(500).
            style({
                'fill': '#FFFFFF'
            });

        };

        $(this).parent().children("text").css({
            'fill': '#000000'
        });

    });


    // When a region is clicked...
    regions.on("click", function() {

        // "unclick" all regions so that any current highlighting is removed.
        regions.classed({
            "unclicked": true
        }).
        style({
            'fill': '#FEFADD'
        }).
        attr("stroke-width", "1");

        //  if region hasn't yet been clicked...
        if (d3.select(this).classed("unclicked")) {

            // then remove "unclicked" class from the newly click area alone and keep that area filled with a highlighting orange.
            d3.select(this).classed({
                "unclicked": false
            }).
            transition().duration(400).
            style({
                'fill': '#FFDF12'
            }).
            attr("stroke-width", "4");

            // change text in group
            $(this).parent().siblings().
            css('fill', '#000');

            // change border of region
            $(this).siblings().
            css('fill', '#000');

            region = $(this).parent().text();

            search(region + " " + dx + " " + cog + " " + terms);

        }

        // if region has been clicked...
        else {

            // return it to "unclicked"
            d3.select(this).classed({
                "unclicked": true
            }).
            transition().duration(400).
            style({
                'fill': '#F9EE8A'
            });

            // change text in group
            $(this).parent().siblings().
            css('fill', '#F76F00');

            // change border of region
            $(this).siblings().
            css('fill', '#F9D953');
        }

        search(region + " " + dx + " " + cog + " " + terms);

    });

    lobules.attr("visibility", "hidden");

    areas.attr("visibility", "hidden");

    $("#Lobes-Button").click(function() {
        lobes.attr("visibility", "show");
        lobules.attr("visibility", "hidden");
        areas.attr("visibility", "hidden");
    });

    $("#Gyri-Button").click(function() {
        lobules.attr("visibility", "show");
        lobes.attr("visibility", "hidden");
        areas.attr("visibility", "hidden");
    });

    $("#Midsagittal-Button").click(function() {
        areas.attr("visibility", "show").fadeIn(200);
        lobules.attr("visibility", "hidden");
    });

    // Fade in "brain" when page opens.
    brain.style("opacity", 0).transition().duration(2000).style("opacity", 1);

    // Detect when diagnosis selection changes.
    $("#dx").change(function() {
        dx = $(this).val();

        // Search with all selected values.
        search(region + " " + dx + " " + cog + " " + terms);
    });

    // Detect when cognition selection changes.
    $("#cognition").change(function() {
        cog = $(this).val();

        // Search with all selected values.
        search(region + " " + dx + " " + cog + " " + terms);
    });

    // Detect when search terms changes.
    $("#terms").keyup(function() {
        terms = $(this).val();

        // Search with all selected values.
        search(region + " " + dx + " " + cog + " " + terms);
    });


    // Finally, search.
    function search(keywords) {

        var search_string = keywords;

        // Search PubMed (based on example @ http://entrezajax.appspot.com/examples/esearch+esummary.html)
        args = {
            'apikey': 'fd295326b5fd4f997b6a5778e50c3060',
            'db': 'pubmed',
            'term': search_string,
            'retmax': 20,
            'max': 10,
            'start': 0
        };

        $.getJSON('http://entrezajax.appspot.com/esearch+esummary?callback=?', args, function(data) {

            if (data.entrezajax.count != null) {
                $('#results').html('<strong>' + data.entrezajax.count + '</strong> articles found about ' + keywords + ":");
            } else {
                $('#results').html('Sorry, no articles found about ' + keywords + ".");
            }

            $.each(data.result, function(i, item) {

                var author_list = '';

                for (var i = 0; i < item.AuthorList.length; i++) {

                    if (i != 0) {
                        author_list += ', ';
                    }

                    author_list += item.AuthorList[i];

                }

                var html = '<p class=\'article\'><h2><a href=\'http://www.ncbi.nlm.nih.gov/pubmed/' + item.ArticleIds.pubmed + '\' target = \'_blank\'>' + item.Title + '</a></h2><div class=\'cite\'>' + author_list + ' - ' + item.FullJournalName + '<span class=\'date\'> (' + item.PubDate + ')</span></div></p>';

                $("</p>").html(html).appendTo('#results');

            });
        });
    };
});
