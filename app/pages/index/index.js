(function(){
    'use strict';
    var foodProvider = formelo.require("FoodProvider");
    formelo.event().onCreate(function(){
        // Entry point of this application
        // var _data = foodProvider.search(data);
        // alert(_data);

        $("#next").click(function(){
            formelo.navigation().openActivity("search");
        })

    });

    formelo.event().onIntent(function(params){
        var data = params.detail;
        // Receive parameters from calling page
    });

    formelo.event().onClose(function(){
        // Override close button
        // formelo.navigation.stopPropagation()
    });
}());