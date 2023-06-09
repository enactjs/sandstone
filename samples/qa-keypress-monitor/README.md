## Key Input Validation

This application displays information about keys that are pressed/sent from an attached input device, such as a keyboard or webOS TV remote and is useful in determining if expected values are being received by the platform, such as the `GoBack` key or the key codes that are sent when switching between 5-way and pointer mode in webOS.

The `keydown Events` column displays "standard" keys, such as `Digit7` or `LeftArrow` and the additional column displays any modifier keys that are pressed, such as `AltLeft` or `ControlRight`.  Each key pressed will display the `code`, `key`, and `which` values from the event.

In webOS, some keys only send `keydown` events and are not able to be captured with `keypress`.  Furthermore, some keys don't ever send a `keyup` event, so the app uses a timer to remove previously displayed keys from the UI.

For all you could ever want to know about getting the alphanumeric value of keys that are pressed, be sure to head to MDN and check out these not-at-all confusing docs on the subject:
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which
