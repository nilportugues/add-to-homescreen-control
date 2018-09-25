# Add To Home Screen banner control

This library allows you to  programatically show Add to Homescreen banner. this feature is available from Chrome 68 but the library works on the older versions aswell. It's recomennded to read [useful information](https://github.com/filrak/add-to-homescreen-control/blob/master/README.md#useful-information) section before using this library to avoid common problems and gotchas.

# How to use this library

1. Install the library
````
npm i add-to-homescreen-control -d
````
2. Enable it as soon as you can
````js
import ATHS from 'add-to-homescreen-control'
  
ATHS.enable()
````
3. Show the Add To Home Screen banner whenever you want to with `prompt()` method. The banner will appear only if the [criteria](https://developers.google.com/web/fundamentals/app-install-banners#criteria) are met. You can handle unmet criteria in two ways:
- you can use `canPrompt` property to check if the `prompt()` method is available:

````js
const ATHSBtn = document.querySelector('#add-to-homescreen-btn')
  
ATHSBtn.addEventListener('click', () => {
  if ( ATHS.canPrompt ) {
    ATHS.prompt()
  } else {
     // handle scenario when ATHS criteria are not met
   }
 })
````  

- or make use of the fact that `prompt()` returns a Promise:
````js
  ATHS.prompt(
    .then(() => console.log('success'))
    .catch(err => console.log(err))
````

# Useful information 

### Add To Homescreen criteria (Chrome)
- The web app is not already installed
- The user has interacted with the domain for at least 30 seconds
- Your `index.html` includes Web App Manifest with at least following properties`short_name`, `name`, `start_url`, `icons` (at least 192px and 512px), `display` (standalone, fullscreen, minimal-ui)
- You have registered Service Worker with a fetch event handler (can't be a dummy one)

This criteria are different for other browsers. 
- [Firefox](https://developer.mozilla.org/en-US/Apps/Progressive/Add_to_home_screen#How_do_you_make_an_app_A2HS-ready)
- [MS Edge](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps#requirements)
- [Opera](https://dev.opera.com/articles/installable-web-apps/)


