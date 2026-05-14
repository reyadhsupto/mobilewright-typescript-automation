/**
 * EstimationScreen - Screen class for handling estimation flow
 * Extends BaseScreen with estimation-specific methods following the base class pattern
 * Works with mobilewright test framework
 */

import { BaseScreen } from './baseScreen';
import type { Screen } from 'mobilewright';

export class EstimationScreen extends BaseScreen {
  // Element identifiers
  private readonly ADDRESS_INPUT = 'com.pathao.user.qa:id/etAddress';
  private readonly PAYMENT_ARROW = 'com.pathao.user.qa:id/ivPaymentArrow';
  private readonly CASH_PAYMENT = 'Cash Payment';
  private readonly CHOOSE_BUTTON = 'Choose';
  private readonly CONFIRM_PICKUP = 'Confirm pickup';
  private readonly BIKE_TEXT = 'Bike';

  constructor(screen: Screen) {
    super(screen);
  }

  /**
   * Click on address input field
   */
  async clickAddressInput(timeout?: number): Promise<void> {
    console.log('Clicking on address input field...');
    const locator = await this.getByTestId(this.ADDRESS_INPUT);
    await this.tap(locator, timeout ?? 15000);
  }

  /**
   * Fill address with text
   */
  async fillAddressInput(address: string, timeout?: number): Promise<void> {
    console.log(`Filling address with: "${address}"`);
    const locator = await this.getByTestId(this.ADDRESS_INPUT);
    await this.fill(locator, address, timeout ?? 15000);
  }

  /**
   * Click and fill address in one action
   */
  async clickAndFillAddress(address: string, timeout?: number): Promise<void> {
    console.log(`Clicking and filling address: "${address}"`);
    await this.clickAddressInput(timeout);
    await this.fillAddressInput(address, timeout);
  }

  /**
   * Select address from dropdown suggestion
   */
  async selectAddressFromSuggestion(suggestionText: string, timeout?: number): Promise<void> {
    console.log(`Selecting address suggestion: "${suggestionText}"`);
    const locator = await this.getByText(suggestionText);
    await this.tap(locator, timeout ?? 15000);
  }

  /**
   * Click on Bike service option
   */
  async selectBikeService(timeout?: number): Promise<void> {
    console.log('Selecting Bike service...');
    const locator = await this.getByText(this.BIKE_TEXT);
    await this.tap(locator, timeout ?? 15000);
  }

  /**
   * Click on payment arrow to open payment options
   */
  async openPaymentOptions(timeout?: number): Promise<void> {
    console.log('Opening payment options...');
    const locator = await this.getByTestId(this.PAYMENT_ARROW);
    await this.tap(locator, timeout ?? 15000);
  }

  /**
   * Select cash payment method
   */
  async selectCashPayment(timeout?: number): Promise<void> {
    console.log('Selecting Cash Payment...');
    const locator = await this.getByText(this.CASH_PAYMENT);
    await this.tap(locator, timeout ?? 15000);
  }

  /**
   * Click on choose button
   */
  async clickChooseButton(timeout?: number): Promise<void> {
    console.log('Clicking Choose button...');
    const locator = await this.getByText(this.CHOOSE_BUTTON, true);
    await this.tap(locator, timeout ?? 15000);
  }

  /**
   * Click on confirm pickup button
   */
  async clickConfirmPickup(timeout?: number): Promise<void> {
    console.log('Clicking Confirm Pickup button...');
    const locator = await this.getByText(this.CONFIRM_PICKUP, true);
    await this.tap(locator, timeout ?? 15000);
  }

  /**
   * Complete estimation flow
   * 1. Click address input
   * 2. Fill address
   * 3. Select address from suggestion
   * 4. Select Bike service
   * 5. Open payment options
   * 6. Select cash payment
   * 7. Click choose button
   * 8. Click confirm pickup
   */
  async completeEstimationFlow(address: string, addressSuggestion: string): Promise<void> {
    try {
      console.log('\n========== STARTING ESTIMATION FLOW ==========\n');

      // Step 1: Click and fill address
      await this.clickAndFillAddress(address, 15000);

      // Step 2: Select address from suggestion
      await this.selectAddressFromSuggestion(addressSuggestion, 15000);

      // Step 3: Select Bike service
      await this.selectBikeService(15000);

      // Step 4: Open payment options
      await this.openPaymentOptions(15000);

      // Step 5: Select cash payment
      await this.selectCashPayment(15000);

      // Step 6: Click choose button
      await this.clickChooseButton(15000);

      // Step 7: Click confirm pickup
      await this.clickConfirmPickup(15000);

      console.log('\n========== ESTIMATION FLOW COMPLETED ==========\n');
    } catch (error) {
      console.error('Estimation flow failed:', error);
      throw error;
    }
  }

  /**
   * Verify address input is visible
   */
  async verifyAddressInputVisible(): Promise<void> {
    console.log('Verifying address input is visible...');
    const locator = await this.getByTestId(this.ADDRESS_INPUT);
    await this.assertVisible(locator);
  }

  /**
   * Verify bike service is available
   */
  async verifyBikeServiceAvailable(): Promise<void> {
    console.log('Verifying Bike service is available...');
    const locator = await this.getByText(this.BIKE_TEXT);
    await this.assertVisible(locator);
  }

  /**
   * Print view tree for debugging
   */
  async printDebugInfo(): Promise<void> {
    console.log('\n========== ESTIMATION SCREEN DEBUG INFO ==========');
    await this.logTree();
    console.log('==================================================\n');
  }
}
