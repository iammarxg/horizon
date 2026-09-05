# Privacy Policy for Horizon: Modern New Tab

*Last updated: September 5, 2026*

Horizon ("the extension") is a lightweight, privacy-focused new tab page extension for Chromium-based browsers (Google Chrome, Brave, Microsoft Edge, Opera, Vivaldi).

Your privacy is our priority. Horizon is designed from the ground up to keep your personal data strictly on your local device. We do not collect, transmit, sell, or monetize any user data.

---

## 1. Data Storage and Local Processing

All data managed by Horizon is stored locally within your browser using the `chrome.storage.local` API. This includes:

- Custom shortcut titles and URLs.
- Background wallpaper preferences (selected curated wallpaper, custom uploaded wallpaper image data, or solid color choice).
- Default search engine selection.
- Interface preferences (theme mode, shortcuts layout mode, voice search language, voice button visibility, and onboarding dismissal states).
- Locally cached website favicons.
- Active Google account display names, email addresses, profile image URLs, and account session indices (`/u/N/`).

**None of this information is ever uploaded to or stored on external Horizon servers. Horizon operates completely serverless and does not maintain any backend infrastructure, user databases, or tracking endpoints.**

---

## 2. External Network Communications

Horizon initiates network requests only when strictly necessary to fulfill features directly requested by the user:

### A. Real-Time Search Suggestions
When you type into the search bar, queries are sent directly to the auto-complete API of the search engine you currently have active:
- Google (`suggestqueries.google.com`)
- Brave Search (`search.brave.com`)
- Bing (`api.bing.com`)
- DuckDuckGo (`duckduckgo.com`)
- Qwant (`api.qwant.com`)
- Yahoo (`ff.search.yahoo.com`)

These requests are made directly between your browser and the respective search provider without passing through any intermediate proxy or third-party server.

### B. Curated Wallpapers
Curated nature backgrounds are retrieved directly from Unsplash's public CDN. If you upload a custom photo from your device, it is processed locally in your browser and stored as a base64 Data URL in your browser's local storage; it is never uploaded to any cloud server.

### C. Voice Search Dictation
Voice search uses the browser's native Web Speech API (`webkitSpeechRecognition`). In Google Chrome, spoken audio is processed by Google's native speech-to-text service in accordance with Google's Privacy Policy. In Brave Browser, external speech transmission is blocked by the browser for user privacy. Horizon never records, stores, or transmits audio on its own.

### D. Google Account Synchronization
To display your active Google account and route Google Apps drawer links to the correct Gmail account index, a lightweight content script reads your public profile name and avatar from Google session pages you already have open (`*.google.com`, `myaccount.google.com`, `mail.google.com`). This data remains strictly in your browser's `chrome.storage.local`.

---

## 3. Extension Permissions

Horizon requests only the minimum permissions required for its functionality:

| Permission | Purpose |
|---|---|
| `storage` | Saves user shortcuts, themes, search preferences, and settings locally on your machine. |
| Host permissions (`*.google.com`, `*.googleusercontent.com`) | Detects active Google session indices and profile avatars when the user signs in to Google. |
| Host permissions (search suggestion endpoints) | Retrieves query auto-complete suggestions from the user's chosen search engine. |

Horizon does **not** request or use:
- Browsing history (`history` permission)
- Tab inspection or monitoring (`tabs` permission)
- Geolocation tracking
- Web request interception (`webRequest` permission)
- Cookies or identity permissions

---

## 4. Analytics, Tracking, and Advertising

- **Zero Analytics:** Horizon contains no tracking libraries, analytics scripts (such as Google Analytics or Mixpanel), error-reporting beacons, or telemetry.
- **Zero Advertising:** Horizon contains no ads, sponsored recommendations, affiliate redirects, or paid search monetization.

---

## 5. Third-Party Links

Horizon displays shortcuts and links to third-party services (such as Google services, search engines, and user-defined websites). Clicking these links takes you directly to the respective third-party website, which operates under its own privacy policies and terms of service.

---

## 6. Open Source and Auditability

Horizon is open-source software. You can inspect the complete source code, manifest, scripts, and build pipeline on GitHub:
[https://github.com/iammarxg/horizon](https://github.com/iammarxg/horizon)

---

## 7. Contact and Support

If you have questions, feedback, inquiries, or bug reports regarding this Privacy Policy or the Horizon extension, our primary channel of communication is our official support form:

- **Primary Contact:** [Horizon Support Form](https://horizon.jeddah.dev/#support)
- **Public Issue Tracker (Open Source & Technical Inquiries):** [GitHub Issues](https://github.com/iammarxg/horizon/issues)

### Support Form Data Handling
When you voluntarily submit a message through the Horizon Support Form:
- **Strictly for Replies:** Your name, email address, and message details are used solely to review and reply directly to your inquiry.
- **No Marketing or Tracking:** Your email is never added to marketing lists, never used for advertising, and never sold, rented, or shared with third parties.
- **Data Minimization:** Communication history is retained only as long as necessary to address your request or bug report.
