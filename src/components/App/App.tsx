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

  return permission === 'denied' ? "You're denied so you need to enable it manual" : <button ref={ref} onClick={handleClick}>Allow Notification</button>;
};

export default App;