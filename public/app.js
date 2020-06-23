let isSubscribed = false;
let swRegistration = null;
let applicationKey =
  "BDNncBVemGi3qzTYfRXW9_kUVRbvnCo5KKkq-6Lj1_QfiuAKW4cqAbBAvft7c7d8W2ob1rC-tLbVnoZsrvQf0bo";

// Url Encription
function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
// installing service worker

if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("service worker supported");
  navigator.serviceWorker
    .register("sw.js")
    .then((swReg) => {
      console.log("service worker registered");
      swReg.pushManager.getSubscription().then((subscription) => {
        isSubscribed = !(subscription === null);
        if (isSubscribed) {
          console.log("User is subscribed");
        } else {
          swReg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlB64ToUint8Array(applicationKey),
            })
            .then(function (subscription) {
              console.log(subscription);
              console.log("User is subscribed");

              saveSubscription(subscription);

              isSubscribed = true;
            })
            .catch(function (err) {
              console.log("Failed to subscribe user: ", err);
            });
        }
      });
    })
    .catch((err) => {
      console.error("Service Worker Error", err);
    });
} else {
  console.warn("Push messaging is not supported");
}

// Send request to database for add new subscriber
function saveSubscription(subscription) {
  axios
    .post("/subscribe", subscription)
    .then((res) => {
      console.log("User subscribed to server", res);
    })
    .catch((err) => {
      console.log(err);
    });
}