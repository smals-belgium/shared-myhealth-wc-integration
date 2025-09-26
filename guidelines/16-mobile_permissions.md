# Guidelines on smartphone permissions

In the table below you can find all possible permission. We've marked the ones we already requested. 
If you need additional permissions, please contact the MAGS support team ([mags@smals.be]) and explain why you need them.

If you are requesting a sensitive permission (e.g., access to location, camera, contacts, or microphone), we need a 
clear and detailed explanation of why this access is required.

Please note:

- The feature must be core to your webcomponent's functionality — not just a convenience.
- You should describe how the permission will be used and what will break or not work without it.

Please provide:

- A description of the feature that needs the permission
- Why the webcomponent cannot function without it
- Any user-facing justification (e.g., pop-up or UI explanation) you will include

Without a strong use case, this permission may be denied or lead to app store rejection.

## List of permissions

| Category | Android Permission Key | iOS Permission Key | Ionic Plugin | What it's for | Sensitive info | Already asked for |
| --- | --- | --- | --- | --- | --- | --- |
| Biometrics | `USE_BIOMETRIC`, ~~`USE_FINGERPRINT`~~ |	`NSFaceIDUsageDescription` | `@ionic-native/biometrics` or `capacitor-biometric-authentication` or `@awesome-cordova-plugins/fingerprint-aio` | Face ID / Fingerprint login	| :white_check_mark: | It's an optional feature, so no permission asked. |
| Internet | `INTERNET` (no runtime prompt) | _(granted by default)_ | `@ionic-native/network` | Access the internet | | :white_check_mark: | 
| Network Status | `ACCESS_NETWORK_STATE` | _(not needed)_ | `@ionic-native/network` | Check if device is online | | It's an optional feature, so no permission asked. |
| Location | `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION` | `NSLocationWhenInUseUsageDescription`, `NSLocationAlwaysUsageDescription` | `@ionic-native/geolocation` - `@ionic-native/background-geolocation` | Get user's location | :white_check_mark: | |
| Camera | `CAMERA` | `NSCameraUsageDescription` | `@ionic-native/camera` |	Capture images or video using the device camera. | :white_check_mark: | |
| Microphone | `RECORD_AUDIO` | `NSMicrophoneUsageDescription` | `@ionic-native/media-capture` | Record audio with the device microphone. | :white_check_mark: | |
| Photo Library | `READ_MEDIA_IMAGES` (Android 13+) | `NSPhotoLibraryUsageDescription` | `@ionic-native/photo-library` | Pick or save photos to/from the gallery | | |
| Video Access | `READ_MEDIA_VIDEO` | _(covered by photo library on iOS)_ |	`@ionic-native/photo-library`, `@ionic-native/camera` | Access videos in media | | |
| Phone info | `READ_PHONE_STATE` | _(not typically exposed)_ | | Get device info (IMEI, call state, etc.) | :white_check_mark: | |
| Contacts | `READ_CONTACTS`, `WRITE_CONTACTS` | `NSContactsUsageDescription` | `ionic-native/contacts` |	Read or modify contacts | :white_check_mark: | |
| Calendar | `READ_CALENDAR`, `WRITE_CALENDAR` | `NSCalendarsUsageDescription` | `ionic-native/calendar` | Access and manage the user's calendar events. | :white_check_mark: | |
| Notifications | `POST_NOTIFICATIONS` (Android 13+) | Ask via `UNUserNotificationCenter` API | `@ionic-native/push`, `@capacitor/push-notifications` | Push notifications and background tasks. | | |
| Background tasks | _(handled via services)_ | `UIBackgroundModes` in `Info.plist` | | Run tasks in background | | |
| Bluetooth | `BLUETOOTH_CONNECT` (Android 12+) | _(granted by default)_ | `@ionic-native/bluetooth-le` |	Connect to BT devices (e.g., headphones) | | |
| File access | `MANAGE_EXTERNAL_STORAGE` (very restricted) | _(not applicable)_ | `@ionic-native/file` | Broad file access on Android | :white_check_mark: | |
| Storage | `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE` | | | Access files, photos, etc. | :white_check_mark: | |
| Body Sensors | `BODY_SENSORS` |	`NSMotionUsageDescription` | | Access health and motion data | :white_check_mark: | |
| Activity recognition | `ACTIVITY_RECOGNITION` | | | Detects walking, biking, etc. | :white_check_mark: | |
| Reminders | | `NSRemindersUsageDescription` | | Access to user task list | :white_check_mark: | |

---
_References:_
- _April 14, 2025 - https://developer.android.com/reference/android/Manifest.permission_
- _April 14, 2025 - https://developer.apple.com/documentation/bundleresources/information-property-list_
