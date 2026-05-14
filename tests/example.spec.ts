// this is a skeleton test for mobilewright (see https://github.com/mobile-next/mobilewright/blob/main/README.md)
// for documentation see: https://mobilewright.dev/docs/
// for agent skill see: https://github.com/mobile-next/mobilewright-skill
import { test, expect } from '@mobilewright/test';
import { PopupScreen } from '../src/screens/popupScreen';
import { EstimationScreen } from '../src/screens/estimationScreen';

test('Complete booking flow - popup check, address fill, and payment', async ({ screen, device }) => {
  // Initialize screens
  const popupScreen = new PopupScreen(screen);
  const estimationScreen = new EstimationScreen(screen);

  // Step 1: Check if popup is visible and wait for it to disappear
  console.log('\n========== STEP 1: CHECKING POPUP ==========\n');
  const isPopupVisible = await popupScreen.isPopupVisible();

  if (isPopupVisible) {
    console.log('Popup detected, waiting for it to disappear...');
    await popupScreen.waitForPopupToDisappear(30000);
  } else {
    console.log('No popup detected, proceeding with booking...');
  }

  // Step 2: Select Bike service
  console.log('\n========== STEP 2: SELECTING BIKE SERVICE ==========\n');
  await estimationScreen.selectBikeService(30000);

  // Step 3: Fill address and select from suggestion
  console.log('\n========== STEP 3: FILLING ADDRESS ==========\n');
  await estimationScreen.clickAndFillAddress('airport', 15000);
  await estimationScreen.selectAddressFromSuggestion('Hazrat Shahjalal International Airport', 15000);

  // Step 4: Open payment options
  console.log('\n========== STEP 4: SELECTING PAYMENT METHOD ==========\n');
  await estimationScreen.openPaymentOptions(15000);

  // Step 5: Select cash payment
  await estimationScreen.selectCashPayment(15000);

  // Step 6: Click choose button
  await estimationScreen.clickChooseButton(15000);

  // Step 7: Click confirm pickup
  console.log('\n========== STEP 5: CONFIRMING PICKUP ==========\n');
  await estimationScreen.clickConfirmPickup(15000);

  // Step 8: Print debug info
  console.log('\n========== BOOKING FLOW COMPLETED ==========\n');
  await estimationScreen.printDebugInfo();
});
