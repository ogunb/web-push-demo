self.addEventListener('push', function(e) {
    const push = e.data.json();
    const promiseChain = self.registration.showNotification(push.title, push);

    e.waitUntil(promiseChain);
});