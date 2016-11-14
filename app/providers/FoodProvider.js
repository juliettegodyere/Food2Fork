(function() {

    var FoodProvider = {};
    FoodProvider.alertSomething = function(something){
    	alert(something);
    }

    FoodProvider.keys = {
    	mashape : "SxZn0SGRjXmshWHiMeJBTyX7svGxp1DXihSjsnnrHi3tHUCX0Z",
    	f2f : "1dcce1114722c8a4ebf06db1e276b486"
    }
    FoodProvider.searchUrl = "https://community-food2fork.p.mashape.com/search";
    FoodProvider.getRecipeByIDUrl = "https://community-food2fork.p.mashape.com/get"; 


    FoodProvider.network = function(endpoint, _data, _method){
       var data    = _data      || {};
       data['key'] = FoodProvider.keys.f2f;
       var method  = _method    || 'GET';
       var txDeferred = $.Deferred();
       var headers = {};
       headers['X-Mashape-Key'] = FoodProvider.keys.mashape;
       $.ajax({
               url : endpoint,
               type : method,
               data : data,
               cache: false,
               headers: headers,
               // dataType: 'json',
               success : function(data){
                   txDeferred.resolve(data);
               },
               error: function(xhr){
                   console.log(xhr);
                   txDeferred.reject(xhr);
               },
               timeout: TIMEOUT
           });
       return txDeferred.promise();
   };
   FoodProvider.search = function(data, successCB, errorCB){
   		$.when(FoodProvider.network(FoodProvider.searchUrl, data))
   		.done(function(dat){
        successCB(dat)
      })
   		.fail(function(error){
        errorCB(error)
      });
   };
   FoodProvider.search = function(data, successCB, errorCB){
      $.when(FoodProvider.network(FoodProvider.searchUrl, data))
      .done(function(dat){
        successCB(dat)
      })
      .fail(function(error){
        errorCB(error)
      });
   };
   FoodProvider.getRecipeByID = function(recipeID, successCB, errorCB){
      var data = recipeID;
   		$.when(FoodProvider.network(FoodProvider.getRecipeByIDUrl, data))
   		.done(function(value){
        successCB(value);
      })
   		.fail(function(error){
        errorCB(error)
      });
   }
   
    formelo.exports('FoodProvider', FoodProvider);
})();