# Add To Home Screen banner control

This library allows you to  programatically show Add to Homescreen banner. this feature is available from Chrome 68 but the library works on the older versions aswell.

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
3. Show the Add To Home Screen  banner whwnever you want. It will appear only if the [criteria](https://developers.google.com/web/fundamentals/app-install-banners#criteria) are met. You can handle unmet criteria in two ways:
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
