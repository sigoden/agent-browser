import { delegate } from './delegate.js';
import type * as T from './types.js';

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
  async dblclick(selector: string): Promise<T.DblclickResult> {
    return this.exec<T.DblclickResult>(['dblclick'], [selector]);
  }

  /** Type text into an element. */
  async type(selector: string, text: string): Promise<T.TypeResult> {
    return this.exec<T.TypeResult>(['type'], [selector, text]);
  }

  /** Clear and fill an input element. */
  async fill(selector: string, text: string): Promise<T.FillResult> {
    return this.exec<T.FillResult>(['fill'], [selector, text]);
  }

  /** Press a key (Enter, Tab, Control+a, etc.). */
  async press(key: string): Promise<T.PressResult> {
    return this.exec<T.PressResult>(['press'], [key]);
  }

  /** Hover over an element. */
  async hover(selector: string): Promise<T.HoverResult> {
    return this.exec<T.HoverResult>(['hover'], [selector]);
  }

  /** Focus an element. */
  async focus(selector: string): Promise<T.FocusResult> {
    return this.exec<T.FocusResult>(['focus'], [selector]);
  }

  /** Check a checkbox. */
  async check(selector: string): Promise<T.CheckResult> {
    return this.exec<T.CheckResult>(['check'], [selector]);
  }

  /** Uncheck a checkbox. */
  async uncheck(selector: string): Promise<T.UncheckResult> {
    return this.exec<T.UncheckResult>(['uncheck'], [selector]);
  }

  /** Select dropdown option(s). */
  async select(selector: string, ...values: string[]): Promise<T.SelectResult> {
    return this.exec<T.SelectResult>(['select'], [selector, ...values]);
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
  async download(selector: string, path: string): Promise<T.DownloadResult> {
    return this.exec<T.DownloadResult>(['download'], [selector, path]);
  }

  /** Scroll the page (up/down/left/right). */
  async scroll(direction: T.ScrollDirection, pixels?: number): Promise<T.ScrollResult> {
    const args = pixels !== undefined ? [direction, String(pixels)] : [direction];
    return this.exec<T.ScrollResult>(['scroll'], args);
  }

  /** Scroll an element into view. */
  async scrollIntoView(selector: string): Promise<T.ScrollIntoViewResult> {
    return this.exec<T.ScrollIntoViewResult>(['scrollintoview'], [selector]);
  }

  /** Wait for an element or a timeout in milliseconds. */
  async wait(selectorOrMs: string | number): Promise<T.WaitResult> {
    return this.exec<T.WaitResult>(['wait'], [String(selectorOrMs)]);
  }

  /** Take a screenshot. Returns the path to the saved image. */
  async screenshot(path?: string, options?: T.ScreenshotOptions): Promise<T.ScreenshotResult> {
    const args = path ? [path] : [];
    return this.exec<T.ScreenshotResult>(['screenshot'], args, options as Record<string, unknown>);
  }

  /** Save the page as PDF. */
  async pdf(path: string): Promise<T.PdfResult> {
    return this.exec<T.PdfResult>(['pdf'], [path]);
  }

  /** Get the accessibility tree snapshot with element refs (for AI). */
  async snapshot(options?: T.SnapshotOptions): Promise<T.SnapshotResult> {
    return this.exec<T.SnapshotResult>(['snapshot'], [], options as Record<string, unknown>);
  }

  /** Execute JavaScript in the page context. */
  async eval(js: string): Promise<T.EvalResult> {
    return this.exec<T.EvalResult>(['eval'], [js]);
  }

  /** Connect to a browser via CDP port or URL. */
  async connect(portOrUrl: string | number): Promise<void> {
    await this.exec(['connect'], [String(portOrUrl)]);
  }

  /**
   * Close the browser.
   * @param all - Close every session when true.
   */
  async close(all?: boolean): Promise<T.CloseResult> {
    return this.exec<T.CloseResult>(['close'], [], all ? { all: true } : undefined);
  }

  // -- Navigation --

  /** Go back in history. */
  async back(): Promise<T.BackForwardResult> {
    return this.exec<T.BackForwardResult>(['back']);
  }

  /** Go forward in history. */
  async forward(): Promise<T.BackForwardResult> {
    return this.exec<T.BackForwardResult>(['forward']);
  }

  /** Reload the current page. */
  async reload(): Promise<T.BackForwardResult> {
    return this.exec<T.BackForwardResult>(['reload']);
  }

  // -- Get Info --

  get: T.GetActions = {
    text: (selector: string) => this.exec<T.TextResult>(['get', 'text'], [selector]),
    html: (selector: string) => this.exec<T.HtmlResult>(['get', 'html'], [selector]),
    value: (selector: string) => this.exec<T.InputValueResult>(['get', 'value'], [selector]),
    attr: (selector: string, name: string) => this.exec<T.AttrResult>(['get', 'attr'], [selector, name]),
    title: () => this.exec<T.TitleResult>(['get', 'title']),
    url: () => this.exec<T.UrlResult>(['get', 'url']),
    count: (selector: string) => this.exec<T.CountResult>(['get', 'count'], [selector]),
    box: (selector: string) => this.exec<T.BoxResult>(['get', 'box'], [selector]),
    styles: (selector: string) => this.exec<T.StylesResult>(['get', 'styles'], [selector]),
    cdpUrl: () => this.exec<T.CdpUrlResult>(['get', 'cdp-url']),
  };

  // -- Check State --

  is: T.IsActions = {
    visible: (selector: string) => this.exec<T.VisibleResult>(['is', 'visible'], [selector]),
    enabled: (selector: string) => this.exec<T.EnabledResult>(['is', 'enabled'], [selector]),
    checked: (selector: string) => this.exec<T.CheckedResult>(['is', 'checked'], [selector]),
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
    move: (x: number, y: number) => this.exec<T.MouseMoveResult>(['mouse', 'move'], [String(x), String(y)]),
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
    offline: (on?: boolean) => {
      const args = on !== undefined ? [on ? 'on' : 'off'] : [];
      return this.exec<T.OfflineResult>(['set', 'offline'], args);
    },
    headers: (json: string) => this.exec<T.SetResult>(['set', 'headers'], [json]),
    credentials: (user: string, pass: string) => this.exec<T.SetResult>(['set', 'credentials'], [user, pass]),
    media: (colorScheme?: 'dark' | 'light', reducedMotion?: boolean) => {
      const args: string[] = [];
      if (colorScheme) args.push(colorScheme);
      if (reducedMotion) args.push('reduced-motion');
      return this.exec<T.SetResult>(['set', 'media'], args);
    },
  };

  // -- Network --

  network: T.NetworkActions = {
    route: (url: string, options?: T.NetworkRouteOptions) =>
      this.exec<T.RouteResult>(['network', 'route'], [url], options as Record<string, unknown>),
    unroute: (url?: string) => {
      const args = url ? [url] : [];
      return this.exec<T.UnrouteResult>(['network', 'unroute'], args);
    },
    requests: (options?: T.NetworkRequestsOptions) =>
      this.exec<T.TrackedRequest[]>(['network', 'requests'], [], options as Record<string, unknown>),
    request: (requestId: string) => this.exec(['network', 'request'], [requestId]),
    har: (action: 'start' | 'stop', path?: string) => {
      const args = path ? [action, path] : [action];
      return this.exec(['network', 'har'], args);
    },
  };

  // -- Cookies --

  cookies: T.CookieActions = {
    get: () => this.exec<T.CookiesGetResult>(['cookies', 'get']),
    set: (name: string, value: string, options?: T.CookieSetOptions) =>
      this.exec<T.SetResult>(['cookies', 'set'], [name, value], options as Record<string, unknown>),
    clear: () => this.exec<T.CookiesClearResult>(['cookies', 'clear']),
  };

  // -- Storage --

  storage: T.StorageActions = {
    local: {
      get: (key?: string) => {
        const args = key ? ['local', 'get', key] : ['local'];
        return this.exec<T.StorageGetResult>(['storage', ...args]);
      },
      set: (key: string, value: string) =>
        this.exec<T.StorageSetResult>(['storage', 'local', 'set'], [key, value]),
      clear: () => this.exec<T.StorageClearResult>(['storage', 'local', 'clear']),
    },
    session: {
      get: (key?: string) => {
        const args = key ? ['session', 'get', key] : ['session'];
        return this.exec<T.StorageGetResult>(['storage', ...args]);
      },
      set: (key: string, value: string) =>
        this.exec<T.StorageSetResult>(['storage', 'session', 'set'], [key, value]),
      clear: () => this.exec<T.StorageClearResult>(['storage', 'session', 'clear']),
    },
  };

  // -- Tabs --

  tab: T.TabActions = {
    list: () => this.exec<T.TabListResult>(['tab', 'list']),
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
    type: (text: string) => this.exec<T.KeyboardTypeResult>(['keyboard', 'type'], [text]),
    insertText: (text: string) => this.exec<T.InsertTextResult>(['keyboard', 'inserttext'], [text]),
  };


  // -- Debug --

  /** View browser console output (log, warn, error, info). */
  async console(clear?: boolean): Promise<unknown> {
    const options = clear ? { clear: true } : undefined;
    return this.exec(['console'], [], options);
  }

  /** View JavaScript errors and uncaught exceptions. */
  async errors(clear?: boolean): Promise<T.ErrorsResult> {
    const options = clear ? { clear: true } : undefined;
    return this.exec<T.ErrorsResult>(['errors'], [], options);
  }

  /** Visually highlight an element on the page for debugging. */
  async highlight(selector: string): Promise<T.HighlightResult> {
    return this.exec<T.HighlightResult>(['highlight'], [selector]);
  }


  // -- Confirmation --

  /** Approve a pending action. */
  async confirm(id: string): Promise<T.ConfirmResult> {
    return this.exec<T.ConfirmResult>(['confirm'], [id]);
  }

  /** Deny a pending action. */
  async deny(id: string): Promise<T.DenyResult> {
    return this.exec<T.DenyResult>(['deny'], [id]);
  }


  // -- Batch --

  /** Execute multiple commands sequentially. */
  async batch(commands: string[], options?: T.BatchOptions): Promise<unknown> {
    return this.exec(['batch'], commands.map(c => `"${c}"`), options as Record<string, unknown>);
  }
}
