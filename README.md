This application uses Google Maps API and Knockout Javascript framwork to explore 
murals around Baltimore City, Maryland. The Socrata Open Data API is used to 
retrieve data about murals around Baltimore from Open Baltimore, an open 
database with information about Baltimore. This data is retrieved 
asynchronously via JQuery's $.Ajax method and devlivered in JSON format. The 
data is saved into the Knockout model, as well as a Google Maps API markers 
object. Each mural is assigned an id which keeps the data from each source in 
correspondence. When a list item or marker is clicked, more information about 
the mural is displayed. Responsive CSS is used so the application displays of 
a variery of browsers.

#How to Run the Application
---------------------------
To run the application, simply clone the repository, then open index.html. 
Enter search terms in the upper left corner. Click items in the list or 
markers on the right for more information.

#List of Files
--------------

	*js/app: The application
	*js/lib/knockout-3.4.2.js: Knockout Library
	*css/styles.css: CSS styling
	*index.html: The HTML page the application is rendered on
	*README.md: this readme file

#List of Changes
----------------

	5/24/2017:
		*Modified closeclick listener so selectedMural would be set to null, 
			unhighlighting mural on the list
		*Modified #controls ID in styles.css so it isn't obscured by the list
			and gave it a bit of padding
		*Added "viewport" meta tag to index.html so the page will display 
			properly on modbile devices
		*Removed outdated "type" attribute from link to styles.css
		*Added and removed semicolons where appropriate
		*Changed indentation to make code more readable, mostly to comments
		*Changed order of scripts so Google Maps API loads last and moved the 
			AJAX call inside initMap() function to match the success callback
		*Added onerror attribute to Google Maps API script call in index.html
			to gracefully handle the AJAX call failing
		*Added a functionality to populateInfoWindow so that unselected markers
			revert to the default red icon if they are no longer selected

	5/27/2017:
		*Modified meta tags and removed unnecessary </input> tag
		*Removed superfluous valueUpdate attribute from search box and 
			specified that it only searches for last names
		*Added "overflow-y: scroll" to sidebar element to make overflowing 
			text readable.

	5/29/2017:
		*Changed div elements to semantic HTML

	5/30/2017:
		*Added to code to infowindow's closeClick listener which sets the 
			marker back to red

	5/31/2017:
		*Added functionality to click listener which pans to the marker when 
			it's selected

	6/1/2017:
		*Removed zipcode information from markers
		*Switched Socrata API endpoint to a new set of data for the same 
			murals and adjusted lat/long assignment from JSON object

	6/4/2017:
		*Added imageURLs to data models retrieved from recently added data set 
			and added code to display them in the infoWindow

	6/5/2017:
		*Added code to determine if the mural has an associated image, and if 
			not, don't add broken img tag to the infoWindow

	6/7/2017:
		*Added a "dataFilter" function to ajax request which sets undefined 
			attribute/value pairs to an empty string
		*Changed logic of filter function to return results which match 
			first/last name or address

	6/8/2017:
		*Modified dataFilter for images to be more rigorous by defining 
			image and it's attributes

	6/9/2017:
		*Implemented album view functionality

	6/11/2017:
		*Implemented cleanData function which modifies errors in the original 
			data; also defined another variable outside for loop arguments

	6/12/2017:
		*Added another mural to cleanData function
		*Modified imageURL to be a persistent property of data object
		*Added Flag of Baltimore resource

	6/14/017:
		*Added another mural to cleanData function

	6/15/2017:
		*Fixed app.js and index.html to property display flag when image is 
			missing. Also reuploaded flag.svg
		*Fixed bug from last update which prevented images from displaying 
			in infoWindow

	6/16/2017
		*Added "checkDuplicateLats" function which prints overlapping markers
			in the console

	6/19/2017:
		*Modify checkDuplicateUpdates function to propertly clone original 
			data, instead of reassigning it

	6/21/2017:
		*Added another mural to cleanData function

	6/22/2017:
		*Refactor cleanData function to refer to seperate file for data
		*Add several murals to cleanData function

	6/28/2017:
		*Added a Geocoder funtion which gets lat/long from an address

	6/30/2017:
		*Develop geoCodeAddress function to actually modify marker lat/lng,
			pass 'data' and 'i' as arguments
		*Add documentation to geoCodeAddress function
		*Modify geoCodeAddress so it updates the marker on the map

	7/3/2017:
		*Add ', Baltimore MD' to end of address on geoCodeAdress function
		*Add several murals to cleanData.js for geoCode function

	7/12/2017:
		*Modify geoCodeAddress to code 10 murals at a time and rename it 
			geoCode10Addresses
		*Add geoCodeLoop to call geoCode10Addresses at 10 second intervals

	7/20/2017:
		*Refactor geoCode10Addresses and geoCodeLoop and combine them into 
			one function
		*Fix a bug where geocoding functions would call the same 10 addresses

	8/28/2017:
		*Fix a bug where geocoding function was assigning the address 10 
		times because it was out of sync with the asynchronious callback 
		function

	9/8/2017:
		*Refactor geoCodeLoop to decriment geoCodeIndex outside of 
		conditionals

	9/9/2017:
		*Fix a bug which would log the wrong mural ID because it wasn't called 
		asynchronously

	9/12/2017:
		*Added first streetview URL to cleanData.js

	9/14/2017:
		*Added another streetview URL to cleanData.js

	9/24/2017:
		*Added several streetview URL IDs without URLs to cleanData.js
		*Added several streetview URLs to cleanData.js

	9/26/2017:
		*Moved code for dealing with image URLs to earlier dataFilter part of 
			ajax request
		*Modified cleanData function to change the URL of murals listed in 
			cleanData.js
		*Removed a duplicate URL from cleanData.js

	11/05/2017:
		*Refactored geoCodeLoop into a separate function so it works asynchronously

	11/09/2017:
		*Ordered/removed duplicate geocode requests in cleandata.js
		*Manually lat/long'ed 2 markers that were not geocoding properly
		*Manually lat/long'ed 5 markers that were not geocoding properly
		*Added 4 murals to splice in cleanData.js
		*Added 3 more murals to splice in cleanData.js
		*README.md, cleanData.js formatting
		*Added 1 more mural to splice in cleanData.js
		*Added 1 mural to latLong and streetview
		*Added 3 murals to splice in cleanData.js
		*Added 1 splice and 2 streetviews to cleanData.js

	11/21/2017:
		*Added 1 more iteration to the last geocode call to accomodate 1-off error
		*Added 2 murals and removed 1 mural from geocode in cleanData.js

	11/22/2017:
		*Moved geoCodeIndex decriment to top of geoCodeLoop function to fix
			1-off error, removed previous offsets from arguments

	11/27/2017:
		*Removed unused variable asyncGeoCodeIndex
		*Set conditions for initial geoCodeLoop call to account for less than 10 murals

	11/28/2017:
		*Modified geoCodeAddress to store results as string and added 
			geoCodeCache function to retrieve stored results and assign them 
			to markers 
		*Moved a mural from streetview to splice in cleanData.js
		*Added finalTimeOut variable so final geoCodeLoop call only 
			"recharges" for number of seconds neccessary to not trigger too
			many requests error

	11/29/2017:
		*Enabled splice to remove bad murals and removed debugging features
		*Several style and formatting changes