'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	
    /*
    $("#signIn").click(function(e){
 //       window.location.href = "/index";
        
        console.log("Sign in");
        var json = {"userName": $('#userName').val(), "passWord": $('#passWord').val()};
        
        $.post('/login', json, function(){
            window.location.href = "/index";
        });
        
        /*$.post('/login', json);*/
   // })
    
}
