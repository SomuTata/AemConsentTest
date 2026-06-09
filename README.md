# AEM-style Cookie-Consent SDK Test Site

A small **standalone static site** whose markup mirrors **AEM Core Components**
(`cmp-*` and `aem-Grid` class names). Use it to validate a cookie-consent SDK
locally — *before* you have AEM access. When you do get into AEM, the **same**
SDK `<script>` snippet goes into an AEM **Embed** component or a **clientlib**.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Home page (nav, breadcrumb, title, teaser, button) |
| `components.html` | Kitchen-sink: every Core Component (`cmp-*`) class name |
| `about.html` | 2nd page — to test consent/cookie persistence across navigation |
| `css/styles.css` | Emulates AEM Core Components styling |
| `js/components.js` | Accordion / Tabs / Carousel interactivity |
| `js/demo-trackers.js` | Fake analytics/marketing cookies + a live **cookie status panel** |

## Components included (with AEM class names)

Navigation (`cmp-navigation`), Breadcrumb (`cmp-breadcrumb`), Title (`cmp-title`),
Text (`cmp-text`), Image (`cmp-image`), Button (`cmp-button`), Teaser (`cmp-teaser`),
Container (`cmp-container`), List (`cmp-list`), Separator (`cmp-separator`),
Accordion (`cmp-accordion`), Tabs (`cmp-tabs`), Carousel (`cmp-carousel`),
Content Fragment (`cmp-contentfragment`), Download (`cmp-download`),
Embed (`cmp-embed`), Search (`cmp-search`), Form (`cmp-form`, `cmp-form-text`,
`cmp-form-options`).

## How to run

Cookies behave correctly only over `http(s)`, **not** `file://`. Run a tiny local server:

```bash
cd /Users/s.tata/code/aem-cookie-sdk-test

# Option 1 — Python (built in on macOS)
python3 -m http.server 8080

# Option 2 — Node
npx serve -l 8080
```

Then open <http://localhost:8080/index.html>.

## Where to paste your SDK

Each HTML file has a clearly-marked block at the **top of `<head>`**:

```html
<!-- ▼▼▼  PASTE YOUR COOKIE-CONSENT SDK SNIPPET HERE  ▼▼▼ -->
<!-- <script src="https://app.securiti.ai/.../cookie-consent-sdk.js"></script> -->
```

Paste the **same** snippet into all three pages (plain HTML has no shared
includes). It must load **first**, before the trackers at the bottom.

## How to test

1. Start the server and open the site.
2. Watch the **cookie status panel** (bottom-right): it lists live `document.cookie`
   and has buttons to set fake *analytics* / *marketing* cookies and clear them.
3. With your SDK pasted in: confirm the **consent banner** appears, that cookies are
   **blocked/categorized before consent**, that **accepting** sets the expected cookies,
   and that your **choice persists** as you move between Home → Components → About and on reload.

## Moving to real AEM later

- **Quick (no deploy):** drop your snippet into the **Embed** component on a page.
- **Proper (`<head>`, all pages):** add it as a **clientlib** or via the page template,
  deployed through **Cloud Manager** — or inject it via **Adobe Tags (Launch)**, the
  "Data Collection" app you saw in the launcher.
