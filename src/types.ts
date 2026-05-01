/** Global options passed to the Browser constructor (merged into every command). */
export interface BrowserOptions {
  /** Isolated session name (or AGENT_BROWSER_SESSION env). Default: "default" */
  session?: string;
  /** Custom browser executable path (or AGENT_BROWSER_EXECUTABLE_PATH) */
  executablePath?: string;
  /** Browser extension paths (repeatable) */
  extension?: string[];
  /** Browser launch args, comma or newline separated (or AGENT_BROWSER_ARGS) */
  args?: string;
  /** Custom User-Agent (or AGENT_BROWSER_USER_AGENT) */
  userAgent?: string;
  /** Proxy server URL (or AGENT_BROWSER_PROXY, HTTP_PROXY, HTTPS_PROXY, ALL_PROXY) */
  proxy?: string;
  /** Bypass proxy for these hosts (or AGENT_BROWSER_PROXY_BYPASS, NO_PROXY) */
  proxyBypass?: string;
  /** Ignore HTTPS certificate errors */
  ignoreHttpsErrors?: boolean;
  /** Allow file:// URLs to access local files (Chromium only) */
  allowFileAccess?: boolean;
  /** Browser provider: ios, browserbase, kernel, browseruse, browserless, agentcore */
  provider?: string;
  /** iOS device name (e.g. "iPhone 15 Pro") */
  device?: string;
  /** JSON output */
  json?: boolean;
  /** Annotated screenshot with numbered labels and legend */
  annotate?: boolean;
  /** Default screenshot output directory (or AGENT_BROWSER_SCREENSHOT_DIR) */
  screenshotDir?: string;
  /** JPEG quality 0-100; ignored for PNG (or AGENT_BROWSER_SCREENSHOT_QUALITY) */
  screenshotQuality?: number;
  /** Screenshot format: png, jpeg (or AGENT_BROWSER_SCREENSHOT_FORMAT) */
  screenshotFormat?: 'png' | 'jpeg';
  /** Show browser window (not headless) (or AGENT_BROWSER_HEADED) */
  headed?: boolean;
  /** Connect via CDP (Chrome DevTools Protocol) port */
  cdp?: string;
  /** Color scheme: dark, light, no-preference (or AGENT_BROWSER_COLOR_SCHEME) */
  colorScheme?: 'dark' | 'light' | 'no-preference';
  /** Default download directory (or AGENT_BROWSER_DOWNLOAD_PATH) */
  downloadPath?: string;
  /** Wrap page output in boundary markers (or AGENT_BROWSER_CONTENT_BOUNDARIES) */
  contentBoundaries?: boolean;
  /** Truncate page output to N chars (or AGENT_BROWSER_MAX_OUTPUT) */
  maxOutput?: number;
  /** Restrict navigation domains (or AGENT_BROWSER_ALLOWED_DOMAINS) */
  allowedDomains?: string;
  /** Action policy JSON file path (or AGENT_BROWSER_ACTION_POLICY) */
  actionPolicy?: string;
  /** Action categories requiring confirmation (or AGENT_BROWSER_CONFIRM_ACTIONS) */
  confirmActions?: string;
  /** Interactive confirmation prompts (or AGENT_BROWSER_CONFIRM_INTERACTIVE) */
  confirmInteractive?: boolean;
  /** Browser engine: chrome (default), lightpanda (or AGENT_BROWSER_ENGINE) */
  engine?: 'chrome' | 'lightpanda';
  /** Disable automatic dismissal of alert/beforeunload dialogs (or AGENT_BROWSER_NO_AUTO_DIALOG) */
  noAutoDialog?: boolean;
  /** AI model for chat (or AI_GATEWAY_MODEL env) */
  model?: string;
  /** Show tool commands and their raw output */
  verbose?: boolean;
  /** Show only AI text responses (hide tool calls) */
  quiet?: boolean;
  /** Custom config file path (or AGENT_BROWSER_CONFIG env) */
  config?: string;
  /** Chrome profile name or directory path (or AGENT_BROWSER_PROFILE env) */
  profile?: string;
  /** Auto-save/restore cookies and localStorage by name (or AGENT_BROWSER_SESSION_NAME env) */
  sessionName?: string;
  /** Load saved auth state (cookies + storage) from JSON file (or AGENT_BROWSER_STATE env) */
  state?: string;
  /** Auto-discover and connect to running Chrome (or AGENT_BROWSER_AUTO_CONNECT env) */
  autoConnect?: boolean;
  /** HTTP headers scoped to URL's origin (e.g. Authorization bearer token) */
  headers?: string;
}


