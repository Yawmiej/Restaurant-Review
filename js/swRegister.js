// Registers the service worker if the browser support it
// and catch and log any occuring errors
if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('/sw.js')
    .catch(function(err) {
      console.error(err);
    });
  }