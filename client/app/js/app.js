import "babel-polyfill";
import { registerServiceWorker } from './utils';
import createPushService from './PushService';

async function init() {
    const serviceWorker = await registerServiceWorker();
    const pushService = createPushService(serviceWorker);
    pushService.askNotificationPermission();
    pushService.subscribeUser();

    const pushRequestButton = document.querySelector('button');
    pushRequestButton.addEventListener('click', pushService.requestPush);
}

init();
