import { delegate } from './delegate.js';
import * as T from './types.js';

/**
 * Fast browser automation CLI wrapper.
 *
 * Each method delegates to the `agent-browser` CLI under the hood.
 * Options are merged with constructor-level global options and
 * translated to CLI flags via camelCase-to-kebab-case conversion.
 */
export class Browser {
  globalOptions: T.BrowserOptions;

  /** @param options - Global options applied to every command. */
  constructor(options: T.BrowserOptions = {}) {
    this.globalOptions = options;
  }

  private async exec<T = void>(command: string[], args: string[] = [], options?: Record<string, unknown>): Promise<T> {
    const raw = await delegate(command, args, this.globalOptions as Record<string, unknown>, options);
    const parsed = JSON.parse(raw);
    if (!parsed.success) throw new Error(parsed.error || 'Unknown error');
    return parsed.data as T;
  }

  // -- Core Commands --

  /** Navigate to a URL. */
  async goto(url: string): Promise<T.NavigateResult> {
    return this.exec<T.NavigateResult>(['goto'], [url]);
  }

  /** Click an element. */
  async click(selector: string, options?: T.ClickOptions): Promise<T.ClickResult> {
    return this.exec<T.ClickResult>(['click'], [selector], options as Record<string, unknown>);
  }

  /** Double-click an element. */
  async dblclick(selector: string): Promise<string> {
    const { clicked } = await this.exec<{ clicked: string }>(['dblclick'], [selector]);
    return clicked;
  }

  /** Type text into an element. */
  async type(selector: string, text: string): Promise<string> {
    const { typed } = await this.exec<{ typed: string }>(['type'], [selector, text]);
    return typed;
  }

  /** Clear and fill an input element. */
  async fill(selector: string, text: string): Promise<string> {
    const { filled } = await this.exec<{ filled: string }>(['fill'], [selector, text]);
    return filled;
  }

  /** Press a key (Enter, Tab, Control+a, etc.). */
  async press(key: string): Promise<string> {
    const { pressed } = await this.exec<{ pressed: string }>(['press'], [key]);
    return pressed;
  }

  /** Hover over an element. */
  async hover(selector: string): Promise<string> {
    const { hovered } = await this.exec<{ hovered: string }>(['hover'], [selector]);
    return hovered;
  }

  /** Focus an element. */
  async focus(selector: string): Promise<string> {
    const { focused } = await this.exec<{ focused: string }>(['focus'], [selector]);
    return focused;
  }

  /** Check a checkbox. */
  async check(selector: string): Promise<string> {
    const { checked } = await this.exec<{ checked: string }>(['check'], [selector]);
    return checked;
  }

  /** Uncheck a checkbox. */
  async uncheck(selector: string): Promise<string> {
    const { unchecked } = await this.exec<{ unchecked: string }>(['uncheck'], [selector]);
    return unchecked;
  }

  /** Select dropdown option(s). */
  async select(selector: string, ...values: string[]): Promise<string[]> {
    const { selected } = await this.exec<{ selected: string[] }>(['select'], [selector, ...values]);
    return selected;
  }

  /** Drag and drop from source to target element. */
  async drag(source: string, target: string): Promise<T.DragResult> {
    return this.exec<T.DragResult>(['drag'], [source, target]);
  }

  /** Upload files by clicking an element. */
  async upload(selector: string, ...files: string[]): Promise<T.UploadResult> {
    return this.exec<T.UploadResult>(['upload'], [selector, ...files]);
  }

  /** Download a file by clicking an element. */
  async download(selector: string, path: string): Promise<string> {
    const { path: filePath } = await this.exec<{ path: string }>(['download'], [selector, path]);
    return filePath;
  }

  /** Scroll the page (up/down/left/right). */
  async scroll(direction: T.ScrollDirection, pixels?: number): Promise<boolean> {
    const args = pixels !== undefined ? [direction, String(pixels)] : [direction];
    const { scrolled } = await this.exec<{ scrolled: boolean }>(['scroll'], args);
    return scrolled;
  }

  /** Scroll an element into view. */
  async scrollIntoView(selector: string): Promise<string> {
    const { scrolled } = await this.exec<{ scrolled: string }>(['scrollintoview'], [selector]);
    return scrolled;
  }

