function registerSW() {
  if(!('serviceWorker' in navigator)) {
    console.log('service worker doesn`t support');

    return;
  }

  if(!('pushManager' in window)) {
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
  });
}

registerSW();
