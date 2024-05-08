/* eslint-disable no-restricted-globals */
// <reference lib="webworker" />

self.addEventListener('push', event => {
    // 여기에 푸시 알림 처리 로직을 추가합니다.
    event.waitUntil(
        self.registration.showNotification('drrr', {
            body: '추천 게시글이 도착했습니다.',
        }),
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(self.clients.openWindow('https://github.com'));
});

self.addEventListener('fetch', e => {
    console.log('[Service Worker] Fetched resource ' + e.request.url);
});
