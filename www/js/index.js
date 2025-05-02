document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    const scanButton = document.getElementById('startScanner');

    scanButton.addEventListener('click', function () {
        const testVibration = navigator.vibrate(1);
        console.log('Vibration unlocked: ' + testVibration);

        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                      "Result: " + result.text + "\n" +
                      "Format: " + result.format + "\n" +
                      "Cancelled: " + result.cancelled);

                const didVibrate = navigator.vibrate([1000]);
                alert("Is it vibrating: " + didVibrate);
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera : true,
                showFlipCameraButton : true,
                showTorchButton : true,
                torchOn: true,
                saveHistory: true,
                prompt : "Place a barcode inside the scan area",
                resultDisplayDuration: 500,
                orientation : "landscape",
                disableAnimations : true,
                disableSuccessBeep: false
            }
        );
    });
}