/** Options for the `click` command. */
export interface ClickOptions {
  /** Open link in a new tab instead of navigating (only works on elements with href) */
  newTab?: boolean;
}

/** Actions for find operation. */
export type FindAction = { kind: 'click' } | { kind: 'fill'; text: string } | { kind: 'type'; text: string }
  | { kind: 'hover' } | { kind: 'focus' } | { kind: 'check' } | { kind: 'uncheck' };

/** Options for the `snapshot` command. */
export interface SnapshotOptions {
  /** Only include interactive elements (-i) */
  interactive?: boolean;
  /** Include href URLs for link elements (-u) */
  urls?: boolean;
  /** Remove empty structural elements (-c) */
  compact?: boolean;
  /** Limit snapshot tree depth (-d) */
  depth?: number;
  /** Scope snapshot to a CSS selector or @ref (-s) */
  selector?: string;
}

/** Options for the `screenshot` command. */
export interface ScreenshotOptions {
  /** Capture full page (not just viewport) (--full) */
  full?: boolean;
  /** Overlay numbered labels on interactive elements */
  annotate?: boolean;
  /** Default output directory for screenshots */
  screenshotDir?: string;
  /** JPEG quality 0-100 (only applies to jpeg format) */
  screenshotQuality?: number;
  /** Image format: png (default) or jpeg */
  screenshotFormat?: 'png' | 'jpeg';
}

/** Options for `network route` command. */
export interface NetworkRouteOptions {
  /** Abort matching requests */
  abort?: boolean;
  /** Respond with custom JSON body */
  body?: string;
}

/** Options for `network requests` command. */
export interface NetworkRequestsOptions {
  /** Clear request log */
  clear?: boolean;
  /** Filter by URL pattern */
  filter?: string;
  /** Filter by resource type (comma-separated: xhr, fetch, document) */
  type?: string;
  /** Filter by HTTP method (GET, POST, etc.) */
  method?: string;
  /** Filter by status code (200, 2xx, 400-499) */
  status?: string;
}

/** Options for `cookies set` command. */
export interface CookieSetOptions {
  /** Cookie URL */
  url?: string;
  /** Cookie domain */
  domain?: string;
  /** Cookie path */
  path?: string;
  /** HTTP-only cookie */
  httpOnly?: boolean;
  /** Secure cookie */
  secure?: boolean;
  /** SameSite attribute: Strict, Lax, None */
  sameSite?: 'Strict' | 'Lax' | 'None';
  /** Expiry timestamp */
  expires?: number;
}

/** Options for `tab new` command. */
export interface TabNewOptions {
  /** Tab label for easy reference (e.g. "docs", "app") */
  label?: string;
  /** URL to open in the new tab */
  url?: string;
}

/** Options for `diff snapshot` command. */
export interface DiffSnapshotOptions {
  /** Compare against a saved snapshot file (--baseline) */
  baseline?: string;
  /** Scope snapshot to a CSS selector or @ref (-s) */
  selector?: string;
  /** Use compact snapshot format (-c) */
  compact?: boolean;
  /** Limit snapshot tree depth (-d) */
  depth?: number;
}

/** Options for `diff screenshot` command. */
export interface DiffScreenshotOptions {
  /** Baseline image to compare against (required) */
  baseline: string;
  /** Path for the diff image (--output, default: temp dir) */
  output?: string;
  /** Color distance threshold 0-1 (--threshold, default: 0.1) */
  threshold?: number;
  /** Scope screenshot to element (-s) */
  selector?: string;
  /** Full page screenshot (--full) */
  full?: boolean;
}

