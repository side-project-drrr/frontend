import axios from 'axios';
const token = 1;

const PUBLIC_KEY = import.meta.env.VITE_APP_KAKAO_REST_API_KEY;

type Store = {
    pushSupport: boolean;
    serviceWorkerRegistration: ServiceWorkerRegistration | null;
    pushSubscription: PushSubscription | null;
};

const store: Store = {
    pushSupport: false,
    serviceWorkerRegistration: null,
    pushSubscription: null,
};

async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    let registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
        registration = await navigator.serviceWorker.register('/service-worker.js');
    }

    store.serviceWorkerRegistration = registration ?? null;
    store.pushSupport = !!registration?.pushManager;
    store.pushSubscription = await registration?.pushManager?.getSubscription();
}

async function postSubscription(subscription?: PushSubscription) {
    console.log('postSubscription', { subscription });

    if (!subscription) {
        return;
    }

    const response = await axios.post('/subscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, subscription }),
    });

    console.log('postSubscription', { response });
}

async function deleteSubscription() {
    const response = await fetch('/subscription', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });

    console.log('deleteSubscription', { response });
}

export async function subscribe() {
    if (store.pushSubscription) {
        return;
    }

    try {
        const response = await axios.post('/vapid-public-key');

        console.log(response);
        const registration = store.serviceWorkerRegistration;

        if (!registration) {
            return;
        }

        const subscription = await registration.pushManager.subscribe({
            applicationServerKey: PUBLIC_KEY,
            userVisibleOnly: true,
        });
        console.log(subscription);
        store.pushSubscription = subscription;
        await postSubscription(subscription);
    } catch (error) {
        console.error('subscribe', { error });
    }
}

export async function unsubscribe() {
    const subscription = store.pushSubscription;

    if (!subscription) {
        return;
    }

    try {
        const unsubscribed = await subscription.unsubscribe();
        store.pushSubscription = null;
        console.log('unsubscribe', { unsubscribed });
        await deleteSubscription();
    } catch (error) {
        console.error('unsubscribe', { error });
    }
}

registerServiceWorker();
