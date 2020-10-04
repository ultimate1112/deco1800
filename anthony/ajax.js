// Requires JQuery.
$(document).ready(function() {

    // Time in n.
    var currentTime = new Date().getTime();

    // Retrieve Dataset from cache.
    var dataset = JSON.parse(localStorage.getItem('LGAROR'));
    var datasetExpiry = new Date(parseInt(localStorage.getItem('LGAROR_expiry'))).getTime();
    alert('Time: ' + currentTime + ' | ' + datasetExpiry);

    // Check if cache is valid.
    if(dataset && (currentTime - datasetExpiry) < 60000) {
        console.log("Source: localStorage.");
    } else {
        console.log("Source: AJAX call");

        // Pull from data.qld.gov.au.
        var data = {
			resource_id: "39ca02ad-e4e4-4c4b-af17-d6696895864a"
		}
		$.ajax({
			url: "https://data.qld.gov.au/api/3/action/datastore_search",
			data: data,
			dataType: "jsonp",
			cache: true,
			success: function(data) {
                console.log('Total results found: ' + data.result.total);
                localStorage.setItem("LGAROR", JSON.stringify(data));
                localStorage.setItem("LGAROR_expiry", currentTime);
			}
        });
        
    }



    // Ajax Default Call.
    var data = {
        sql: "",
    }
    $.ajax({
        url: 'https://www.data.qld.gov.au/api/3/action/datastore_search_sql',
        data: data,
        dataType: 'jsonp',
        success: function(data) {
          alert('Total results found: ' + data.result.total)
        }
    });






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: "",
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: ""
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: "",
    }
    $.ajax({
        url: 'https://www.data.qld.gov.au/api/3/action/datastore_search',
        data: data,
        dataType: 'jsonp',
        success: function(data) {
          alert('Total results found: ' + data.result.total)
        }
    });






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: "",
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: ""
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: "",
    }
    $.ajax({
        url: 'https://www.data.qld.gov.au/api/3/action/datastore_search',
        data: data,
        dataType: 'jsonp',
        success: function(data) {
          alert('Total results found: ' + data.result.total)
        }
      });






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: "",
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: ""
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: "",
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: ""
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: "",
    }
    $.ajax({
        url: 'https://www.data.qld.gov.au/api/3/action/datastore_search',
        data: data,
        dataType: 'jsonp',
        success: function(data) {
          alert('Total results found: ' + data.result.total)
        }
    });






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: "",
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: ""
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: "",
    }
    $.ajax({
        url: 'https://www.data.qld.gov.au/api/3/action/datastore_search',
        data: data,
        dataType: 'jsonp',
        success: function(data) {
          alert('Total results found: ' + data.result.total)
        }
      });






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: "",
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: ""
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: "",
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: ""
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql: 
    }






}); // End of AJAX



    var data = {
        sql:
    }






}); // End of AJAX



    var data = {
        
    }






}); // End of AJAX





    




}); // End of AJAX





    




}); // End of AJAX







}); // End of AJAX











function 



fu