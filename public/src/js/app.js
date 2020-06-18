let enablenotificationsButtons = document.querySelectorAll('.enable-notifications');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('Service Worker registered!')
        });
}

function askForNotificationPermission()
{
    Notification.requestPermission(function (result) {
        console.log('User Choice', result);
        if (result != 'granted') {
            console.log('No notification permission granted');
        } else {
            displayConfirmNotification();
        }
    });
}

function displayConfirmNotification()
{
    const options = {
        body: 'You successfully subscribed to Notification service'
    };

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function(swreg) {
            swreg.showNotification('Successfully subscribed from SW', options);
        });
    }

    new Notification('Successfully subscribed', options);
}

if ('Notification' in window) {
    for (let i = 0; i < enablenotificationsButtons.length; i++) {
        enablenotificationsButtons[i].style.display = 'inline-block';
        enablenotificationsButtons[i].addEventListener('click', askForNotificationPermission);
    }
}