// <reference lib="webworker" />

self.addEventListener('push', event => {
    // 보내는 데이터 타입
    const data = event.data.json();
    console.log(data);
    console.log('Push notification received', event);
    // 여기에 푸시 알림 처리 로직을 추가합니다.
    event.waitUntil(
        self.registration.showNotification('테스트 제목', {
            body: '테스트 내용',
        }),
    );
});

self.addEventListener('notificationclick', function (event) {
    console.log('push 알림 클릭 시 이벤트');
    event.notification.close();

    event.waitUntil(self.clients.openWindow('https://github.com'));
});

self.addEventListener('fetch', e => {
    console.log('[Service Worker] Fetched resource ' + e.request.url);
});
