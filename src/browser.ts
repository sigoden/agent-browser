import { delegate } from './delegate.js';
import type {
  BrowserOptions, ClickOptions, SnapshotOptions,
  ScreenshotOptions, NetworkRouteOptions, NetworkRequestsOptions,
  CookieSetOptions, TabNewOptions, DiffSnapshotOptions,
  DiffScreenshotOptions, DiffUrlOptions, BatchOptions,
  ScrollDirection, MouseButton, LocatorStrategy,
  FindOptions,
} from './types.js';

/**
 * Fast browser automation CLI wrapper.
 *
 * Each method delegates to the `agent-browser` CLI under the hood.
 * Options are merged with constructor-level global options and
 * translated to CLI flags via camelCase-to-kebab-case conversion.
 */
export class Browser {
  globalOptions: BrowserOptions;

  /** @param options - Global options applied to every command. */
  constructor(options: BrowserOptions = {}) {
    this.globalOptions = options;
  }

  private async exec(command: string[], args: string[] = [], options?: Record<string, unknown>): Promise<string> {
    return delegate(command, args, this.globalOptions as Record<string, unknown>, options);
  }

  // -- Core Commands --

  /** Navigate to a URL. */
  async goto(url: string): Promise<void> {
    await this.exec(['goto'], [url]);
  }

  /** Click an element. */
  async click(selector: string, options?: ClickOptions): Promise<void> {
    await this.exec(['click'], [selector], options as Record<string, unknown>);
  }

  /** Double-click an element. */
  async dblclick(selector: string): Promise<void> {
    await this.exec(['dblclick'], [selector]);
  }

  /** Type text into an element. */
  async type(selector: string, text: string): Promise<void> {
    await this.exec(['type'], [selector, text]);
  }

  /** Clear and fill an input element. */
  async fill(selector: string, text: string): Promise<void> {
    await this.exec(['fill'], [selector, text]);
  }

  /** Press a key (Enter, Tab, Control+a, etc.). */
  async press(key: string): Promise<void> {
    await this.exec(['press'], [key]);
  }

  /** Hover over an element. */
  async hover(selector: string): Promise<void> {
    await this.exec(['hover'], [selector]);
  }

  /** Focus an element. */
  async focus(selector: string): Promise<void> {
    await this.exec(['focus'], [selector]);
  }

  /** Check a checkbox. */
  async check(selector: string): Promise<void> {
    await this.exec(['check'], [selector]);
  }

  /** Uncheck a checkbox. */
  async uncheck(selector: string): Promise<void> {
    await this.exec(['uncheck'], [selector]);
  }

  /** Select dropdown option(s). */
  async select(selector: string, ...values: string[]): Promise<void> {
    await this.exec(['select'], [selector, ...values]);
  }

  /** Drag and drop from source to target element. */
  async drag(source: string, target: string): Promise<void> {
    await this.exec(['drag'], [source, target]);
  }

  /** Upload files by clicking an element. */
  async upload(selector: string, ...files: string[]): Promise<void> {
    await this.exec(['upload'], [selector, ...files]);
  }

  /** Download a file by clicking an element. */
  async download(selector: string, path: string): Promise<void> {
    await this.exec(['download'], [selector, path]);
  }

  /** Scroll the page (up/down/left/right). */
  async scroll(direction: ScrollDirection, pixels?: number): Promise<void> {
    const args = pixels !== undefined ? [direction, String(pixels)] : [direction];
    await this.exec(['scroll'], args);
  }

  /** Scroll an element into view. */
  async scrollIntoView(selector: string): Promise<void> {
    await this.exec(['scrollintoview'], [selector]);
  }

  /** Wait for an element or a timeout in milliseconds. */
  async wait(selectorOrMs: string | number): Promise<void> {
    await this.exec(['wait'], [String(selectorOrMs)]);
  }

  /** Take a screenshot. Returns the path to the saved image. */
  async screenshot(path?: string, options?: ScreenshotOptions): Promise<string> {
    const args = path ? [path] : [];
    return this.exec(['screenshot'], args, options as Record<string, unknown>);
  }

  /** Save the page as PDF. */
  async pdf(path: string): Promise<void> {
    await this.exec(['pdf'], [path]);
  }

  /** Get the accessibility tree snapshot with element refs (for AI). */
  async snapshot(options?: SnapshotOptions): Promise<string> {
    return this.exec(['snapshot'], [], options as Record<string, unknown>);
  }

  /** Execute JavaScript in the page context. */
  async eval(js: string): Promise<string> {
    return this.exec(['eval'], [js]);
  }

  /** Connect to a browser via CDP port or URL. */
  async connect(portOrUrl: string | number): Promise<void> {
    await this.exec(['connect'], [String(portOrUrl)]);
  }

  /**
   * Close the browser.
   * @param all - Close every session when true.
   */
  async close(all?: boolean): Promise<void> {
    await this.exec(['close'], [], all ? { all: true } : undefined);
  }

  // -- Navigation --

