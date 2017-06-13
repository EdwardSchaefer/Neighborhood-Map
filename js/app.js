//Initialize map object
var map;

//Create placemarkers array to use in multiple functions to have control over the number of places that show.
var markers = [];

//Model for Knockout
var Model = {

};

//View Model for Knockout
var AppViewModel = function() {
    var self = this;
    //Locations for KO list
    self.locations = ko.observableArray();
    //Search query observable which is updated every keystroke
    self.query = ko.observable('');
    //Search results observable which returns any location with an artist first/last name or address that matches the query
    self.filtered = ko.computed(function(){
        //Takes the locations array and returns any entries with a matching index 
        return ko.utils.arrayFilter(self.locations(), function(location){
            //Returns a value only if a matching value is found in at least 1 attribute
            //(-1 is returned if there is none)
            return (location.artistlastname.toLowerCase().indexOf(self.query().toLowerCase()) >= 0 ||
                location.artistfirstname.toLowerCase().indexOf(self.query().toLowerCase()) >= 0 ||
                location.location.toLowerCase().indexOf(self.query().toLowerCase()) >= 0);
        });
    });
    //The ID of the mural in question, uesd so the clicked list mural matches the clicked marker and vice versa
    self.selectedMural = ko.observable();
    //Message to display if AJAX call fails
    self.ajaxFail = ko.observable('');
    //Photo album view if true, list view if false
    self.albumView = ko.observable(false);
    //Function to change self.albumView
    changeToAlbumView = function(choice){
        self.albumView(choice)
    };
};

//Apply bindings to view
viewModel = new AppViewModel();
ko.applyBindings(viewModel);

//Selects the mural on the map, as if it was clicked
function selectMural(mural) {
    google.maps.event.trigger(markers[mural.id], 'click');
}

//modifies original data with errors/problems
//comments provide explanation
//splices should be last
function cleanData(data) {
    //wrong lat/long
    data[2].location_1.latitude = 39.319169; data[2].location_1.longitude = -76.625623;
    //duplicate of #13
    data.splice(18, 1);
}

//Initialize the map for Google Maps API
function initMap() {
    //Define parameters for retrieving data from Open Baltimore/Socrata Open Data API
    $.ajax({
        url: "https://data.baltimorecity.gov/resource/zqh4-9ud5.json",
        type: "GET",
        data: {
            "$limit" : 5000,
            "$$app_token" : "IAPCDodkEyfP95b6c7eJLut59"
        },
        //A dataFilter function which manipulates/sanitizes data before it's finsihed loading.
        //If an entry is missing an attribute/value pair, it is set to an empty string.
        //This prevents "undefined" values from causing crashes.
        dataFilter: function(data) {
            //Parse data from string to JS object
            var data = JSON.parse(data);
            //Define length outside of loop
            var dataLength = data.length;
            //Loop through the data. If an attribute is undefined, set it to empty string.
            for(var i = 0; i < dataLength; i++) {
                data[i].artistfirstname = data[i].artistfirstname ? data[i].artistfirstname : "";
                data[i].artistlastname = data[i].artistlastname ? data[i].artistlastname : "";
                data[i].year = data[i].year ? data[i].year : "";
                data[i].location = data[i].location ? data[i].location : "";
                if (!data[i].image){
                    data[i].image = {"file_id": "", "filename": ""};
                }
            }
            cleanData(data);
            //Return the modified results as a string.
            return JSON.stringify(data);
        }
        //Prepare the data for Google Maps API and Knockout 
    }).done(function(data) {
        //Define the prototype for the Google Maps InfoWindow object 
        var largeInfoWindow = new google.maps.InfoWindow();
        //Define length outside of loop
        var dataLength = data.length;
        for(var i = 0; i < dataLength; i++) {
            //Add a unique ID for each object in the array
            data[i].id = i;
            //See if the mural has an image, if not, set to empty string
            imageURL = data[i].image.file_id ? "https://data.baltimorecity.gov/views/zqh4-9ud5/files/" + data[i].image.file_id : "";
            //Create a new marker object and add the data to it
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(data[i].location_1.latitude, data[i].location_1.longitude),
                firstname: data[i].artistfirstname,
                lastname: data[i].artistlastname,
                address: data[i].location,
                year: data[i].year,
                id: i,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                imageURL: imageURL, 
                map: map
            });
            //Add an event listener (google API) that displays the infowindow and pans to the marker
            marker.addListener('click', function(){
                populateInfoWindow(this, largeInfoWindow);
                map.panTo(marker.getPosition());
            });
            //Add location to array for KO list
            viewModel.locations.push(data[i]);
            //Add marker to the global markers object
            markers.push(marker);
        }
        //If the data isn't retrieved from the server, send the error message to the KO observable
    }).fail(function() {
        viewModel.ajaxFail('Failed to retrieve data via API');
    });
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.310000, lng: -76.610000},
        zoom: 13
    });
}

//Populates the InfoWindow when the marker is clicked.
function populateInfoWindow(marker, infowindow) {
//Check to make sure the InfoWindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        //Determine if there is an image associated with the mural and define it in the img tag, otherwise add no image
        if (marker.imageURL) {
            imageTag = '<img src = ' + marker.imageURL +  ' height="250"></div>'
        } else {
            imageTag = '';
        }
        infowindow.setContent('<div>Name: ' + marker.firstname + ' ' + marker.lastname + '<br>' +
                'Address: ' + marker.address + '<br>' +
                'Year: ' + marker.year + '<br>' + imageTag);
        //Open the InfoWindow
        infowindow.open(map, marker);
        //Make sure the marker property is cleared if the InfoWindow is closed and list item/marker unhighlighted
        infowindow.addListener('closeclick', function() {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            infowindow.marker = null;
            viewModel.selectedMural(null);
        });
        //Resets marker icons to default
        for (var i = 0; i < markers.length; i++) {
            markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        }
        //Changes selected marker's icon from default
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/purple-dot.png');
        //Sets the KO observable to match the mural's ID so it is highlighted on the list
        viewModel.selectedMural(marker.id);
    }
}

//Hides all the markers, then displays the ones which match the search results
function markerUpdate() {
    //Loops through the markers and hides them
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    //Gets the length of search results
    length = viewModel.filtered().length;
    //Loops through the markers and redisplay them based on IDs from search results
    for (i = 0; i < length; i++) {
        x = viewModel.filtered()[i].id;
        markers[x].setMap(map);
    }
}