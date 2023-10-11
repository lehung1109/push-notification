import { useRef, useState } from "react";
import { askPermission, registration, urlBase64ToUint8Array } from "../../assets/scripts";

declare global {
  interface Window {
    applicationServerKey: Uint8Array;
  }
}

const App = () => {
  if(!registration) {
    return '';
  }

  const [permission, setPermission] = useState<string>(Notification.permission);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    askPermission().then((data: any) => {
      setPermission(data);

      if(data === 'granted') {
        registration?.then((object: ServiceWorkerRegistration | void) => {
          if(!object) {
            throw new Error('object registration is empty');
          }

          window.applicationServerKey = urlBase64ToUint8Array(`${import.meta.env.VITE_PUBLIC_KEY}`)

          return object.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(`${import.meta.env.VITE_PUBLIC_KEY}`)
          });
        }).then((pushSubscription: PushSubscription | void) => {
          pushSubscription && localStorage.setItem('pushSubscription', JSON.stringify(pushSubscription));
    
          console.log(`pushSubscription: ${JSON.stringify(pushSubscription)}`);
    
          return pushSubscription;
        }).catch(console.log)
      }
    });
  };

  const handlePushNotification = () => {
    const pushSubscription = localStorage.getItem('pushSubscription');

    fetch(`${import.meta.env.VITE_API_URL}/trigger-push-message`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        pushSubscription: pushSubscription && JSON.parse(pushSubscription),
        payload: {
          title: 'This is a push from a server',
          body: 'test body content'
        }
      })
    }).catch(console.log);
  };

  const showLocalNotification = () => {
    registration?.then((object: ServiceWorkerRegistration | void) => {
      if(!object) {
        return;
      }

      object.showNotification("Simple Notification", {
        body: "Buzz! Buzz!",
        icon: "https://cdn4.iconfinder.com/data/icons/materia-social-free/24/038_027_share_code_link_html_android_material-512.png",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: "simple-notification",
      })
    });
  };

  return permission === 'denied' ? "You're denied so you need to enable it manual" : permission === 'granted' ? <><p>Thanks for allow notification</p><button onClick={handlePushNotification}>Push a test notification from server</button> <button onClick={showLocalNotification}>show a test notification from local</button></> : <button ref={ref} onClick={handleClick}>Allow Notification</button>;
};

export default App;