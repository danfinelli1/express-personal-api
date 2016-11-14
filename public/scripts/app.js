console.log("Sanity Check: JS is working!");
$(document).ready(function() {

    var template;
    var allStrains = [];

    var $strainsList = $('#strainTarget');

    //compile handlebars
    var source = $('#strains-template').html();
    template = Handlebars.compile(source);

    //getting all strains
    $.ajax({
        method: 'GET',
        url: '/api/strains',
        success: handleSuccess
    });

    //returns allStrains
    function render() {
        $strainsList.empty();
        var strainsHtml = template({
            strains: allStrains
        });
        $strainsList.append(strainsHtml);
    }

    function handleSuccess(data) {
        allStrains = data;
        render();
    }
});
