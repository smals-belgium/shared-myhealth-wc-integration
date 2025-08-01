# Guideline on accessibility

Accessibility in mobile applications ensures that people of all abilities; including those with visual, auditory, motor,
or cognitive challenges, can navigate and use the app effectively. Below are essential guidelines and best practices to
consider.

## What's already there:

### Android:

Guidelines: https://developer.android.com/guide/topics/ui/accessibility

Android comes equipped with built-in settings designed to support users with common disabilities. For example, older 
adults or individuals with impaired vision may struggle to see small text or icons, while those with color blindness 
might benefit from color correction options.

Fortunately, Android provides system-wide accessibility settings that not only enhance the overall experience but are 
also available to your app without extra effort.

- scaling font: **Settings > Display > Font Size**
- scaling the whole ui: **Settings > Display > Display Size**
- color correction: **Settings > Accessibility > Color Correction**
  * Deuteranomaly (red-green)
  * Protanomaly (red-green)
  * Tritanomaly (blue-yellow)

### IOS:

Guidelines: https://developer.apple.com/design/human-interface-guidelines/accessibility

- scaling font: **Settings > Accessibility > Display & Text Size > Larger Text**
- zoom: **Settings > Accessibility > Zoom**
- color correction: **Settings > Accessibility > Display & Text Size >**
  * **increase contrast**
  * **smart invert**
  * **classic invert**
  * **color filter**
  * **...**
- tools: https://developer.apple.com/accessibility/#whats-new

## What we need to do:

### Perceivable

Content needs to be available to at least one of a user’s senses — sight, hearing, or touch.

- **Text alternatives**: Use meaningful `alt text` for images and icons.
- **Captions**: for videos so people who are deaf or hard of hearing can follow along.
- **Readable Fonts**: Use legible font sizes (minimum `14sp` - 14 scale-independent pixels tall) and maintain good 
contrast.
  * Use **at least `14sp` for body text.**
    - web root font is normally `16px`, so the body `font-size` should be `0.875rem`.
    - **use rem** (https://ionicframework.com/docs/layout/dynamic-font-scaling)
    - Keep in mind that the dimensions of your components may need to change to accommodate larger font sizes.
      * For example, `width` and `height` properties may need to be changed to `min-width` and `min-height`, 
      respectively.
      * Don't forget to use a dynamic `line-height` as well — use `rem` or unitless values.
      * Go bigger (`16sp–20sp`) for labels, buttons, and headings.
  * Always test with **increased font sizes** (especially on Android where users can scale up to `200%`+).
  * Bear in mind that font weight can also impact how easy text is to read. If you’re using a custom font with a thin 
  weight, aim for larger than the recommended sizes to increase legibility. 
    - **In general, avoid light font weights.** For example, if you’re using system-provided fonts, prefer Regular, 
    Medium, Semibold, or Bold font weights, and avoid Ultralight, Thin, and Light font weights, which can be difficult 
    to see, especially when text is small. (https://developer.apple.com/design/human-interface-guidelines/typography)
- **Color Contrast**: Ensure text and important UI elements have enough contrast against the background 
(WCAG recommends a contrast ratio of 4.5:1 or higher). 
- **Support Reduce motion**: Some users have motion sensitivity and prefer reduced animations. 
(ionic: https://ionic.io/docs/accessibility/motion)

```css
@media (prefers-reduced-motion: reduce) {
  .animation {
    animation: none;
    transition: none;
  }
}
```

### Operable

- **Touch Targets**: Minimum `48x48` CSS pixels for tappable areas.
- **Consider spacing between controls as important as size.** Include enough padding between elements to reduce the
chance that someone taps the wrong control. 
- **Keyboard Navigation**: Ensure the app can be navigated using external keyboards or switch access.
- **Gestures**: Provide alternatives to complex gestures (e.g., swiping, long press) since they can be hard for some
users.
  * Replace long press with double tap
  * Use tab-based navigation as an alternative to swiping.
  * Ensure controls are always visible rather than hidden or gesture-based.
  * ...
- **Clear Focus Indicators**: Ensure focus states are visible and distinguishable. 
This is crucial for users who navigate via keyboard.

```css
/* Visible focus indicator */
button:focus {  
    outline: 2px solid #0055cc;  
    outline-offset: 2px;
}
```

### Understandable

- **Clear Labels**: Buttons and links should have descriptive, accessible names (not just “Click here”). 
For icon-only buttons, use `aria-label` to provide screen readers with meaningful context.
- **Consistent Navigation**: Use a predictable layout and flow. Avoid unexpected layout shifts or automatic scrolling 
that can disorient users, especially those using assistive technologies.
- **Avoid Auto-Play**: Audio or animations that play automatically can be distracting or confusing.
- **Error Handling**: When form validation errors occur, ensure they are clearly described and labeled. 
Use ARIA attributes (e.g., `aria-describedby`) to announce errors to screen readers.

```html
<label for="email">Email:</label>
<input type="email" id="email" aria-describedby="error-email">
<span id="error-email" aria-live="assertive" style="color: red;">Please enter a valid email address.</span>
```
The `aria-live` attribute notifies assistive technologies of dynamic content changes.
- **polite**: Announcements occur after the user finishes their task, avoiding interruptions.
- **assertive**: Announcements happen immediately, interrupting the user, useful for urgent updates.

### Robust

- **Screen Reader Support**: Ensure compatibility with tools like TalkBack (Android) or VoiceOver (iOS).
- **Semantic UI Elements**: Use HTML5 semantic elements that inherently convey their meaning to browsers and assistive 
technologies (`header`, `nav`, `article`, `footer`) instead of relying solely on `<div>` and `<span>` elements.
- **Use ARIA Where Necessary**: use only when native HTML cannot achieve the same functionality. 
Overuse can actually confuse assistive technologies.
- **Testing Across Devices**: Check on different iOS and Android versions, screen sizes, and with assistive tools.

## Tooling 

### Linting

Use ESlint to assist with discovery of accessibility issues.  
This can be used in your IDE while coding and at build time as a CI quality gate.  
Example configuration for an Angular module.

```json
{
  "overrides": [
    {
      "files": ["*.component.html"],
      "parser": "@angular-eslint/template-parser",
      "plugins": ["@angular-eslint/template"],
      "rules": {
        "@angular-eslint/template/prefer-control-flow": "error",
        "@angular-eslint/template/alt-text": "error",
        "@angular-eslint/template/elements-content": "error",
        "@angular-eslint/template/button-has-type": "warn",
        "@angular-eslint/template/no-positive-tabindex": "error",
        "@angular-eslint/template/table-scope": "error",
        "@angular-eslint/template/valid-aria": "error",
        "@angular-eslint/template/click-events-have-key-events": "error",
        "@angular-eslint/template/mouse-events-have-key-events": "error",
        "@angular-eslint/template/no-autofocus": "error",
        "@angular-eslint/template/no-distracting-elements": "error"
      }
    }
  ]
}
```

### Browser plugin
At runtime use the Bosa browser plugin to check for errors and warnings:
https://accessibility.belgium.be/nl/tools/bosa-accessibility-check
