# Do-Re-Minisce

Frontend can be found [here](https://github.com/kyle-richardson/doreminisce)

## Endpoints

<!-- BASE URL -->

- | BASE URL | **https://doreminisce.herokuapp.com**

- | Method | **URL** | Description

<!-- Auth  -->

- | GET | **/chart/:date** | Gets the billboard top 100 for the week of the query date.  `date` needs to be in a format that is recognized by Javascript's [Date contructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date). Returns a JSON object for the chart.
- | GET | **/auth-spotify** | Redirects to spotify site for OAuth 2.0 process. Must be accessed via window URL, not via a promise based HTTP client (fetch(), axios). example: `window.open("https://doreminisce.herokuapp.com/auth-spotify", "_self");`

## About

#### Tech Stack used:
  - React
  - Node.js
  - Express

#### Libraries/resources/tools used:
 - Spotify API
 - Spotify OAuth 2.0 authentication
 - Billboard-top-100 API
 - Material UI
 - Moment
 - Axios
 - React Icons
 
 ## Developed by:
 
 Kyle Richardson
  - [LinkedIn](https://www.linkedin.com/in/kyle-m-richardson/)
  - [Github](https://github.com/kyle-richardson/)
