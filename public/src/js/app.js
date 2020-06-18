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
            //displayConfirmNotification();
            configurePushSub();
        }
    });
}

function displayConfirmNotification() {
    if ('serviceWorker' in navigator) {
        const options = {
            body: 'You successfully subscribed to Notification service',
            icon: '/src/images/icons/app-icon-96x96.png',
            image: '/src/images/icons/app-icon-96x96.png',
            vibrate: [100, 50, 200],
            badge: '/src/images/icons/app-icon-96x96.png'
        };


        navigator.serviceWorker.ready.then(function(swreg) {
            swreg.showNotification('Successfully subscribed from SW', options);
        });

        //new Notification('Successfully subscribed', options);
    }
}

function configurePushSub() {
    if(!('serviceWorker' in navigator)) {
        return;
    }

    let reg;
    navigator.serviceWorker.ready
        .then(function(swreg) {
            reg = swreg;
            return swreg.pushManager.getSubscription();
        })
        .then(function (sub) {
            if (sub === null) {
                //Create subscription
                reg.pushManager.subscribe({
                    userVisibleOnly: true,
                });
            } else {

            }
        })
}



if ('Notification' in window && 'serviceWorker' in navigator) {
    for (let i = 0; i < enablenotificationsButtons.length; i++) {
        enablenotificationsButtons[i].style.display = 'inline-block';
        enablenotificationsButtons[i].addEventListener('click', askForNotificationPermission);
    }
}