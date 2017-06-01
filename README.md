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
		*Added to code to infowindow's closeClick listener which sets the marker back to red

	5/31/2017:
		*Added functionality to click listener which pans to the marker when it's selected

	6/1/2017:
		*Removed zipcode information from markers