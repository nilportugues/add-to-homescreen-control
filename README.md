# Add to Home Screen banner control

This library allows you to  programatically show Add to Home Screen banner. This feature is available from Chrome 68 but the library works on the older versions aswell. It's recomennded to read [useful information](https://github.com/filrak/add-to-homescreen-control/blob/master/README.md#useful-information) section before using this library to avoid common problems and gotchas.

# How to use this library

### Available methods

- `enable(): void` - enables capturing of `beforeinstallprompt` event and all the librarys behavior. You need to invoke this function as fast as you can to use all the other parts of this library.

- `prompt(): Promise` - shows the Add to Home Screen banner (if the criteria are met) and resolves when user decides either to install or decline on Add to Home Screen. The resolved Promise value is an object with two values:
  - `outcome: string` - outcome of the homescreen installation. Contains `accepted` if the app was succesfully installed, otherwise contains `dismissed` string.
  - `platform: string` - platform used for installation

- `canPrompt(): boolean` - returns `true` if the ATHS criteria are met and `prompt()` method can be fired

### Installation and usage example

1. Install the library
````
npm i add-to-homescreen-control -d
````
2. Enable it as soon as you can
````js
import ATHS from 'add-to-homescreen-control'
  
ATHS.enable()
````
3. Show the Add to Home Screen banner whenever you want to with `prompt()` method. The banner will appear only if the [criteria](https://developers.google.com/web/fundamentals/app-install-banners#criteria) are met. You can handle unmet criteria in two ways:

- make use of the fact that `prompt()` returns a Promise (recommended):
````js
ATHS.prompt()
  .then(({ outcome }) => console.log('user interacted with ATHS banner with outcome of', outcome))
  .catch(err => console.log(err))
````

- or you can use `canPrompt` property to check if the `prompt()` method is available:


[Here](https://github.com/filrak/add-to-homescreen-control/blob/master/index.html) you can find example usage of this library (with local import)
# Useful information 

### Browser support
Add to Home Screen behavior is supported by [most](https://caniuse.com/#feat=web-app-manifest) of the modern browsers but the banner encouraging users to install the app will be displayed only in Google Chrome. The process of adding website to the homescreen is different for every browser and this library is focused mostly on Chrome since the ATHS banner is present only there.

### Add to Home Screen criteria (Chrome)
Before ATHS prompt can be shown the following criteria needs to be met:

- The web app is not already installed
- The user has interacted with the domain for at least 30 seconds
- Your `index.html` includes Web App Manifest with at least following properties`short_name`, `name`, `start_url`, `icons` (at least 192px and 512px), `display` (standalone, fullscreen, minimal-ui)
- You have registered Service Worker with a fetch event handler (can't be a dummy one)

You can succesfully use librarys `prompt()` method only if this criteria are met. Otherwise it'll end up as a rejected promise. 

You can use `canPrompt` variable  to detect if the criteria are already met.

This criteria are different for other browsers. 
- [Firefox](https://developer.mozilla.org/en-US/Apps/Progressive/Add_to_home_screen#How_do_you_make_an_app_A2HS-ready)
- [MS Edge](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps#requirements)
- [Opera](https://dev.opera.com/articles/installable-web-apps/)

### Good practices and gotchas

- It's a good practice to show ATHS prompt in a context and as a response to user gesture (for example button click). Showing it right after it's available is an anti-pattern.
- banner can be shown only once per navigation route.
- Once user click `x` on a banner it can't be shown again for a significant amount of time (currently ~3 months)
