TODO:
---------

- Remove unnecessary styles
- Fix Broca's & Wernicke's areas
- Fix shifted brain labels
- reflect # of articles found with colors in svg?
- Validate HTML & CSS
- Pagination?

Finished:
------------

- ~~Deselect currently clicked region if another region is clicked.~~
- ~~Add lobe regions somehow~~
- ~~Make area borders unclickable somehow.~~
- ~~Add two-column layout.~~
- ~~Figure out how to select nested sibling text in D3...~~
- ~~API Integration: Use API key fd295326b5fd4f997b6a5778e50c3060 for Entrez-AJAX (http://entrezajax.appspot.com/)~~
- ~~Clean up JS: Maybe move to separate JS file, remove unnecessary or redundant code, organize more with functions or classes?~~
- ~~Prettify layout.~~
- ~~Prettify color scheme and fonts.~~
- ~~Integrate API data fully into page~~
    + ~~into a sidebar~~
    + ~~entwined with form fields~~
    + ~~reactive to user~~
        * ~~searches selected regions~~
- ~~Form fields (all)~~
- ~~Label lobes and brain stem~~
- ~~A sidebar for the facts and articles~~
- ~~- Allow brain labels to be clickable as well~~

Notes
______


    $("#reset").on("click", function(){

        $("svg > *").addClass("unclicked");

    });

Something like the above code will not work unless the unclicked class contains the right styles... maybe I'll create an unclicked class?
