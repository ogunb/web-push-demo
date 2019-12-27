export async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('./worker.js');
            return registration;
        } catch (err) {
            console.error(err);
        }
    } else {
        throw new Error('This demo requires a browser that supports service workers.');
    }
};

export function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function getPublicApplicationKey() {
    return urlBase64ToUint8Array(process.env.PUBLIC_KEY);
}

export function getPrivateApplicationKey() {
    return urlBase64ToUint8Array(process.env.PRIVATE_KEY);
}
