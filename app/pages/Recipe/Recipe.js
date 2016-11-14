(function(){
    'use strict';

    var recipeID = null;
    var foodProvider = formelo.require("FoodProvider");
    formelo.event().onIntent(function(params){
        recipeID = params.detail.recipe_id;
    });

    formelo.event().onCreate(function(){
       recipeIDValue(recipeID);      
       console.log(recipeID);
       customise();

    });

    formelo.event().onClose(function(){
        // Override close button
        // formelo.navigation.stopPropagation()
    });
    function recipeIDValue(res_id){        
        var data = {
            rId : res_id
        }
        var bluk;
        foodProvider.getRecipeByID(data, function(result){
        var res = JSON.parse(result);
        console.log(res.recipe);
         var fornat= [];
         var values = res.recipe.ingredients;
         console.log(values);
         values.forEach(function(item){
            fornat.push(item);
         });
        console.log(fornat);

        var html = '<div>'+
                    '<h2 style="font-weight:20px"><b>'+res.recipe.title+'</b></h2>'+
                    '<div><img style="width:350px; height:250px; border-radius:5px;margin-top:20px" src='+res.recipe.image_url+'></div>'+
                    '<div style="font-size:20px; margin-top:20px"><b>Ingredients:</b></div>'+
                    '<div style="font-weight:10px; margin-top:10px"><b>'+fornat.join("\n")+'</div>'+
                    '<div>'+'<a href='+res.recipe.f2f_url+' style="font-size:20px; margin-top:20px"><b>Directions</b></a></div>'+
                    '<div style="font-weight:10px; margin-top:10px"><b>View on The'+res.recipe.title+' </b></div>'+
                    '</div>';
                $("#third").html(html); 

        alert(JSON.stringify(res.recipe.publisher));
        },function(error){
        alert(error);
        });
    }
    function customise(){
        formelo.html().get.header.title().html("Details");
}
}());