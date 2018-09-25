let canPrompt = false
let deferredEvent = null


function prompt() {
  return new Promise ((resolve, reject) => {
    if ( canPrompt ) {
      resolve(deferredEvent.prompt())
    } else {
      reject('Add to Home Screen criteria not met. You can read about this criteria here: https://developers.google.com/web/fundamentals/app-install-banners/')
    }
  })
}



function enableAddToHomeScreen() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredEvent = e;
    canPrompt = true;
  })
}

const ATHS = {
  enable: enableAddToHomeScreen,
  prompt: prompt,
  canPrompt, canPrompt
}

export default ATHS

