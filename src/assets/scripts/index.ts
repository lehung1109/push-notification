function registerSW() {
  if(!('serviceWorker' in navigator)) {
    console.log('service worker doesn`t support');

    return;
  }

  if(!('PushManager' in window)) {
    console.log('push manager doesn`t support');

    return;
  }

  const registration = navigator
    .serviceWorker
    .register('/sw.js')
    .then((registration) => {
      console.log('sw successfully registered');

      return registration;
    })
    .catch(console.log);

  return registration;
}

function askPermission() {
  return new Promise((resolve, reject) => {
    const result = Notification.requestPermission((data) => {
      resolve(data);
    });

    if(result) {
      result.then(resolve, reject);
    }
  }).then(result => {
    console.log(`permission ${result}`);

    return result;
  }).catch(console.log);
}

function urlBase64ToUint8Array(base64String: string) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const registration = registerSW();

export { registration, askPermission, urlBase64ToUint8Array };