  /**
   * Wait for an element, text, URL, load state, JS expression, or a timeout.
   *
   * Examples:
   *   browser.wait("#loading-spinner")
   *   browser.wait(2000)
   *   browser.wait({ url: "https://www.example.com/" })
   *   browser.wait({ load: "networkidle" })
   *   browser.wait({ fn: "window.appReady === true" })
   *   browser.wait({ text: "Welcome back" })
   */
  async wait(selectorOrMs?: string | number | T.WaitOptions): Promise<T.WaitResult> {
    const args: string[] = [];
    let opts: Record<string, unknown> = {};

    if (typeof selectorOrMs === 'object') {
      if (Object.keys(selectorOrMs).length === 1 && 'timeout' in selectorOrMs) {
        args.push(String(selectorOrMs.timeout));
      } else {
        opts = selectorOrMs as Record<string, unknown>;
      }
    } else {
      if (selectorOrMs !== undefined) {
        args.push(String(selectorOrMs));
      }
    }

    return this.exec<T.WaitResult>(['wait'], args, opts);
  }

  /** Take a screenshot. Returns the path to the saved image. */
  async screenshot(path?: string, options?: T.ScreenshotOptions): Promise<T.ScreenshotResult> {
    const args = path ? [path] : [];
    return this.exec<T.ScreenshotResult>(['screenshot'], args, options as Record<string, unknown>);
  }

  /** Save the page as PDF. */
  async pdf(path: string): Promise<string> {
    const { path: pdfPath } = await this.exec<{ path: string }>(['pdf'], [path]);
    return pdfPath;
  }

  /** Get the accessibility tree snapshot with element refs (for AI). */
  async snapshot(options?: T.SnapshotOptions): Promise<T.SnapshotResult> {
    return this.exec<T.SnapshotResult>(['snapshot'], [], options as Record<string, unknown>);
  }

  /** Execute JavaScript in the page context. */
  async eval(js: string): Promise<unknown> {
    const { result } = await this.exec<{ result: unknown }>(['eval'], [js]);
    return result;
  }

  /** Connect to a browser via CDP port or URL. */
  async connect(portOrUrl: string | number): Promise<void> {
    await this.exec(['connect'], [String(portOrUrl)]);
  }

  /**
   * Close the browser.
   * @param all - Close every session when true.
   */
  async close(all?: boolean): Promise<boolean> {
    const { closed } = await this.exec<{ closed: boolean }>(['close'], [], all ? { all: true } : undefined);
    return closed;
  }

  // -- Navigation --

  /** Go back in history. */
  async back(): Promise<string> {
    const { url } = await this.exec<{ url: string }>(['back']);
    return url;
  }

  /** Go forward in history. */
  async forward(): Promise<string> {
    const { url } = await this.exec<{ url: string }>(['forward']);
    return url;
  }

  /** Reload the current page. */
  async reload(): Promise<string> {
    const { url } = await this.exec<{ url: string }>(['reload']);
    return url;
  }

  // -- Get Info --

  get: T.GetActions = {
    text: async (selector: string) => {
      const { text } = await this.exec<{ text: string; origin: string }>(['get', 'text'], [selector]);
      return text;
    },
    html: async (selector: string) => {
      const { html } = await this.exec<{ html: string }>(['get', 'html'], [selector]);
      return html;
    },
    value: async (selector: string) => {
      const { value } = await this.exec<{ value: string }>(['get', 'value'], [selector]);
      return value;
    },
    attr: async (selector: string, name: string) => {
      const { value } = await this.exec<{ value: string; origin: string }>(['get', 'attr'], [selector, name]);
      return value;
    },
    title: async () => {
      const { title } = await this.exec<{ title: string }>(['get', 'title']);
      return title;
    },
    url: async () => {
      const { url } = await this.exec<{ url: string }>(['get', 'url']);
      return url;
    },
    count: async (selector: string) => {
      const { count } = await this.exec<{ count: number }>(['get', 'count'], [selector]);
      return count;
    },
    box: (selector: string) => this.exec<T.BoxResult>(['get', 'box'], [selector]),
    styles: async (selector: string) => {
      const { styles } = await this.exec<{ styles: Record<string, string> }>(['get', 'styles'], [selector]);
      return styles;
    },
    cdpUrl: async () => {
      const { cdpUrl } = await this.exec<{ cdpUrl: string }>(['get', 'cdp-url']);
      return cdpUrl;
    },
  };

