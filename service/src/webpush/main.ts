// import { deleteSubscribePush, subscribePush } from '../service/PushService';

const PUBLIC_KEY = import.meta.env.VITE_APP_VAPID_PUBLIC_KEY;

// type Store = {
//     pushSupport: boolean;
//     serviceWorkerRegistration: ServiceWorkerRegistration | null;
//     pushSubscription: PushSubscription | null;
// };

// const store: Store = {
//     pushSupport: false,
//     serviceWorkerRegistration: null,
//     pushSubscription: null,
// };

// export async function registerServiceWorker() {
//     if (!('serviceWorker' in navigator)) return;

//     //이미 등록되어 있는 정보 가져오기
//     let registration = await navigator.serviceWorker.getRegistration();

//     if (!registration) {
//         // registration = await navigator.serviceWorker.register('/src/webpush/sw.js');
//         navigator.serviceWorker
//             .register('/src/webpush/sw.js')
//             .then(registration => {
//                 console.log('Service worker registered:', registration);
//             })
//             .catch(error => {
//                 console.error('Service worker registration failed:', error);
//             });
//     }

// store.serviceWorkerRegistration = registration ?? null;
// store.pushSupport = !!registration?.pushManager;
// store.pushSubscription = await registration?.pushManager?.getSubscription();
// }

// //백엔드에 push에 대한 정보 보내기
// async function postSubscription(subscription?: PushSubscription) {
//     console.log('postSubscription', { subscription });

//     if (!subscription) {
//         return;
//     }

//     const response = await subscribePush(subscription);

//     console.log('postSubscription', { response });
// }

// async function deleteSubscription() {
//     const response = await deleteSubscribePush();
//     console.log('deleteSubscription', { response });
// }

// 여기서 sw에 VAPID_KEY를 보내서 endpoint 및 기타 사항 받아옴
// export async function subscribe() {
//     if (store.pushSubscription) {
//         return;
//     }

//     try {
//         const registration = store.serviceWorkerRegistration;

//         if (!registration) {
//             return;
//         }

//         await registration.pushManager
//             .subscribe({
//                 applicationServerKey: PUBLIC_KEY,
//                 userVisibleOnly: true,
//             })
//             .then(subscription => {
//                 console.log(subscription);
//                 store.pushSubscription = subscription;
//                 postSubscription(subscription);
//             });
//     } catch (error) {
//         console.error('subscribe', { error });
//     }
// }

// export async function unsubscribe() {
//     const subscription = store.pushSubscription;

//     if (!subscription) {
//         return;
//     }

//     try {
//         const unsubscribed = await subscription.unsubscribe();
//         store.pushSubscription = null;
//         console.log('unsubscribe', { unsubscribed });
//         await deleteSubscription();
//     } catch (error) {
//         console.error('unsubscribe', { error });
//     }
// }

// // registerServiceWorker();

// 기기에 service worker 등록 (최초 1회만 실행)
export async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    //이미 등록되어 있는 정보 가져오기
    let registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
        navigator.serviceWorker
            .register('/src/webpush/sw.js')
            .then(registration => {
                console.log('Service worker registered:', registration);
                requestNotificationPermission();
            })
            .catch(error => {
                console.error('Service worker registration failed:', error);
            });
    }
}

// service worker가 등록되었다면 알림권한 요청
async function requestNotificationPermission() {
    // if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted');
            // 푸시 알림 구독 등 추가 로직 수행
        }
    });
    // }
}

// 구독하기 버튼 클릭시
export async function subscribe() {
    //서비스워커 사용이 불가한 브라우저는 구독 또한 무의미
    if (!('serviceWorker' in navigator)) return;

    // 알림이 허용되어있으면
    if (Notification.permission === 'granted') {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: PUBLIC_KEY,
            });
            // api 호출
            console.log('Subscription successful:', subscription);
            return subscription;
        } catch (error) {
            console.error('Error subscribing:', error);
        }
    } else {
        // 알림 허용 요청
        requestNotificationPermission();
    }
}

// 비구독 버튼 클릭시
async function unSubscribe() {
    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription(); //구독상태 확인
        if (subscription) {
            await subscription.unsubscribe();
            console.log('Unsubscription successful');
            // api 호출
            return true;
        } else {
            console.log('No subscription found');
            return false;
        }
    } catch (error) {
        console.error('Error unsubscribing:', error);
        return false;
    }
}
