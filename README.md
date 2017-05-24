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
		* Modified closeclick listener so selectedMural would be set to null, 
			unhighlighting mural on the list
		* Modified #controls ID in styles.css so it isn't obscured by the list
			and gave it a bit of padding