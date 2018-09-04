/// Custom Filter - DK

var WooFilter = (function () {
    var url = location.protocol + '//' + location.host + location.pathname + '?outlet_filter=1';
	var data = {};

 	// Init - get all taxonomies
 	$('[taxonomy]').each(function(e) {
 		var taxonomy = $(this).attr('taxonomy');
 		var params = getUrlParameter(taxonomy);

 		if (typeof params !== "undefined" && params.length > 0) {
 			params = params.split(',');
 			data[taxonomy] = params;
 		} else {
	 		data[taxonomy] = [];
 		}
 	});

 	function push() {
 		generate_url();

 		window.location.href = url;
 	}

 	function generate_url() {
	 	//Add orderby to url
	 	var orderby = getUrlParameter('orderby');

	 		if (typeof orderby !== "undefined" && orderby.length > 0) {
	 			url += '&orderby='+orderby;
	 		}

 		for (var key in data) {

 			if(data[key].length > 0){
		 			var group = '&'+key+'=';

		 			for (var subkey in data[key]) {

		 				if (subkey != 0) {
		 					group += ',';
		 				}
		 				group += data[key][subkey];
		 			}
		 			url += group;
		 	}

 		}
 	}

 	function getUrlParameter(sParam) {
		    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		        sURLVariables = sPageURL.split('&'),
		        sParameterName,
		        i;

		    for (i = 0; i < sURLVariables.length; i++) {
		        sParameterName = sURLVariables[i].split('=');

		        if (sParameterName[0] === sParam) {
		            return sParameterName[1] === undefined ? true : sParameterName[1];
		        }
		    }
		}

		function encodeData(data) {
		    return Object.keys(data).map(function(key) {
		        return [data[key]];
		    }).join(",");
		}


    return {

        exist: function(taxonomy, ele) {
        	if ( $.inArray(ele, data[taxonomy]) >= 0 ) {
        		return true;
        	} else {
        		return false;
        	}
        },

        add: function(taxonomy, ele) {
        	data[taxonomy].push(ele);
        	push();
        },

        remove: function(taxonomy, ele) {
        	for (var key in data[taxonomy]) {
        	    if (data[taxonomy][key] == ele) {
        	        data[taxonomy].splice(key, 1);
        	    }
        	}
        	push();
        },

        debug: function() {
        	console.log(data);
        	// push();
        }


    };
})();