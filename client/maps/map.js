//this would load it right away upon starting meteor, so I commented it out.

// if (Meteor.isClient) {
//   Meteor.startup(function() {
//     GoogleMaps.load();
//   });
var MAP_ZOOM = 16; 

// var  lat = Geolocation.latLng().lat;
// var  lng = Geolocation .latLng().lng;

//empty array that we will use to store the results from google places:
placesResponse = [];
placeNames = [];
placeType = [];
placeVicinity = [];
renderedPlaces = [];
renderedNames = [];
renderedType = [];
renderedVicinity = [];
previousPlaces = [];
renderedPlacesIcons = [];
radiusLat = [];
radiusLng = [];


Template.map.onRendered(function() {
  GoogleMaps.load({ key: "AIzaSyBjCsLiR6z8Xgg1LNELZNBpESGylRFt1CE", libraries: "geometry,places" });
});

  Template.map.helpers({
    exampleMapOptions: function() {
      var latLng = Geolocation.latLng();
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        //google places call, and set session location
        latLng = Geolocation.latLng();

        Session.set('sessionLocation', latLng);

        console.log('location is: ' + latLng.lat + ' ' + latLng.lng);
            
        sessionLocation = Session.get("sessionLocation");
            
        HTTP.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+sessionLocation.lat+","+sessionLocation.lng+"&radius=500&key=AIzaSyBjCsLiR6z8Xgg1LNELZNBpESGylRFt1CE", function(error,response){
              placesResponse = response.data.results;
              //console log for testing purposes
              // console.log(response.data.results);
              console.log(placesResponse);
              //debugger for testing purposes
              // debugger;
              _.shuffle(placesResponse);
              // debugger;
              Session.set('sessionPlaces', placesResponse);
            }); 
 
        // Map initialization options
        return {
          center: new google.maps.LatLng(sessionLocation.lat, sessionLocation.lng),
          zoom: 17
        };
      }
    }
  });

  Template.map.onCreated(function() {
    var self = this;
    // GoogleMaps.loadUtilityLibrary('/map_libs/geolocation-marker.js')
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('map', function(map) {


      // GoogleMaps.ready('map', function(map) {
      //     var latLng = currentPosition();

      // Tracker.autorun(function() {
      //      map.instance.setCenter(new google.maps.LatLng(latLng.lat, latLng.lng));
      //      var GeoMarker = new GeolocationMarker(map.instance);

      //    });

      // Add a marker to the map once it's ready
      //trying to add an array of markers

      for (i = 0; i<placesResponse.length; i ++){
        placeNames.push(placesResponse[i].name);
        placeType.push(placesResponse[i].types);
        placeVicinity.push(placesResponse[i].vicinity);

      };


      //shuffle the 
// 
      // renderedPlaces.push(placesResponse[0]);
      //need a conditional here based on user points (for the second place) not sure where it will be stored yet.
      // renderedPlaces.push(placesResponse[1]);

      renderedPlaces.push(placesResponse[Math.floor(Math.random() * placesResponse.length)]);
      renderedPlaces.push(placesResponse[Math.floor(Math.random() * placesResponse.length)]);

      for (i = 0; i<renderedPlaces.length; i ++){

        renderedNames.push(renderedPlaces[i].name);
        renderedType.push(renderedPlaces[i].types);
        renderedPlacesIcons.push(renderedPlaces[i].icon);
        renderedVicinity.push(renderedPlaces[i].vicinity);
        previousPlaces.push(renderedPlaces[i]);
        console.log(JSON.stringify(renderedNames));
        console.log(renderedNames[i]);

        var resizedIcon = {
          url: renderedPlaces[i].icon,
          scaledSize: new google.maps.Size(25, 35),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(35, 35)
        };
        
        var POImarker = new google.maps.Marker({
          position: renderedPlaces[i].geometry.location,
          map: map.instance,
          animation: google.maps.Animation.DROP,
          label: renderedPlaces[i].name,
          icon: resizedIcon
        });

        // CIRCLE AROUND MARKERS: 

        var POIcircle = new google.maps.Circle({
          map: map.instance,
          clickable: false,
          strokeColor: '#FF0000',
          radius: 10000,
          fillcolor: '#FF0000',
          fillOpacity: .35,
          center: POImarker.position
        });

        POIcircle.bindTo("center", POImarker, "position");

        var bounds = POIcircle.getBounds();
        radiusLng.push(bounds.b);
        radiusLat.push(bounds.f);

//moved this from outside the loop into it. but now it's happening twice, however, I need it in here as I need to have access to the POI circles and their bounds.
        // Template.body.events({
        //   'click .check-in': function (e) {
        //     e.preventDefault();
        //     console.log("check in button pressed. user is at: lat: " + sessionLocation.lat + " lng: " + sessionLocation.lng);

        //     //the commented out code is specifically for a perfect geolocation match with session location.

        //     if (sessionLocation === renderedPlaces[0].geometry.location || sessionLocation === renderedPlaces[1].geometry.location){
        //       console.log("user has reached POI!");
        //       alert('Nice work! Answer the question below!');
        //     }else{
        //       alert('You haven\'t reached one of the goal locations yet! Head over to one and then check in!');
        //     }

        //     radiusCheck = new google.maps.LatLng(sessionLocation.lat, sessionLocation.lng);
        //     console.log(bounds.contains(radiusCheck));
        //   }
        // }); 

      radiusCheck = new google.maps.LatLng(sessionLocation.lat, sessionLocation.lng);

      Template.body.events({
        'click #getTriviaButton': function (e) {
          e.preventDefault();
          console.log("check in button pressed. user is at: lat: " + sessionLocation.lat + " lng: " + sessionLocation.lng);

          console.log(bounds.contains(radiusCheck));

          if (bounds.contains(radiusCheck) == true){ 
            console.log("user has reached POI!");
            alert('Nice work! Answer the question below!');
            Session.set('showQuestion', true);
            Session.set('sessionPoints', 1);
          }else{
            alert('You haven\'t reached one of the goal locations yet! Head over to one and then check in!');
            console.log("user clicked button but has not reached");
          }
        }
      }); 

        //define infowindow 0  NOT WORKING currently
        // var infowindow = new google.maps.InfoWindow();
        // debugger;
        //content string for info window - NOT WORKIGN currently
        // var contentString[i] = "null"
        // "<div id=\"content\"><h1 id=\"POIname\">"
        //  + renderedNames[i].name 
        //  + "  </h1><br><h3 id=\"types\"> Keywords:" 
        //  + renderedType[i].types 
        //  + "</h3><br><h3 id=\"vicinity\">Address/Vicnity:" 
        //  + renderedVicinity[i].vicinity+"</h3></div>" 

         // console.log(contentString[i]);

        //info window variable - NOT WORKING currently
        //  infowindow = new google.maps.InfoWindow({
        //   content: contentString
        // });

        //listener to open info window on click - NOT WORKING currently
        // POImarker.addListener(POImarker, 'click', function(POImarker, i){
        //   return function(){
        //   infowindow.setContent(contentString);
        //   infoWindow.open(map, POImarker);
        // }
        // });

        // POImarker.addListener('click', function(){
        //   infowindow.open(map, POImarker);
        // });
      }
      //trying to drop in a pin for session/user location now

      //gold star image for the user's location
        // var goldStar = {
        //   path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        //   fillColor: 'yellow',
        //   fillOpacity: 0.8,
        //   scale: 1,
        //   strokeColor: 'gold',
        //   strokeWeight: 14
        // };

        //pin image for user location (second option)
        var pinColor = "2DB4E0";
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(0, 0));

      var marker;
      var userLatLng = Geolocation.latLng();

      self.autorun(function(){
        userLatLng = Geolocation.latLng();
        if (! userLatLng)
          return;

        if (! marker){
          console.log('new user location marker');
          var marker = new google.maps.Marker({
            animation: google.maps.Animation.BOUNCE,
            position: sessionLocation,
            map: map.instance,
            icon: pinImage
          });
        }else{
          marker.setPosition(userLatLng);

          Session.set('currentUserLocation', userLatLng);

          console.log('Location moved. Current location is: ' + userLatLng.lat + ' ' + userLatLng.lng);
              
          currentUserLocation = Session.get("currentUserLocation");
        }
      });
    });
  });

// Template.body.events({
//   'click .check-in': function (e) {
//     e.preventDefault();
//     console.log("check in button pressed. user is at: lat: " + sessionLocation.lat + " lng: " + sessionLocation.lng);

//     //can use the bounds here if I need to, will try contains first.

//     if (sessionLocation === renderedPlaces[0].geometry.location || sessionLocation === renderedPlaces[1].geometry.location){
//       console.log("user has reached POI!");
//       alert('Nice work! Answer the question below!');
//     }else{
//       alert('You haven\'t reached one of the goal locations yet! Head over to one and then check in!');
//     }
//     //getting an error message here:
//     console.log( bounds.contains( sessionLocation ) );
//   }
// }); 

  // google.maps.Circle.prototype.contains = function(latLng) {
  //   return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
  // };