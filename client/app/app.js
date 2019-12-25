import "babel-polyfill";
import { registerServiceWorker } from './utils';
import PushService from './PushService';

async function init() {
    const serviceWorker = await registerServiceWorker();

    const pushService = new PushService(serviceWorker);
    pushService.askNotificationPermission();
    pushService.subscribeUser();
}

init();
