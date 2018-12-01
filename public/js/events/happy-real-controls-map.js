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
            console.log(location);
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
      var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      function createMarker(place, icon) {
        console.log(contentString);
        var marker = new google.maps.Marker({
          map: map,
          icon: place.geometry.icons,
          content : contentString,
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