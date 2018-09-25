let deferredEvent = null

const ATHS = {
  enable: function () {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredEvent = e;
      this.canPrompt = true;
    })
  },
  prompt: function () {
    return new Promise ((resolve, reject) => {
      if ( this.canPrompt ) {
        deferredEvent.prompt()
        resolve(deferredEvent.userChoice)
      } else {
        reject('Add to Home Screen criteria not met. You can read about this criteria here: https://developers.google.com/web/fundamentals/app-install-banners/')
      }
    })
  },
  canPrompt: false
}


export default ATHS

