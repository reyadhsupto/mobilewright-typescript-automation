import {
  Screen,
  Locator,
  expect,
} from 'mobilewright';

export interface TapOptions {
  timeout?: number;
  button?: 'left' | 'right' | 'middle';
  clickCount?: number;
}

export interface FillOptions {
  timeout?: number;
  delay?: number;
}

export interface WaitForOptions {
  state: 'visible' | 'hidden' | 'enabled' | 'disabled';
  timeout?: number;
}

/**
 * @interface Swipeoptions 
 * @member direction Direction of swipe 'up' | 'down' | 'left' | 'right'
 * @member distance Distance in points (default: 50% of screen dimension)
 * @member duration Duration of swipe in ms
 * @member startX startY Starting x,y (default: center of screen)
 * All screen classes inherit from this to access locators and perform actions
 */
export interface SwipeOptions {
  direction: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  timeout?: number;
  startX?: number;
  startY?: number;
}

export interface AssertionOptions {
  timeout?: number;
}

/**
 * BaseScreen provides core locator factories and actions
 * All screen classes inherit from this to access locators and perform actions
 */
export abstract class BaseScreen {
  protected screen: Screen;
  protected DEFAULT_TIMEOUT = 5000;

  constructor(screen: Screen) {
    this.screen = screen;
  }

  /**
   * Get element by accessibility label
   * @param label The accessibility label to search for
   * @param exact Exact label to match for
   * @returns Locator object
   */
  async getByLabel(label: string, exact: boolean ): Promise<Locator> {
    return await this.screen.getByLabel(label, {exact: exact ?? false});
  }

  /**
   * Get element by test ID (accessibility identifier)
   * @param testId The test ID to search for
   * @returns Locator object
   */
  async getByTestId(testId: string): Promise<Locator> {
    return await this.screen.getByTestId(testId);
  }

  /**
   * Get element by visible text
   * @param text The text to search for (string for exact match, RegExp for pattern)
   * @param exact Exact text to match for
   * @returns Locator object
   */
  async getByText(text: string | RegExp, exact?: boolean): Promise<Locator> {
    return await this.screen.getByText(text, {exact: exact ?? false});
  }

  /**
   * Get element by type/role
   * @param type The element type to search for (e.g., 'Button', 'TextField', 'Cell')
   * @returns Locator object
   */
  async getByType(type: string): Promise<Locator> {
    return await this.screen.getByType(type);
  }

  /**
   * Get element by semantic role and optional name filter
   * @param role The semantic role ('button', 'textfield', 'checkbox', etc.)
   * @param name Role options including name filter
   * @returns Locator object
   */
  async getByRole(role: string, name: string | RegExp): Promise<Locator> {
    return await this.screen.getByRole(role, {name: name});
  }

  /**
   * Get element by placeholder text
   * @param placeholder The placeholder text to search for
   * @param exact Exact placeholder text to search for
   * @returns Locator object
   */
  async getByPlaceholder(placeholder: string, exact?: boolean ): Promise<Locator> {
    return await this.screen.getByPlaceholder(placeholder, {exact: exact ?? false});
  }