/** Options for `diff url` command. */
export interface DiffUrlOptions {
  /** Also compare screenshots (default: snapshot only) */
  screenshot?: boolean;
  /** Full page screenshots */
  full?: boolean;
  /** Navigation wait strategy: load, domcontentloaded, networkidle (default: load) */
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
  /** Scope snapshots to a CSS selector or @ref (-s) */
  selector?: string;
  /** Use compact snapshot format (-c) */
  compact?: boolean;
  /** Limit snapshot tree depth (-d) */
  depth?: number;
}


/** Options for `batch` command. */
export interface BatchOptions {
  /** Stop on first error (--bail, default: continue all) */
  bail?: boolean;
}
export interface FindOptions {
  /** Filter role by accessible name (--name) */
  name?: string;
  /** Require exact text match (--exact) */
  exact?: boolean;
}

/** Options for `wait` command. */
export interface WaitOptions {
  /** Timeout in milliseconds */
  timeout?: number;
  /** URL pattern to wait for */
  url?: string;
  /** Page load state: load, domcontentloaded, networkidle */
  load?: 'load' | 'domcontentloaded' | 'networkidle';
  /** JavaScript expression to wait for (truthy) */
  fn?: string;
  /** Wait for text to appear on page (substring match) */
  text?: string;
  /** Element state: visible, hidden, detached (default: visible) */
  state?: 'visible' | 'hidden' | 'detached';
}

/** Scroll direction for the `scroll` command. */
export type ScrollDirection = 'up' | 'down' | 'left' | 'right';
/** Mouse button for mouse down/up. */
export type MouseButton = 'left' | 'right' | 'middle';
/** Color scheme preference for `set media`. */
export type ColorScheme = 'dark' | 'light';
/** Locator strategy for `find` command. */
export type LocatorStrategy = 'role' | 'text' | 'label' | 'placeholder' | 'alt' | 'title' | 'testid' | 'first' | 'last' | 'nth';

// =========================================================================
// Result types (based on agent-browser JSON responses)
// =========================================================================

export interface NavigateResult { url: string; title: string; }

export interface ClickResult { clicked: string; newTab?: boolean; url?: string; }
export interface DragResult { dragged: boolean; source: string; target: string; }
export type WaitResult = { waited: 'text'; text: string; } | { waited: 'selector'; selector: string; } | { waited: 'url'; url: string; } | { waited: 'function'; } | { waited: 'load'; state: string; } | { waited: 'timeout'; ms: number; };

export interface ScreenshotResult { path: string; annotations?: ScreenshotAnnotation[]; }
export interface SnapshotResult { snapshot: string; origin: string; refs: Record<string, { role: string; name: string; }>; }

export interface BoxResult { x: number; y: number; width: number; height: number; }

export interface ViewportResult { width: number; height: number; deviceScaleFactor: number; mobile: boolean; }
export interface DeviceResult { device: string; width: number; height: number; deviceScaleFactor: number; mobile: boolean; }
export interface GeoResult { latitude: number; longitude: number; }
export interface RequestsResult { cleared: boolean; requests: TrackedRequest[]; }
export type RequestDetailResult = TrackedRequest & { responseBody: unknown; };

export type StorageGetResult = { key: string; value: string; } | { data: Record<string, string> };

export interface TabNewResult { tabId: string; url: string; label?: string; total: number; }
export interface TabSwitchResult { tabId: string; url: string; label?: string; title: string; }
export interface TabCloseResult { tabId: string; closed: boolean; label?: string; }

export interface DiffSnapshotResult { diff: string; additions: number; removals: number; unchanged: number; changed: number; }
export interface DiffScreenshotResult { match: boolean; mismatchPercentage: number; totalPixels: number; differentPixels: number; diffPath?: string; dimensionMismatch?: unknown; }
export interface DiffUrlResult { diff: string; url1: string; url2: string; snapshot1: string; snapshot2: string; }

