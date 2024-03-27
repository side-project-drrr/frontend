import { deleteSubscribePush, subscribePush } from '../service/PushService';

const PUBLIC_KEY = import.meta.env.VITE_APP_VAPID_PUBLIC_KEY;

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

export async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    //이미 등록되어 있는 정보 가져오기
    let registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
        registration = await navigator.serviceWorker.register('/src/webpush/sw.js');
    }
    console.log(registration);

    store.serviceWorkerRegistration = registration ?? null;
    store.pushSupport = !!registration?.pushManager;
    store.pushSubscription = await registration?.pushManager?.getSubscription();
}

//백엔드에 push에 대한 정보 보내기
async function postSubscription(subscription?: PushSubscription) {
    console.log('postSubscription', { subscription });

    if (!subscription) {
        return;
    }

    const response = await subscribePush(subscription);

    console.log('postSubscription', { response });
}

async function deleteSubscription() {
    const response = await deleteSubscribePush();
    console.log('deleteSubscription', { response });
}

// 여기서 sw에 VAPID_KEY를 보내서 endpoint 및 기타 사항 받아옴
export async function subscribe() {
    if (store.pushSubscription) {
        return;
    }

    try {
        const registration = store.serviceWorkerRegistration;

        if (!registration) {
            return;
        }

        await registration.pushManager
            .subscribe({
                applicationServerKey: PUBLIC_KEY,
                userVisibleOnly: true,
            })
            .then(subscription => {
                console.log(subscription);
                store.pushSubscription = subscription;
                postSubscription(subscription);
            });
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