  // -- Check State --

  is: T.IsActions = {
    visible: async (selector: string) => {
      const { visible } = await this.exec<{ visible: boolean; origin: string }>(['is', 'visible'], [selector]);
      return visible;
    },
    enabled: async (selector: string) => {
      const { enabled } = await this.exec<{ enabled: boolean; origin: string }>(['is', 'enabled'], [selector]);
      return enabled;
    },
    checked: async (selector: string) => {
      const { checked } = await this.exec<{ checked: boolean; origin: string }>(['is', 'checked'], [selector]);
      return checked;
    },
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
  async find(locator: T.LocatorStrategy, value: string, action: string, text?: string, options?: T.FindOptions): Promise<T.FindResult> {
    const args = text !== undefined ? [locator, value, action, text] : [locator, value, action];
    return this.exec<T.FindResult>(['find'], args, options as Record<string, unknown>);
  }

  // -- Mouse --

  mouse: T.MouseActions = {
    move: async (x: number, y: number) => {
      const { moved } = await this.exec<{ moved: boolean }>(['mouse', 'move'], [String(x), String(y)]);
      return moved;
    },
    down: (button?: T.MouseButton) => {
      const args = button ? [button] : [];
      return this.exec<T.MouseButtonResult>(['mouse', 'down'], args);
    },
    up: (button?: T.MouseButton) => {
      const args = button ? [button] : [];
      return this.exec<T.MouseButtonResult>(['mouse', 'up'], args);
    },
    wheel: (dy: number, dx?: number) => {
      const args = dx !== undefined ? [String(dy), String(dx)] : [String(dy)];
      return this.exec<T.WheelResult>(['mouse', 'wheel'], args);
    },
  };

  // -- Browser Settings --

  set: T.SetActions = {
    viewport: (w: number, h: number, scale?: number) => {
      const args = scale !== undefined ? [String(w), String(h), String(scale)] : [String(w), String(h)];
      return this.exec<T.ViewportResult>(['set', 'viewport'], args);
    },
    device: (name: string) => this.exec<T.DeviceResult>(['set', 'device'], [name]),
    geo: (lat: number, lng: number) => this.exec<T.GeoResult>(['set', 'geo'], [String(lat), String(lng)]),
    offline: async (on?: boolean) => {
      const args = on !== undefined ? [on ? 'on' : 'off'] : [];
      const { offline } = await this.exec<{ offline: boolean }>(['set', 'offline'], args);
      return offline;
    },
    headers: async (json: string) => {
      const { set } = await this.exec<{ set: boolean }>(['set', 'headers'], [json]);
      return set;
    },
    credentials: async (user: string, pass: string) => {
      const { set } = await this.exec<{ set: boolean }>(['set', 'credentials'], [user, pass]);
      return set;
    },
    media: async (colorScheme?: 'dark' | 'light', reducedMotion?: boolean) => {
      const args: string[] = [];
      if (colorScheme) args.push(colorScheme);
      if (reducedMotion) args.push('reduced-motion');
      const { set } = await this.exec<{ set: boolean }>(['set', 'media'], args);
      return set;
    },
  };

  // -- Network --

  network: T.NetworkActions = {
    route: async (url: string, options?: T.NetworkRouteOptions) => {
      const { routed } = await this.exec<{ routed: string }>(['network', 'route'], [url], options as Record<string, unknown>);
      return routed;
    },
    unroute: async (url?: string) => {
      const args = url ? [url] : [];
      const { unrouted } = await this.exec<{ unrouted: string }>(['network', 'unroute'], args);
      return unrouted;
    },
    requests: (options?: T.NetworkRequestsOptions) =>
      this.exec<T.RequestsResult>(['network', 'requests'], [], options as Record<string, unknown>),
    request: (requestId: string) => this.exec<T.RequestDetailResult>(['network', 'request'], [requestId]),
  };

  // -- Cookies --

  cookies: T.CookieActions = {
    get: async () => {
      const { cookies } = await this.exec<{ cookies: T.Cookie[] }>(['cookies', 'get']);
      return cookies;
    },
    set: async (name: string, value: string, options?: T.CookieSetOptions) => {
      const { set } = await this.exec<{ set: boolean }>(['cookies', 'set'], [name, value], options as Record<string, unknown>);
      return set;
    },
    clear: async () => {
      const { cleared } = await this.exec<{ cleared: boolean }>(['cookies', 'clear']);
      return cleared;
    },
  };

  // -- Storage --

  storage: T.StorageActions = {
    local: {
      get: (key?: string) => {
        const args = key ? ['local', 'get', key] : ['local'];
        return this.exec<T.StorageGetResult>(['storage', ...args]);
      },
      set: async (key: string, value: string) => {
        const { set } = await this.exec<{ set: boolean }>(['storage', 'local', 'set'], [key, value]);
        return set;
      },
      clear: async () => {
        const { cleared } = await this.exec<{ cleared: boolean }>(['storage', 'local', 'clear']);
        return cleared;
      },
    },
    session: {
      get: (key?: string) => {
        const args = key ? ['session', 'get', key] : ['session'];
        return this.exec<T.StorageGetResult>(['storage', ...args]);
      },
      set: async (key: string, value: string) => {
        const { set } = await this.exec<{ set: boolean }>(['storage', 'session', 'set'], [key, value]);
        return set;
      },
      clear: async () => {
        const { cleared } = await this.exec<{ cleared: boolean }>(['storage', 'session', 'clear']);
        return cleared;
      },
    },
  };

  // -- Tabs --

  tab: T.TabActions = {
    list: async () => {
      const { tabs } = await this.exec<{ tabs: T.TabInfo[] }>(['tab', 'list']);
      return tabs;
    },
    new: (url?: string, options?: T.TabNewOptions) => {
      const args = url ? [url] : [];
      return this.exec<T.TabNewResult>(['tab', 'new'], args, options as Record<string, unknown>);
    },
    close: (ref?: string) => {
      const args = ref ? [ref] : [];
      return this.exec<T.TabCloseResult>(['tab', 'close'], args);
    },
    switch: (ref: string) => this.exec<T.TabSwitchResult>(['tab'], [ref]),
  };

  // -- Diff --

  diff: T.DiffActions = {
    snapshot: (options?: T.DiffSnapshotOptions) =>
      this.exec<T.DiffSnapshotResult>(['diff', 'snapshot'], [], options as Record<string, unknown>),
    screenshot: (options: T.DiffScreenshotOptions) =>
      this.exec<T.DiffScreenshotResult>(['diff', 'screenshot'], [], { ...options }),
    url: (url1: string, url2: string, options?: T.DiffUrlOptions) =>
      this.exec<T.DiffUrlResult>(['diff', 'url'], [url1, url2], options as Record<string, unknown>),
  };

  // -- Keyboard --

  keyboard: T.KeyboardActions = {
    type: async (text: string) => {
      const { typed } = await this.exec<{ typed: string }>(['keyboard', 'type'], [text]);
      return typed;
    },
    insertText: async (text: string) => {
      const { inserted } = await this.exec<{ inserted: boolean }>(['keyboard', 'inserttext'], [text]);
      return inserted;
    },
  };


  // -- Debug --

  /** View browser console output (log, warn, error, info). */
  async console(clear?: boolean): Promise<unknown> {
    const options = clear ? { clear: true } : undefined;
    return this.exec(['console'], [], options);
  }

  /** View JavaScript errors and uncaught exceptions. */
  async errors(clear?: boolean): Promise<T.ErrorEntry[]> {
    const options = clear ? { clear: true } : undefined;
    const { errors } = await this.exec<{ errors: T.ErrorEntry[] }>(['errors'], [], options);
    return errors;
  }

  /** Visually highlight an element on the page for debugging. */
  async highlight(selector: string): Promise<string> {
    const { highlighted } = await this.exec<{ highlighted: string }>(['highlight'], [selector]);
    return highlighted;
  }

  // -- Confirmation --

  /** Approve a pending action. */
  async confirm(id: string): Promise<void> {
    await this.exec<unknown>(['confirm'], [id]);
  }

  /** Deny a pending action. */
  async deny(id: string): Promise<void> {
    await this.exec<unknown>(['deny'], [id]);
  }


  // -- Batch --

  /** Execute multiple commands sequentially. */
  async batch(commands: string[], options?: T.BatchOptions): Promise<unknown> {
    return this.exec(['batch'], commands.map(c => `"${c}"`), options as Record<string, unknown>);
  }
}
