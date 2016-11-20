(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {

		var initialMarker, endMarker, map, lat, lng, latitude1, longitude1, latitude2, longitude2, distanceBetween = 50, flag = 0;

		navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });

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
			    		flag = 0;
			    	var lat = event.latLng.lat(),
			    		lng = event.latLng.lng();
			    		endMarker = new google.maps.Marker({
			    		position: {lat: lat, lng: lng},
			    		map: map,
			    		draggable:true,
			    		title:"Drag me!"
			    	});

			    	checkDistanceBetween(lat, lng, initialMarker.position.lat(), initialMarker.position.lng());

			    	endMarker.addListener("click", function() {
			    		endMarker.setMap(null);
			    	});
			    });
			}

			function onError(error) {
				alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
			}

			function computeDistance(lat1, lng1, lat2, lng2) {
				return google.maps.geometry.spherical.computeDistanceBetween(
					new google.maps.LatLng(lat1, lng1), new google.maps.LatLng(lat2, lng2)
					);
			}

			function checkDistanceBetween(lat1, lng1, lat2, lng2) {
				if (computeDistance(lat1, lng1, lat2, lng2) < distanceBetween && flag === 0) {
					alert("You've got here!");
					flag = 1;
				} 
			}

			var options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			};

			navigator.geolocation.watchPosition(
				function (position) {
					var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    				map.panTo(center);
					setMarkerPosition(initialMarker, position);
					if (endMarker) {
						checkDistanceBetween(position.coords.latitude, position.coords.longitude, endMarker.position.lat(), endMarker.position.lng());
					}
				}, function(error) {
					alert(error);
				}, options);

			function setMarkerPosition(marker, position) {
				marker.setPosition(
					new google.maps.LatLng(
						position.coords.latitude,
						position.coords.longitude)
					);
			}
		}
	})();
