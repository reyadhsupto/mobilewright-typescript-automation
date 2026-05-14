/**
 * PopupScreen - Screen class for handling popup dialogs
 * Extends BaseScreen with popup-specific functionality
 * Works with mobilewright test framework
 */

import { BaseScreen } from './baseScreen';
import type { Screen } from 'mobilewright';

export class PopupScreen extends BaseScreen {
  // Element identifiers
  private readonly TITLE_IDENTIFIER = 'com.pathao.user.qa:id/tvTitleSinglePopup';
  private readonly BODY_IDENTIFIER = 'com.pathao.user.qa:id/tvBodySinglePopup';
  private readonly BUTTON_IDENTIFIER = 'com.pathao.user.qa:id/btnSeeDetailsDakpeonSingle';

  constructor(screen: Screen) {
    super(screen);
  }

  /**
   * Check if popup is currently visible
   */
  async isPopupVisible(): Promise<boolean> {
    try {
        (await this.getByTestId(this.BODY_IDENTIFIER)).waitFor({ state: 'visible', timeout: 30000 });
        // await this.logTree();
        console.log('Popup is visible on screen');
        return true;
    } catch (error) {
        console.log('Popup is not currently visible on screen');
        return false;
    }
  }

  /**
   * Wait for popup to disappear with configurable timeout
   * Default timeout: 15 seconds (15000ms)
   */
  async waitForPopupToDisappear(timeout: number = 25000): Promise<void> {
    console.log(`Waiting for popup to disappear (timeout: ${timeout}ms)...`);
    this.waitForTime(timeout);
  }
}
