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

    //delete btn
    $strainsList.on('click', '.deleteBtn', function() {
        $.ajax({
            method: 'DELETE',
            url: '/api/strains/' + $(this).attr('data-id'),
            success: deleteStrainSuccess,
            error: deleteStrainError
        });
    });

    //update btn
    $strainsList.on('click', '.updateBtn', function() {
        $.ajax({
            method: 'POST',
            url: '/api/strains/' + $(this).attr('data-id'),
            success: updateStrainSuccess,
            error: updateStrainError
        });
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

    function updateStrainSuccess(data) {
        var strain = data;
        var strainId = strain._id;
        console.log(strainId.indexOf());
        for (var index = 0; index < allStrains.length; index++) {
            if (allStrains[index]._id === strainId) {
                if (req.body.name !== allStrains[index].name && req.body.name !== '') {
                    allStrains[index].name = req.body.name;
                }
                if (req.body.tastes !== allStrains[index].tastes && req.body.tastes !== '') {
                    allStrains[index].tastes = req.body.tastes;
                }
                if (req.body.smellScale !== allStrains[index].smellScale && req.body.smellScale !== '') {
                    allStrains[index].smellScale = req.body.smellScale;
                }
                if (req.body.treats !== allStrains[index].treats && req.body.treats !== '') {
                    allStrains[index].treats = req.body.treats;
                }
                if (req.body.img_url !== allStrains[index].img_url && req.body.img_url !== '') {
                    allStrains[index].img_url = req.body.img_url;
                }
            }
        }
        allStrains.push(data);
        render();
    }

    function updateStrainError() {
        console.log('error on line 1');
    }

    function deleteStrainSuccess(json) {
        var strain = json;
        var strainId = strain._id;
        for (var index = 0; index < allStrains.length; index++) {
            if (allStrains[index]._id === strainId) {
                allStrains.splice(index, 1);
                break;
            }
        }
        render();
    }

    function deleteStrainError() {
        console.log('error on line 2');
    }
});