  /** Go back in history. */
  async back(): Promise<void> {
    await this.exec(['back']);
  }

  /** Go forward in history. */
  async forward(): Promise<void> {
    await this.exec(['forward']);
  }

  /** Reload the current page. */
  async reload(): Promise<void> {
    await this.exec(['reload']);
  }

  // -- Get Info --

  get = {
    /** Get text content of an element. */
    text: (selector: string) => this.exec(['get', 'text'], [selector]),
    /** Get inner HTML of an element. */
    html: (selector: string) => this.exec(['get', 'html'], [selector]),
    /** Get value of an input element. */
    value: (selector: string) => this.exec(['get', 'value'], [selector]),
    /** Get an attribute value from an element. */
    attr: (selector: string, name: string) => this.exec(['get', 'attr'], [selector, name]),
    /** Get the page title. */
    title: () => this.exec(['get', 'title']),
    /** Get the current page URL. */
    url: () => this.exec(['get', 'url']),
    /** Get the number of elements matching a selector. */
    count: (selector: string) => this.exec(['get', 'count'], [selector]),
    /** Get the bounding box of an element. */
    box: (selector: string) => this.exec(['get', 'box'], [selector]),
    /** Get computed styles of an element. */
    styles: (selector: string) => this.exec(['get', 'styles'], [selector]),
    /** Get the CDP endpoint URL for the active page. */
    cdpUrl: () => this.exec(['get', 'cdp-url']),
  };

  // -- Check State --

  is = {
    /** Check if an element is visible. */
    visible: (selector: string) => this.exec(['is', 'visible'], [selector]),
    /** Check if an element is enabled. */
    enabled: (selector: string) => this.exec(['is', 'enabled'], [selector]),
    /** Check if a checkbox/radio is checked. */
    checked: (selector: string) => this.exec(['is', 'checked'], [selector]),
  };

  // -- Find Elements --

  /**
   * Find and interact with elements by semantic locator.
   * @param locator - Locator strategy (role, text, label, placeholder, etc.).
   * @param value - The locator value.
   * @param action - Action to perform (click, fill, type, hover, focus, check, uncheck). Default: click.
   * @param text - Optional text for text-based locators.
   * @param options - Additional options (name, exact match).
   */
  async find(locator: LocatorStrategy, value: string, action: string, text?: string, options?: FindOptions): Promise<string> {
    const args = text !== undefined ? [locator, value, action, text] : [locator, value, action];
    return this.exec(['find'], args, options as Record<string, unknown>);
  }

  // -- Mouse --

  mouse = {
    /** Move the mouse to absolute coordinates. */
    move: (x: number, y: number) => this.exec(['mouse', 'move'], [String(x), String(y)]),
    /** Press a mouse button (left, right, middle). */
    down: (button?: MouseButton) => {
      const args = button ? [button] : [];
      return this.exec(['mouse', 'down'], args);
    },
    /** Release a mouse button. */
    up: (button?: MouseButton) => {
      const args = button ? [button] : [];
      return this.exec(['mouse', 'up'], args);
    },
    /** Scroll the mouse wheel. dy is vertical, dx is horizontal. */
    wheel: (dy: number, dx?: number) => {
      const args = dx !== undefined ? [String(dy), String(dx)] : [String(dy)];
      return this.exec(['mouse', 'wheel'], args);
    },
  };

  // -- Browser Settings --

  set = {
    /**
     * Set viewport size.
     * @param w - Viewport width in pixels.
     * @param h - Viewport height in pixels.
     * @param scale - Device scale factor (e.g. 2 for retina).
     */
    viewport: (w: number, h: number, scale?: number) => {
      const args = scale !== undefined ? [String(w), String(h), String(scale)] : [String(w), String(h)];
      return this.exec(['set', 'viewport'], args);
    },
    /** Emulate a device (e.g. "iPhone 12"). */
    device: (name: string) => this.exec(['set', 'device'], [name]),
    /** Set geolocation coordinates. */
    geo: (lat: number, lng: number) => this.exec(['set', 'geo'], [String(lat), String(lng)]),
    /** Toggle offline mode. */
    offline: (on?: boolean) => {
      const args = on !== undefined ? [on ? 'on' : 'off'] : [];
      return this.exec(['set', 'offline'], args);
    },
    /** Set extra HTTP headers for all requests. */
    headers: (json: string) => this.exec(['set', 'headers'], [json]),
    /** Set HTTP basic authentication credentials. */
    credentials: (user: string, pass: string) => this.exec(['set', 'credentials'], [user, pass]),
    /**
     * Set color scheme and reduced motion preference.
     * @param colorScheme - "dark" or "light".
     * @param reducedMotion - Enable reduced motion when true.
     */
    media: (colorScheme?: 'dark' | 'light', reducedMotion?: boolean) => {
      const args: string[] = [];
      if (colorScheme) args.push(colorScheme);
      if (reducedMotion) args.push('reduced-motion');
      return this.exec(['set', 'media'], args);
    },
  };

  // -- Network --

