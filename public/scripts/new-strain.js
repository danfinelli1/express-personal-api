console.log("Sanity Check: JS is working!");
$(document).ready(function() {

    var template;
    var allStrains = [];

    var $strainsList = $('#strainTarget');

    //new strain
    $('#newStrainForm').on('submit', function(event) {
        event.preventDefault();
        var showData = $('#show-data');
        $.ajax({
            method: 'POST',
            url: '/api/strains/new',
            data: $(this).serializeArray(),
            success: newStrainSuccess,
            errer: newStrainError
        });
    });

    function newStrainSuccess(data) {
        allStrains.push(data);
    }

    function newStrainError() {
      console.log('error with adding a new strain.');
    }

});
