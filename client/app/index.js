import "babel-polyfill";

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('./worker.js');
            console.log(registration)
            return registration;
        } catch (err) {
            console.error(err);
        }
    } else {
        throw new Error('This demo requires a browser that supports service workers.');
    }
}

registerServiceWorker();