  network = {
    /** Intercept requests matching a URL pattern. */
    route: (url: string, options?: NetworkRouteOptions) =>
      this.exec(['network', 'route'], [url], options as Record<string, unknown>),
    /** Remove a route interceptor (all if no URL given). */
    unroute: (url?: string) => {
      const args = url ? [url] : [];
      return this.exec(['network', 'unroute'], args);
    },
    /** List captured network requests. */
    requests: (options?: NetworkRequestsOptions) =>
      this.exec(['network', 'requests'], [], options as Record<string, unknown>),
    /** View full request/response detail (including body) by request ID. */
    request: (requestId: string) => this.exec(['network', 'request'], [requestId]),
    /** Record and export a HAR file. */
    har: (action: 'start' | 'stop', path?: string) => {
      const args = path ? [action, path] : [action];
      return this.exec(['network', 'har'], args);
    },
  };

  // -- Cookies --

  cookies = {
    /** Get all cookies. */
    get: () => this.exec(['cookies', 'get']),
    /** Set a cookie with optional advanced options. */
    set: (name: string, value: string, options?: CookieSetOptions) =>
      this.exec(['cookies', 'set'], [name, value], options as Record<string, unknown>),
    /** Clear all cookies. */
    clear: () => this.exec(['cookies', 'clear']),
  };

  // -- Storage --

  storage = {
    local: {
      /** Get local storage value(s). All keys when called without argument. */
      get: (key?: string) => {
        const args = key ? ['local', 'get', key] : ['local'];
        return this.exec(['storage', ...args]);
      },
      /** Set a local storage item. */
      set: (key: string, value: string) =>
        this.exec(['storage', 'local', 'set'], [key, value]),
      /** Clear all local storage. */
      clear: () => this.exec(['storage', 'local', 'clear']),
    },
    session: {
      /** Get session storage value(s). All keys when called without argument. */
      get: (key?: string) => {
        const args = key ? ['session', 'get', key] : ['session'];
        return this.exec(['storage', ...args]);
      },
      /** Set a session storage item. */
      set: (key: string, value: string) =>
        this.exec(['storage', 'session', 'set'], [key, value]),
      /** Clear all session storage. */
      clear: () => this.exec(['storage', 'session', 'clear']),
    },
  };

  // -- Tabs --

  tab = {
    /** List open tabs with their IDs and labels. */
    list: () => this.exec(['tab', 'list']),
    /** Open a new tab, optionally navigating to a URL with a label. */
    new: (url?: string, options?: TabNewOptions) => {
      const args = url ? [url] : [];
      return this.exec(['tab', 'new'], args, options as Record<string, unknown>);
    },
    /** Close a tab by ref or label (current tab if no ref). */
    close: (ref?: string) => {
      const args = ref ? [ref] : [];
      return this.exec(['tab', 'close'], args);
    },
    /** Switch to a tab by ID or label. */
    switch: (ref: string) => this.exec(['tab'], [ref]),
  };

  // -- Diff --

  diff = {
    /** Compare current snapshot to last snapshot or a baseline file. */
    snapshot: (options?: DiffSnapshotOptions) =>
      this.exec(['diff', 'snapshot'], [], options as Record<string, unknown>),
    /** Visual pixel diff against a baseline image. */
    screenshot: (options: DiffScreenshotOptions) =>
      this.exec(['diff', 'screenshot'], [], { ...options }),
    /** Compare two pages by URL. */
    url: (url1: string, url2: string, options?: DiffUrlOptions) =>
      this.exec(['diff', 'url'], [url1, url2], options as Record<string, unknown>),
  };

  // -- Keyboard --

  keyboard = {
    /** Type text with real keystrokes (no selector needed). */
    type: (text: string) => this.exec(['keyboard', 'type'], [text]),
    /** Insert text without firing key events. */
    insertText: (text: string) => this.exec(['keyboard', 'inserttext'], [text]),
  };


  // -- Debug --

  /** View browser console output (log, warn, error, info). */
  async console(clear?: boolean): Promise<void> {
    const options = clear ? { clear: true } : undefined;
    await this.exec(['console'], [], options);
  }

  /** View JavaScript errors and uncaught exceptions. */
  async errors(clear?: boolean): Promise<void> {
    const options = clear ? { clear: true } : undefined;
    await this.exec(['errors'], [], options);
  }

  /** Visually highlight an element on the page for debugging. */
  async highlight(selector: string): Promise<void> {
    await this.exec(['highlight'], [selector]);
  }


  // -- Confirmation --

  /** Approve a pending action. */
  async confirm(id: string): Promise<void> {
    await this.exec(['confirm'], [id]);
  }

  /** Deny a pending action. */
  async deny(id: string): Promise<void> {
    await this.exec(['deny'], [id]);
  }


  // -- Batch --

  /** Execute multiple commands sequentially. */
  async batch(commands: string[], options?: BatchOptions): Promise<string> {
    return this.exec(['batch'], commands.map(c => `"${c}"`), options as Record<string, unknown>);
  }
}
