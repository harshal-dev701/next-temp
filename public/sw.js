/* Enhanced service worker to display nice web push notifications */

self.addEventListener('push', function (event) {
  try {
    const data = event.data ? event.data.json() : {};

    const title = data.title || 'New notification';
    const body = data.body || '';
    const icon = data.icon || '/file.svg'; // update to your preferred icon
    const url = data.url || '/'; // where to open on click

    const options = {
      body,
      icon,
      badge: icon,
      vibrate: [100, 50, 100],
      data: { url },
      actions: [
        {
          action: 'open',
          title: 'Open',
          icon
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
          icon
        }
      ]
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (e) {
    console.error('Error in push event', e);
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';

  if (event.action === 'dismiss') {
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

