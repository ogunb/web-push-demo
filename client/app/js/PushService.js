import { getPublicApplicationKey } from './utils';

const createPushService = serviceWorker => {
    async function askNotificationPermission() {
        // The API for getting notification permission has changed from taking a callback as an argument to taking promise.
        // We need to address both situations.
        const permissionResult = await new Promise((resolve, reject) => {
            const permissionResult = Notification.requestPermission(result => resolve(result));
            if (permissionResult) { permissionResult.then(resolve, reject); }
        });

        if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.');
        }

        return permissionResult;
    };

    async function subscribeUser() {
        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: getPublicApplicationKey()
        };

        const subscription = await serviceWorker.pushManager.subscribe(subscribeOptions);
        return saveUserSubscription(subscription);
    };

    async function saveUserSubscription(subscription) {
        const response = await fetch(
            `${process.env.SERVER_ENDPOINT}/save-subscription`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscription)
            }
        );

        return response;
    };

    return Object.freeze({
        askNotificationPermission,
        subscribeUser,
        requestPush: () => fetch(`${process.env.SERVER_ENDPOINT}/push`, { method: 'POST' }),
    });
};

export default createPushService;