export type MouseButtonResult = { pressed: boolean; } | { released: boolean; }
export interface WheelResult { scrolled: boolean; deltaX: number; deltaY: number; }


// Sub-object action types (with reserved-word-friendly keys)

export interface GetActions {
  /** Get text content of an element. */
  text(selector: string): Promise<string>;
  /** Get inner HTML of an element. */
  html(selector: string): Promise<string>;
  /** Get value of an input element. */
  value(selector: string): Promise<string>;
  /** Get an attribute value from an element. */
  attr(selector: string, name: string): Promise<string>;
  /** Get the page title. */
  title(): Promise<string>;
  /** Get the current page URL. */
  url(): Promise<string>;
  /** Get the number of elements matching a selector. */
  count(selector: string): Promise<number>;
  /** Get the bounding box of an element (x, y, width, height). */
  box(selector: string): Promise<BoxResult>;
  /** Get computed styles of an element. */
  styles(selector: string): Promise<Record<string, string>>;
  /** Get the CDP endpoint URL for the active page. */
  cdpUrl(): Promise<string>;
}

export interface IsActions {
  /** Check if an element is visible. */
  visible(selector: string): Promise<boolean>;
  /** Check if an element is enabled (not disabled). */
  enabled(selector: string): Promise<boolean>;
  /** Check if a checkbox/radio is checked. */
  checked(selector: string): Promise<boolean>;
}

export interface FindActions {
  /** Find by ARIA role (e.g. "button", "link", "heading") and perform action. Supports --name to filter by accessible name. */
  role(value: string, action: FindAction, options?: FindOptions): Promise<FindElement[]>;
  /** Find by text content and perform action. Optionally provide text to type/fill. */
  text(value: string, action: FindAction, options?: FindOptions): Promise<FindElement[]>;
  /** Find by aria-label and perform action. Optionally provide text to type/fill. */
  label(value: string, action: FindAction, options?: FindOptions): Promise<FindElement[]>;
  /** Find by placeholder attribute and perform action. Optionally provide text to type/fill. */
  placeholder(value: string, action: FindAction, options?: FindOptions): Promise<FindElement[]>;
  /** Find by alt text and perform action. */
  alt(value: string, action: FindAction, options?: FindOptions): Promise<FindElement[]>;
  /** Find by title attribute and perform action. */
  title(value: string, action: FindAction, options?: FindOptions): Promise<FindElement[]>;
  /** Find by data-testid attribute and perform action. */
  testid(value: string, action: FindAction, options?: FindOptions): Promise<FindElement[]>;
  /** Find first element matching a CSS selector and perform action. */
  first(value: string, action: FindAction, options?: FindOptions): Promise<FindElement[]>;
  /** Find last element matching a CSS selector and perform action. */
  last(value: string, action: FindAction, options?: FindOptions): Promise<FindElement[]>;
  /** Find nth element by index and CSS selector, then perform action. */
  nth(index: number, selector: string, action: FindAction, options?: FindOptions): Promise<FindElement[]>;
}

export interface MouseActions {
  /** Move the mouse to absolute coordinates (x, y). */
  move(x: number, y: number): Promise<boolean>;
  /** Press a mouse button (left, right, middle). */
  down(button?: MouseButton): Promise<MouseButtonResult>;
  /** Release a mouse button (left, right, middle). */
  up(button?: MouseButton): Promise<MouseButtonResult>;
  /** Scroll the mouse wheel. dy is vertical, dx is horizontal. */
  wheel(dy: number, dx?: number): Promise<WheelResult>;
}

