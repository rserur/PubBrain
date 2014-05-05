    // Create "brain" variable by selecting <svg> with D3.
    var brain = d3.select("svg");

    // Fade in "brain" when page opens.
    brain.style("opacity", 0).
        transition().
        duration(2000).
        style("opacity", 1);

    // Clear out text style so it's not visible.
    brain.selectAll("text").classed("tabasco", "false").style({'fill': '#F76F00'});

    // variables based on lobule, lobe, area, and border classes.
    var lobes = brain.selectAll(".lobe");
    var lobules = brain.selectAll(".lobule");
    var areas = brain.selectAll(".area");
    var borders = brain.selectAll(".border");

    // "regions" variable to refer to lobes, lobules, and areas at once
    var regions = brain.selectAll(".lobe, .lobule, .area");

    // Start tracking which lobules and lobes are clicked with a new "unclicked" class added to all.
    lobules.classed({"unclicked" : true}).style({'fill': '#F9EE8A'});

    lobes.classed({"unclicked" : true}).style({'fill': '#F9EE8A'});

    borders.style({fill: '#F9D953'});

    // On hover, highlight brain lobule under mouse with orange. When user's mouse leaves a lobule, gradually fade it from yellow to orange, then finally back to the default brain color.
    regions.on("mouseover", function(){
        d3.select(this).transition().
            duration(400).
            style({'fill': '#E05822'});
        }).
        on("mouseout", function(){

            if (d3.select(this).classed("unclicked")){
                d3.select(this).transition().
                duration(300).
                style({'fill': '#F99000'}).
                transition().
                duration(400).
                style({'fill': '#F9D953'}).
                transition().
                duration(500).
                style({'fill': '#F9EE8A'});
            };
        });

    // When an region is clicked...
    regions.on("click", function(){

            // "unclick" all areas so that any current highlighting is removed.
            regions.classed({"unclicked" : true}).style({'fill':
                '#F9EE8A'});

            borders.style({fill: '#F9D953'});

            brain.selectAll("text").style({'fill': '#F76F00'});

        //  if region hasn't already been clicked...
        if (d3.select(this).classed("unclicked")){

            // then remove "unclicked" class from the newly click area alone and keep that area filled with a highlighting orange.
            d3.select(this).classed({"unclicked" : false}).transition().
                duration(400).
                style({'fill': '#F76F00'});

                // change text in group
                $(this).parent().siblings().
                css('fill', '#000');

                // change border of region
                $(this).siblings().
                css('fill', '#000');
        }

        // if region has already been clicked...
        else {
            // return it to "unclicked"
            d3.select(this).classed({"unclicked" : true}).transition().
                duration(400).
                style({'fill': '#F9EE8A'});

                // change text in group
                $(this).parent().siblings().
                css('fill', '#F76F00');

                // change border of region
                $(this).siblings().
                css('fill', '#F9D953');
        }
    });
