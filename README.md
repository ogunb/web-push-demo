# PWA Push Notification

This is a basic demo for web push notifications. For this demo to work, you need to address the following:

* Generate VAPID keys. You can use [web-push cli](https://www.npmjs.com/package/web-push). (npx web-push generate-vapid-keys) Or generate it online.
* Replace PUBLIC_KEY on both server and client side with your keys.
* Create .env.local files on both server and client side.
* Declare PRIVATE_KEY on both your .env.local files.
* Run `yarn` and `yarn start` to startup both apps.
* Go to http://localhost:8080 on your browser.
* Click `Push Event` button.

## References

* [Web Push Notifications: Timely, Relevant, and Precise](https://developers.google.com/web/fundamentals/push-notifications)
* [Intro to Web Push & Notifications](https://www.youtube.com/watch?v=ggUY0Q4f5ok)
* [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)