export interface SetActions {
  /**
   * Set viewport size.
   * @param w - Viewport width in pixels.
   * @param h - Viewport height in pixels.
   * @param scale - Device scale factor (e.g. 2 for retina).
   */
  viewport(w: number, h: number, scale?: number): Promise<ViewportResult>;
  /** Emulate a device (e.g. "iPhone 12"). */
  device(name: string): Promise<DeviceResult>;
  /** Set geolocation coordinates. */
  geo(lat: number, lng: number): Promise<GeoResult>;
  /** Toggle offline mode. */
  offline(on?: boolean): Promise<boolean>;
  /** Set extra HTTP headers for all requests. */
  headers(json: string): Promise<boolean>;
  /** Set HTTP basic authentication credentials. */
  credentials(user: string, pass: string): Promise<boolean>;
  /**
   * Set color scheme and reduced motion preference.
   * @param colorScheme - "dark" or "light".
   * @param reducedMotion - Enable reduced motion when true.
   */
  media(colorScheme?: 'dark' | 'light', reducedMotion?: boolean): Promise<boolean>;
}

export interface NetworkActions {
  /** Intercept requests matching a URL pattern. */
  route(url: string, options?: NetworkRouteOptions): Promise<string>;
  /** Remove a route interceptor (all if no URL given). */
  unroute(url?: string): Promise<string>;
  /** List captured network requests, with optional filters (clear, filter, type, method, status). */
  requests(options?: NetworkRequestsOptions): Promise<RequestsResult>;
  /** View full request/response detail (including body) by request ID. */
  request(requestId: string): Promise<RequestDetailResult>;
}
export interface CookieActions {
  /** Get all cookies. */
  get(): Promise<Cookie[]>;
  /** Set a cookie with optional advanced options. */
  set(name: string, value: string, options?: CookieSetOptions): Promise<boolean>;
  /** Clear all cookies. */
  clear(): Promise<boolean>;
}

export interface StorageAreaActions {
  /** Get storage value(s). All keys when called without argument. */
  get(key?: string): Promise<StorageGetResult>;
  /** Set a storage item. */
  set(key: string, value: string): Promise<boolean>;
  /** Clear all storage. */
  clear(): Promise<boolean>;
}

export interface StorageActions {
  /** localStorage operations. */
  local: StorageAreaActions;
  /** sessionStorage operations. */
  session: StorageAreaActions;
}

export interface TabActions {
  /** List open tabs with their IDs and labels. */
  list(): Promise<TabInfo[]>;
  /** Open a new tab, optionally with a URL and label. */
  'new'(url?: string, options?: TabNewOptions): Promise<TabNewResult>;
  /** Close a tab by ref or label (current tab if no ref). */
  close(ref?: string): Promise<TabCloseResult>;
  /** Switch to a tab by ID or label. */
  switch(ref: string): Promise<TabSwitchResult>;
}

export interface DiffActions {
  /** Compare current snapshot to last snapshot or a baseline file. */
  snapshot(options?: DiffSnapshotOptions): Promise<DiffSnapshotResult>;
  /** Visual pixel diff against a baseline image. */
  screenshot(options: DiffScreenshotOptions): Promise<DiffScreenshotResult>;
  /** Compare two pages by URL. */
  url(url1: string, url2: string, options?: DiffUrlOptions): Promise<DiffUrlResult>;
}

export interface KeyboardActions {
  /** Type text with real keystrokes (no selector needed). */
  type(text: string): Promise<string>;
  /** Insert text without firing key events (like paste). */
  insertText(text: string): Promise<boolean>;
}


// =========================================================================
// Sub-types used in result types
// =========================================================================

export interface TabInfo {
  tabId: string;
  label: string;
  title: string;
  url: string;
  type: string;
  active: boolean;
}

export interface AnnotationBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ScreenshotAnnotation {
  refId: string;
  number: number;
  role: string;
  name?: string;
  box: AnnotationBox;
}

export interface FindElement {
  index: number;
  tagName: string;
  text: string;
  visible: boolean;
}

export interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  size: number;
  httpOnly: boolean;
  secure: boolean;
  session: boolean;
  sameSite?: string;
}

export interface ErrorEntry {
  text: string;
  url: string;
  line: number;
  column: number;
}

export interface TrackedRequest {
  url: string;
  method: string;
  headers: Record<string, unknown>;
  timestamp: number;
  resourceType: string;
  requestId: string;
  postData?: string;
  status?: number;
  responseHeaders?: Record<string, unknown>;
  mimeType?: string;
}
