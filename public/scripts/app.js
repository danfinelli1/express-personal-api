console.log("Sanity Check: JS is working!");
$(document).ready(function() {

    var template;
    var allStrains = [];

    var $strainsList = $('#strainTarget');

    //compile handlebars
    var source = $('#strains-template').html();
    template = Handlebars.compile(source);

    $.ajax({
        method: 'GET',
        url: '/api/strains',
        success: handleSuccess
    });

    $strainsList.on('click', '.deleteBtn', function() {
        console.log('clicked delete button to', '/api/strains/' + $(this).attr('data-id'));
        $.ajax({
            method: 'DELETE',
            url: '/api/strains/' + $(this).attr('data-id'),
            success: deleteStrainSuccess
        });
    });

    $('#newStrainForm').on('submit', function(event) {
        event.preventDefault();
        var showData = $('#show-data');
          console.log('new book serialized', $(this).serializeArray());
          $.ajax({
            method: 'POST',
            url: '/api/books',
            data: $(this).serializeArray(),
            success: newStrainSuccess
          });
        });

        $.ajax({
            url: '/api/strains',
            method: 'POST',
            data: $('#newStrainForm').serialize(),
            dataType: 'json',
            handleSuccess
        });
    });

    function render() {
        $strainsList.empty();
        var strainsHtml = template({
            strains: allStrains
        });
        $strainsList.append(strainsHtml);
    }

    function handleSuccess(data) {
        //Do stuff with the JSON data
        console.log(data);
        allStrains = data;
        render();
    }

    function newStrainSuccess(json) {
      $('#newStrainForm').val('');
      allStrains.push(json);
      render();
    }

    function deleteStrainSuccess(json) {
      var strain = json;
      console.log(strain);
      var strainId = strain._id;
      console.log('delete book', strainId);
      // find the book with the correct ID and remove it from our allBooks array
      for(var index = 0; index < allStrains.length; index++) {
        if(allStrains[index]._id === strainId) {
          allStrains.splice(index, 1);
          break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
        }
      }
      render();
    }
