# @sigodenjs/agent-browser

A typed TypeScript wrapper around the [`agent-browser`](https://github.com/sigoden/agent-browser) CLI. Provides a clean, object-oriented Browser API that maps each CLI subcommand to a method call.

## Install

```bash
npm install @sigodenjs/agent-browser
```

## Usage

```ts
import { Browser } from '@sigodenjs/agent-browser';

const browser = new Browser({ headed: true });

// Navigate
await browser.goto('https://example.com');

// Interact
await browser.fill('#search', 'hello world');
await browser.click('button[type="submit"]');

// Extract data
const title = await browser.get.title();
const text = await browser.get.text('.result');

// Snapshot for AI
const snap = await browser.snapshot();

// Network
const requests = await browser.network.requests({ filter: 'api' });

// Tabs
const tab = await browser.tab.new('https://example.com', { label: 'docs' });
await browser.tab.switch(tab.tabId);

// Close
await browser.close();
```

## Constructor

```ts
const browser = new Browser(options?: BrowserOptions);
```

All `BrowserOptions` are applied as global CLI flags to every command.

See [`src/types.ts`](src/types.ts) for the full `BrowserOptions` interface.

## Core Commands

| Method | Description |
|---|---|
| `goto(url)` | Navigate to a URL |
| `back()` | Go back in history |
| `forward()` | Go forward in history |
| `reload()` | Reload the current page |
| `pushstate(url)` | Push a URL to the browser history (works with React SPAs) |
| `click(selector, opts?)` | Click an element |
| `dblclick(selector)` | Double-click an element |
| `type(selector, text)` | Type text into an element |
| `fill(selector, text)` | Clear and fill an input element |
| `press(key)` | Press a key (Enter, Tab, Ctrl+a, etc.) |
| `hover(selector)` | Hover over an element |
| `focus(selector)` | Focus an element |
| `check(selector)` | Check a checkbox |
| `uncheck(selector)` | Uncheck a checkbox |
| `select(selector, ...values)` | Select dropdown option(s) |
| `drag(source, target)` | Drag and drop |
| `upload(selector, ...files)` | Upload files |
| `download(selector, path)` | Download a file |
| `scroll(dir, pixels?)` | Scroll the page |
| `scrollIntoView(selector)` | Scroll an element into view |
| `wait(selectorOrMsOrOpts?)` | Wait for element, text, URL, load state, JS expression, or timeout |
| `screenshot(path?, opts?)` | Take a screenshot |
| `pdf(path)` | Save page as PDF |
| `snapshot(opts?)` | Get accessibility tree snapshot with element refs |
| `eval(js)` | Execute JavaScript in page context |
| `connect(portOrUrl)` | Connect via CDP port or URL |
| `close(all?)` | Close the browser |
| `frame(selector)` | Switch to an iframe |
| `mainframe()` | Switch back to the main frame |
| `console(clear?)` | View browser console output |
| `errors(clear?)` | View JavaScript errors |
| `highlight(selector)` | Visually highlight an element |
| `confirm(id)` | Approve a pending action |
| `deny(id)` | Deny a pending action |
| `batch(commands, opts?)` | Execute multiple commands sequentially (compatibility) |

## Sub-command Groups

### `browser.get`

Read page data.

| Method | Description |
|---|---|
| `get.text(selector)` | Get text content of an element |
| `get.html(selector)` | Get inner HTML of an element |
| `get.value(selector)` | Get value of an input element |
| `get.attr(selector, name)` | Get an attribute value from an element |
| `get.title()` | Get the page title |
| `get.url()` | Get the current page URL |
| `get.count(selector)` | Get the number of elements matching a selector |
| `get.box(selector)` | Get the bounding box of an element (x, y, width, height) |
| `get.styles(selector)` | Get computed styles of an element |
| `get.cdpUrl()` | Get the CDP endpoint URL for the active page |

### `browser.is`

Check element state.

| Method | Description |
|---|---|
| `is.visible(selector)` | Check if an element is visible |
| `is.enabled(selector)` | Check if an element is enabled (not disabled) |
| `is.checked(selector)` | Check if a checkbox/radio is checked |

### `browser.find`

Find and interact with elements by semantic locator.

Each method accepts a [`FindAction`](src/types.ts) and optional [`FindOptions`](src/types.ts).

| Method | Description |
|---|---|
| `find.role(value, action, opts?)` | Find by ARIA role (button, link, heading, etc.) and perform action |
| `find.text(value, action, opts?)` | Find by text content and perform action |
| `find.label(value, action, opts?)` | Find by aria-label and perform action |
| `find.placeholder(value, action, opts?)` | Find by placeholder attribute and perform action |
| `find.alt(value, action, opts?)` | Find by alt text and perform action |
| `find.title(value, action, opts?)` | Find by title attribute and perform action |
| `find.testid(value, action, opts?)` | Find by data-testid attribute and perform action |
| `find.first(selector, action, opts?)` | Find first element matching a CSS selector and perform action |
| `find.last(selector, action, opts?)` | Find last element matching a CSS selector and perform action |
| `find.nth(index, selector, action, opts?)` | Find nth element by index and CSS selector, then perform action |

### `browser.mouse`

| Method | Description |
|---|---|
| `mouse.move(x, y)` | Move the mouse to absolute coordinates |
| `mouse.down(button?)` | Press a mouse button (left, right, middle) |
| `mouse.up(button?)` | Release a mouse button (left, right, middle) |
| `mouse.wheel(dy, dx?)` | Scroll the mouse wheel |

### `browser.set`

| Method | Description |
|---|---|
| `set.viewport(w, h, scale?)` | Set viewport size |
| `set.device(name)` | Emulate a device (e.g. "iPhone 12") |
| `set.geo(lat, lng)` | Set geolocation coordinates |
| `set.offline(on?)` | Toggle offline mode |
| `set.headers(json)` | Set extra HTTP headers for all requests |
| `set.credentials(user, pass)` | Set HTTP basic authentication credentials |
| `set.media(colorScheme?, reducedMotion?)` | Set color scheme and reduced motion preference |

### `browser.network`

| Method | Description |
|---|---|
| `network.route(url, opts?)` | Intercept requests matching a URL pattern |
| `network.unroute(url?)` | Remove a route interceptor (all if no URL given) |
| `network.requests(opts?)` | List captured network requests with optional filters |
| `network.request(id)` | View full request/response detail (including body) by request ID |

### `browser.cookies`

| Method | Description |
|---|---|
| `cookies.get()` | Get all cookies |
| `cookies.set(name, value, opts?)` | Set a cookie with optional advanced options |
| `cookies.clear()` | Clear all cookies |

### `browser.storage`

| Method | Description |
|---|---|
| `storage.local.get(key?)` | Get localStorage value(s). All keys when called without argument |
| `storage.local.set(key, value)` | Set a localStorage item |
| `storage.local.clear()` | Clear all localStorage |
| `storage.session.get(key?)` | Get sessionStorage value(s). All keys when called without argument |
| `storage.session.set(key, value)` | Set a sessionStorage item |
| `storage.session.clear()` | Clear all sessionStorage |

### `browser.tab`

| Method | Description |
|---|---|
| `tab.list()` | List open tabs with their IDs and labels |
| `tab.new(url?, opts?)` | Open a new tab, optionally with a URL and label |
| `tab.close(ref?)` | Close a tab by ref or label (current tab if no ref) |
| `tab.switch(ref)` | Switch to a tab by ID or label |

### `browser.diff`

| Method | Description |
|---|---|
| `diff.snapshot(opts?)` | Compare current snapshot to last snapshot or a baseline file |
| `diff.screenshot(opts)` | Visual pixel diff against a baseline image |
| `diff.url(url1, url2, opts?)` | Compare two pages by URL |

### `browser.keyboard`

| Method | Description |
|---|---|
| `keyboard.type(text)` | Type text with real keystrokes (no selector needed) |
| `keyboard.insertText(text)` | Insert text without firing key events (like paste) |

### `browser.clipboard`

| Method | Description |
|---|---|
| `clipboard.read()` | Read text from the browser clipboard |
| `clipboard.write(text)` | Write text to the browser clipboard |
| `clipboard.copy()` | Copy the current selection (Ctrl+C / Cmd+C) |
| `clipboard.paste()` | Paste from clipboard (Ctrl+V / Cmd+V) |

## License

MIT
