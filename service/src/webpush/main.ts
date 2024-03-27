// import { deleteSubscribePush, subscribePush } from '../service/PushService';

import { subscribePush, unSubscribePush } from '../service/PushService';

const PUBLIC_KEY = import.meta.env.VITE_APP_VAPID_PUBLIC_KEY;

let isSubscribed = false;
let swRegistration: ServiceWorkerRegistration | null = null;

function urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(PUBLIC_KEY);

    if (swRegistration) {
        swRegistration.pushManager
            .subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey,
            })
            .then(async function (subscription) {
                const res = await subscribePush(subscription);

                if (res.status === 200) {
                    isSubscribed = true;
                }
            })
            .catch(function (err) {
                console.log('Failed to subscribe the user: ', err);
            });
    }
}

export async function unSubscribeUser() {
    const res = await unSubscribePush();

    if (res.status === 200) {
        isSubscribed = false;
    }
}

export function initializeUI() {
    // Set the initial subscription value
    if (swRegistration) {
        swRegistration.pushManager.getSubscription().then(function (subscription) {
            isSubscribed = !(subscription === null);

            if (isSubscribed) {
                console.log('User IS subscribed.');
            } else {
                console.log('User is NOT subscribed.');
            }
        });
    }
}

export function registerServiceWorker() {
    // 기기에 service worker 등록
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker
            .register('/src/webpush/sw.js')
            .then(reg => {
                swRegistration = reg;
            })
            .catch(error => {
                console.error('Service worker registration failed:', error);
            });
    } else {
        console.warn('Push messaging is not supported');
    }
}
