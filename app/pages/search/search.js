(function(){
    'use strict';

    var foodProvider = formelo.require("FoodProvider");
    formelo.event().onCreate(function(){
               customise();

        var title = formelo.html().getActionBar();
        
        $(".search-query").on('keyup', function(){
            var val = $(this).val();
            if (val.length > 3) {
                searchValue(val);
            }
        });
       
    });

    formelo.event().onIntent(function(params){
        var data = params.detail;
        // Receive parameters from calling page
    });

    formelo.event().onClose(function(){
        // Override close button
        // formelo.navigation.stopPropagation()
    });
    function searchValue(val){        
            var data = {
                q : val
            }
        foodProvider.search(data, function(result){
            var res = JSON.parse(result);
            console.log(res);
            showResult(res.recipes);
        },function(error){
            alert(error);
        });

    }
    function showResult (_data){
        var formattedData = [];
        _data.forEach(function(item){
            formattedData.push({
                image : item.image_url,
                name : item.title,
                description : item.publisher,
                unique : item.recipe_id
            })
        });
        formelo.ui().gridAdapter(formattedData, '#search-results').attach(function(unique){
            formelo.navigation().openActivity("Recipe", {recipe_id : unique});
            console.log(unique);
            
        });
    }
    function customise(){
        formelo.html().get.header.title().html("Recipes");
}
}());