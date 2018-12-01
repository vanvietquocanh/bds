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
            var icons;
            switch(location[i]["Loại BDS"]){
              case "Biệt Thự":
                  icons = "villa"
                break;
              case "Đất":
                  icons = "land"
                break;
              case "Nhà":
                  icons = "house"
                break;
            }
          	location[i].geometry = {
          		location:{
          			lat : parseFloat(location[i]["Vị trí"].split(", ")[0]),
          			lng : parseFloat(location[i]["Vị trí"].split(", ")[1]),
          		},
              icons : `/icon-map/${icons}.svg`
          	};
            createMarker(location[i]);
          }
      }
      var infowindow = new google.maps.InfoWindow({
      });
      function createMarker(place, icon) {
        var marker = new google.maps.Marker({
          map: map,
          icon: place.geometry.icons,
          position: place.geometry.location,
          title: 'Uluru (Ayers Rock)'
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
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