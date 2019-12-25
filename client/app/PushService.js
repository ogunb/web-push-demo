export default class PushService {
    constructor(serviceWorker) {
        this.serviceWorker = serviceWorker;
    }

     askNotificationPermission() {
        // The API for getting notification permission is changed from taking a callback as an argument to taking promise.
        // We need to address both situations.
        return new Promise((resolve, reject) => {
            const permissionResult = Notification.requestPermission(function (result) {
                resolve(result);
            });

            if (permissionResult) {
                permissionResult.then(resolve, reject);
            }
        })
        .then(function (permissionResult) {
            if (permissionResult !== 'granted') {
                throw new Error('We weren\'t granted permission.');
            }
        });
    };

    subscribeUser() {
        console.log(this.serviceWorker);
    }
}