  /**
   * Tap on an element with optional timeout
   * Waits for element visibility before tapping
   * @param locator The locator of the element to tap
   * @param timeout Optional timeout for visibility wait
   */
  async tap(locator: Locator, timeout?: number): Promise<void> {
    const waittime = timeout ?? this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout: waittime });
    await locator.tap({timeout: waittime ?? 5});
  }

  /**
   * Double tap on an element
   * @param locator The locator of the element to double tap
   * @param timeout Optional timeout for visibility wait
   */
  async doubleTap(locator: Locator, timeout?: number): Promise<void> {
    const waittime = timeout ?? this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout: waittime });
    await locator.doubleTap({timeout: waittime ?? 5});
  }

  /**
   * Long press on an element
   * @param locator The locator of the element
   * @param duration Optional duration in milliseconds
   * @param timeout Optional timeout for visibility wait
   */
  async longPress(
    locator: Locator,
    duration?: number ,
    timeout?: number
  ): Promise<void> {
    const waittime = timeout ?? this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout: waittime });
    await locator.longPress({ duration: duration ?? 5000, timeout : waittime ?? 5000 });
  }

  /**
   * Fill text input with value
   * Auto-focuses and clears before typing
   * @param locator The locator of the input element
   * @param value The text to fill
   * @param options Fill options including timeout
   */
  async fill(
    locator: Locator,
    value: string,
    timeout?: number
  ): Promise<void> {
    const waittime = timeout ?? this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout : waittime });
    await locator.fill(value, { timeout: waittime ?? 5000 });
  }

  /**
   * Swipe on the screen
   * @param direction Direction to swipe ('up', 'down', 'left', 'right')
   * @param options Optional swipe options
   */
  async swipeScreen(options: SwipeOptions): Promise<void> {
    await this.screen.swipe(options.direction, {
      distance: options.distance,
      duration: options.duration,
    });
  }

  /**
   * Swipe on a specific element
   * @param locator The locator of the element to swipe on
   * @param direction Direction to swipe
   * @param options Optional swipe options
   */
  async swipeElement(
    locator: Locator,
    direction: string,
    options: SwipeOptions
  ): Promise<void> {
    const waittime = this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout: waittime ?? 5000 });
    await locator.swipe({ direction: options.direction, timeout: waittime ?? 5000 });
  }

  /**
   * Scroll element into view if needed
   * @param locator The locator of the element to scroll to
   * @param timeout Optional timeout for visibility wait
   */
  async scrollIntoView(locator: Locator, timeout?: number): Promise<void> {
    const waitTimeout = timeout ?? this.DEFAULT_TIMEOUT;
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Logs current screen viewTree in console
   */
  async logTree(): Promise<void> {
    console.log( await this.screen.viewTree());
  }

  /**
   * Wait for specified time in milliseconds
   * @param milliseconds Time to wait in milliseconds
   * @param message Optional message to log
   */
  async waitForTime(milliseconds: number, message?: string): Promise<void> {
    if (message) {
      console.log(`${message} - waiting ${milliseconds}ms...`);
    } else {
      console.log(`Waiting ${milliseconds}ms...`);
    }
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Take a screenshot
   * @param filename Optional filename to save screenshot
   * @param format Optional format ('png' or 'jpeg')
   */
  async takeScreenshot(
    filename?: string,
    format: 'png' | 'jpeg' = 'png'
  ): Promise<void> {
    return this.screen.screenshot({
      path: filename,
      format: format,
    });
  }

  /**
   * Get element text content
   * @param locator The locator of the element
   * @param timeout Optional timeout
   */
  async getText(locator: Locator, timeout?: number): Promise<string> {
    const waitTimeout = timeout ?? this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout: waitTimeout });
    return locator.getText();
  }

  /**
   * Get element value (for input fields)
   * @param locator The locator of the element
   * @param timeout Optional timeout
   */
  async getValue(locator: Locator, timeout?: number): Promise<string> {
    const waitTimeout = timeout ?? this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout: waitTimeout });
    return locator.getValue();
  }

  /**
   * Check if element is visible
   * @param locator The locator of the element
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  /**
   * Check if element is enabled
   * @param locator The locator of the element
   */
  async isEnabled(locator: Locator): Promise<boolean> {
    return locator.isEnabled();
  }

  /**
   * Check if element is selected
   * @param locator The locator of the element
   */
  async isSelected(locator: Locator): Promise<boolean> {
    return locator.isSelected();
  }

  /**
   * Check if element is focused
   * @param locator The locator of the element
   */
  async isFocused(locator: Locator): Promise<boolean> {
    return locator.isFocused();
  }

  /**
   * Check if element is checked (checkbox/switch)
   * @param locator The locator of the element
   */
  async isChecked(locator: Locator): Promise<boolean> {
    return locator.isChecked();
  }

  /**
   * Assert element is visible
   * @param locator The locator of the element
   * @param options Optional assertion options
   */
  async assertVisible(
    locator: Locator,
    options?: AssertionOptions
  ): Promise<void> {
    const timeout = options?.timeout ?? this.DEFAULT_TIMEOUT;
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * Assert element is not visible
   * @param locator The locator of the element
   * @param options Optional assertion options
   */
  async assertNotVisible(
    locator: Locator,
    options?: AssertionOptions
  ): Promise<void> {
    const timeout = options?.timeout ?? this.DEFAULT_TIMEOUT;
    await expect(locator).not.toBeVisible({ timeout });
  }

  /**
   * Assert element is enabled
   * @param locator The locator of the element
   * @param options Optional assertion options
   */
  async assertEnabled(
    locator: Locator,
    options?: AssertionOptions
  ): Promise<void> {
    const timeout = options?.timeout ?? this.DEFAULT_TIMEOUT;
    await expect(locator).toBeEnabled({ timeout });
  }

  /**
   * Assert element is disabled
   * @param locator The locator of the element
   * @param options Optional assertion options
   */
  async assertDisabled(
    locator: Locator,
    options?: AssertionOptions
  ): Promise<void> {
    const timeout = options?.timeout ?? this.DEFAULT_TIMEOUT;
    await expect(locator).not.toBeEnabled({ timeout });
  }

  /**
   * Assert element has specific text
   * @param locator The locator of the element
   * @param text Expected text (string or RegExp)
   * @param options Optional assertion options
   */
  async assertText(
    locator: Locator,
    text: string | RegExp,
    options?: AssertionOptions
  ): Promise<void> {
    const timeout = options?.timeout ?? this.DEFAULT_TIMEOUT;
    await expect(locator).toHaveText(text, { timeout });
  }

  /**
   * Assert element contains specific text
   * @param locator The locator of the element
   * @param text Text to contain
   * @param options Optional assertion options
   */
  async assertContainsText(
    locator: Locator,
    text: string,
    options?: AssertionOptions
  ): Promise<void> {
    const timeout = options?.timeout ?? this.DEFAULT_TIMEOUT;
    await expect(locator).toContainText(text, { timeout });
  }

}