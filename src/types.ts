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

/** Options for the `goto` (open) command. Subset of BrowserOptions that apply per-navigation. */
export interface OpenOptions {
  /** Chrome profile name or directory path */
  profile?: string;
  /** Auto-save/restore cookies and localStorage by name */
  sessionName?: string;
  /** Load saved auth state from JSON file */
  state?: string;
  /** Auto-discover and connect to running Chrome */
  autoConnect?: boolean;
  /** HTTP headers scoped to this origin */
  headers?: string;
}

/** Options for the `click` command. */
export interface ClickOptions {
  /** Open link in a new tab instead of navigating (only works on elements with href) */
  newTab?: boolean;
}

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

/** Options for `auth save` command. */
export interface AuthSaveOptions {
  /** Login page URL (required) */
  url: string;
  /** Username (required) */
  username: string;
  /** Password (required unless passwordStdin) */
  password?: string;
  /** Read password from stdin (recommended) */
  passwordStdin?: boolean;
  /** Custom CSS selector for username field */
  usernameSelector?: string;
  /** Custom CSS selector for password field */
  passwordSelector?: string;
  /** Custom CSS selector for submit button */
  submitSelector?: string;
}

/** Options for `chat` command. */
export interface ChatOptions {
  /** AI model name (or AI_GATEWAY_MODEL env) */
  model?: string;
  /** Show tool commands and their raw output */
  verbose?: boolean;
  /** Show only AI text responses (hide tool calls) */
  quiet?: boolean;
}

/** Options for `batch` command. */
export interface BatchOptions {
  /** Stop on first error (--bail, default: continue all) */
  bail?: boolean;
}

/** Options for `dashboard start` command. */
export interface DashboardOptions {
  /** Dashboard server port (default: 4848) */
  port?: number;
}

/** Options for `stream enable` command. */
export interface StreamOptions {
  /** WebSocket streaming port (default: OS-assigned) */
  port?: number;
}

/** Options for `profiler start` command. */
export interface ProfilerOptions {
  /** Comma-separated trace categories (default includes devtools.timeline, v8.execute, blink) */
  categories?: string;
}

/** Options for `find` command. */
export interface FindOptions {
  /** Filter role by accessible name (--name) */
  name?: string;
  /** Require exact text match (--exact) */
  exact?: boolean;
}

/** Scroll direction for the `scroll` command. */
export type ScrollDirection = 'up' | 'down' | 'left' | 'right';
/** Mouse button for mouse down/up. */
export type MouseButton = 'left' | 'right' | 'middle';
/** Color scheme preference for `set media`. */
export type ColorScheme = 'dark' | 'light';
/** Web storage type: local or session. */
export type StorageType = 'local' | 'session';
/** Locator strategy for `find` command. */
export type LocatorStrategy = 'role' | 'text' | 'label' | 'placeholder' | 'alt' | 'title' | 'testid' | 'first' | 'last' | 'nth';
/** Clipboard operation for `clipboard` commands. */
export type ClipboardOperation = 'read' | 'write' | 'copy' | 'paste';
