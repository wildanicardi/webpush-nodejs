let notificationUrl = '/push';

self.addEventListener('push', function (event) {
  console.log('Push received: ', event);
  let _data = event.data ? JSON.parse(event.data.text()) : {};
  notificationUrl = _data.url;
  event.waitUntil(
    self.registration.showNotification(_data.title, {
      body: _data.message,
      icon: _data.icon,
    })
  );
});

//notification url redirect event click
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window"
    })
    .then(function (clientList) {
      if (clients.openWindow) {
        return clients.openWindow(notificationUrl);
      }
    })
  );
});