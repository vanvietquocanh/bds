// document.addEventListener('contextmenu', event => event.preventDefault());
jQuery(document).ready(function($) {
	var map;
    var zoom; 
    var infowindow;
    function detectmob() { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
	}
    function initMap(zoom) {
        var pyrmont = {lat: 16.0350837, lng: 108.2094689};
        map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: zoom
        });
        infowindow = new google.maps.InfoWindow();
        callback(data)
      }
      function callback(location) {
          for (var i = 0; i < location.length; i++) {
          	location[i].geometry = {
          		location:{
          			lat : parseFloat(location[i]["Vị trí"].split(", ")[0]),
          			lng : parseFloat(location[i]["Vị trí"].split(", ")[1]),
          		}
          	};
            createMarker(location[i]);
          }
      }

      function createMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
      if(detectmob()){
      	zoom = 11;
        $("#map").css("height","400px")
      }else{
      	zoom = 12;
      }
      initMap(zoom);
});