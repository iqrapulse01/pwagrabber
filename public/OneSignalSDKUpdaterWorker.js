importScripts("https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js");
window.OneSignal.push(() => {
    window.OneSignal.init({
      appId: "41678371-bbec-4aee-98ab-dfbe18be70b6",
      safari_web_id: "web.onesignal.auto.xxxxx",
      notifyButton: { enable: true },
      allowLocalhostAsSecureOrigin: true, 
      serviceWorkerPath: "/OneSignalSDKWorker.js",
      serviceWorkerUpdaterPath: "/OneSignalSDKUpdaterWorker.js",
    });
  });
  