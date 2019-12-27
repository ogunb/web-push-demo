import { getPublicApplicationKey } from "./utils";

export default class PushService {
    constructor(serviceWorker) {
        this.serviceWorker = serviceWorker;
    }

     async askNotificationPermission() {
        // The API for getting notification permission has changed from taking a callback as an argument to taking promise.
        // We need to address both situations.
        const permissionResult = await new Promise((resolve, reject) => {
             const permissionResult = Notification.requestPermission(function (result) {
                 resolve(result);
             });

             if (permissionResult) {
                 permissionResult.then(resolve, reject);
             }
         });

         if (permissionResult !== 'granted') {
             throw new Error('We weren\'t granted permission.');
         }

         return permissionResult;
    };

    async subscribeUser() {
        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: getPublicApplicationKey(),
        };

        const subscription = await this.serviceWorker.pushManager.subscribe(subscribeOptions);
        return this.saveUserSubscription(subscription);
    }

    async saveUserSubscription(subscription) {
        const response = await fetch(`${process.env.SERVER_ENDPOINT}/save-subscription`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription)
        });

        return response;
    }

    requestPush() {
        return fetch(`${process.env.SERVER_ENDPOINT}/push`, {
            method: 'POST',
        });
    }
}
