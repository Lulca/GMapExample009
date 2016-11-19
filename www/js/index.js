(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {

		navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });

		var initialMarker, map, lat, lng;

		function onSuccess(position) {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			var mapOptions = {zoom: 16,center: {lat: lat, lng: lng}}
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			initialMarker = new google.maps.Marker({
				position: {lat: lat, lng: lng}, 
				map: map
			});

			    //add marker by clicking on the map
			    google.maps.event.addListener(map, "dblclick", function(event) {
			    	var lat = event.latLng.lat(),
			    	lng = event.latLng.lng();
			    	var marker = new google.maps.Marker({
			    		position: {lat: lat, lng: lng},
			    		map: map,
			    		draggable:true,
			    		title:"Drag me!"
			    	});

			    	marker.addListener("click", function() {
			    		marker.setMap(null);
			    	});
			    });
			}

			function onError(error) {
				alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
			}

			google.maps.event.addDomListener(window, 'load', onSuccess);

			navigator.geolocation.watchPosition(
				function (position) {
					setMarkerPosition(initialMarker, position);
				});

			function setMarkerPosition(marker, position) {
				marker.setPosition(
					new google.maps.LatLng(
						position.coords.latitude,
						position.coords.longitude)
					);
			}

			// var watchID = navigator.geolocation.watchPosition(function(position) {

			// 	var element = document.getElementById('geolocation');
			// 	element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
			// 	'Longitude: ' + position.coords.longitude     + '<br />' +
			// 	'<hr />'      + element.innerHTML;

			// }, function(error) {
			// 	alert('code: '    + error.code    + '\n' +
			// 		'message: ' + error.message + '\n');
			// }, { timeout: 1000 });





		}
	})();
