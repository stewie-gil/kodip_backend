// No need for type annotations in JavaScript
export function loadBingApi(key) {
    const callbackName = "bingAPIReady";
    let url = `https://www.bing.com/api/maps/mapcontrol?callback=${callbackName}`;
    if (key) {
      url += `&key=${key}`;
    }
  
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;
      script.src = url;
      window.bingAPIReady = function() {
        Microsoft = window.Microsoft;
        resolve();
      };
      script.onerror = function(error) {
        reject(error);
      };
      document.body.appendChild(script);
    });
  }
  
  // Remove type annotations for JavaScript
  export let Microsoft;
  
  // No need to declare the MapWindow interface in JavaScript
  