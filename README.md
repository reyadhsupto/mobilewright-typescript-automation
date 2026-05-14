# mobilewright-typescript-automation

Hybrid (Android, iOS) automation framework built using **mobilewright** and **TypeScript** following the **Screen Object Model (SOM)** pattern.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Framework Setup](#framework-setup)
- [Available Commands](#available-commands)
- [Architecture](#architecture)
- [BaseScreen Class](#basescreen-class)
- [Page Objects](#page-objects)
- [Writing Tests](#writing-tests)

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git
- Connected Android/iOS device or emulator

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/reyadhsupto/mobilewright-typescript-automation.git
   cd mobilewright-typescript-automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install mobilewright agents:**
   ```bash
   npm run mobilewright:install
   ```

4. **List connected devices:**
   ```bash
   npx mobilewright devices
   ```

5. **Run tests:**
   ```bash
   npx mobilewright test
   ```

---

## Installation

### Install mobilewright

```bash
npm install mobilewright
npm install --save-dev @mobilewright/test
```

### Install mobilewright agents

Required for platform-specific automation:

```bash
npm run mobilewright:install
```

Or directly:

```bash
npx mobilewright install
```

---

## Framework Setup

### Project Structure

```
src/
└── screens/
    ├── baseScreen.ts              # Base class for all screen objects
    ├── popupScreen.ts             # Popup handling
    └── estimationScreen.ts        # Estimation/booking flow

tests/
└── example.spec.ts                # Example test file

mobilewright.config.ts             # Configuration file
package.json                        # Dependencies
```

### Configuration

Edit `mobilewright.config.ts` to set up your device:

```typescript
import { defineConfig } from 'mobilewright';

export default defineConfig({
  platform: 'android',                    // 'android' or 'ios'
  bundleId: 'com.pathao.user.qa',        // Your app bundle ID
  deviceName: /Redmi Note 12/,           // Device name pattern
  deviceId: 'fe574666',                  // Device ID
  timeout: 30_000,                       // Default timeout in ms
  testDir: './tests'                     // Test directory
});
```

---

## Available Commands

### NPM Scripts

```bash
# Run all tests
npm test
# or
npx mobilewright test

# Run specific test file
npx mobilewright test tests/example.spec.ts

# List connected devices
npx mobilewright devices

# Install mobilewright agents
npm run mobilewright:install
```

### Manual Commands

```bash
# Install mobilewright globally
npm install -g mobilewright

# Install required agents
npx mobilewright install

# List available devices
npx mobilewright devices

# Run tests
npx mobilewright test [path/to/test]

# Run tests with watch mode
npx mobilewright test --watch
```

---

## Architecture

### Screen Object Model (SOM)

This framework follows the **Screen Object Model** pattern where:

- Each screen/page is represented as a class
- All interactions with elements are encapsulated in methods
- Tests remain clean and maintainable
- Locators are centralized and reusable

### Pattern Structure

```
BaseScreen
├── PopupScreen
├── EstimationScreen
└── [Other Screen Objects]

Test File
├── Initialize Screen Objects
├── Perform Actions (via screen methods)
└── Assert Results
```

---

## BaseScreen Class

The `BaseScreen` is the foundation class that all screen objects extend. It provides common functionality and methods for interacting with elements.

### Features

- **Locator Methods** - Find elements by various selectors
- **Action Methods** - Tap, fill, swipe, scroll, etc.
- **Assertion Methods** - Verify element states
- **Utility Methods** - Logging, screenshots, waits

### Key Methods

#### Locator Methods

```typescript
// Get element by test ID (accessibility identifier)
const locator = await screen.getByTestId('com.app:id/elementId');

// Get element by visible text
const locator = await screen.getByText('Button Text');

// Get element by exact text
const locator = await screen.getByText('Exact Text', true);

// Get element by type
const locator = await screen.getByType('Button');

// Get element by placeholder
const locator = await screen.getByPlaceholder('Enter email');

// Get element by accessibility label
const locator = await screen.getByLabel('Continue');

// Get element by semantic role
const locator = await screen.getByRole('button', 'Submit');
```

#### Action Methods

```typescript
// Tap/Click element
await screen.tap(locator, timeout);

// Double tap element
await screen.doubleTap(locator, timeout);

// Long press element
await screen.longPress(locator, duration, timeout);

// Fill text input
await screen.fill(locator, 'text', timeout);

// Get element text
const text = await screen.getText(locator, timeout);

// Get input value
const value = await screen.getValue(locator, timeout);

// Swipe on screen
await screen.swipeScreen({ direction: 'up', distance: 200 });

// Swipe element
await screen.swipeElement(locator, 'down', options);

// Scroll element into view
await screen.scrollIntoView(locator, timeout);

// Wait for time
await screen.waitForTime(5000, 'Waiting for page load');
```

#### State Check Methods

```typescript
// Check if element is visible
const isVisible = await screen.isVisible(locator);

// Check if element is enabled
const isEnabled = await screen.isEnabled(locator);

// Check if element is selected
const isSelected = await screen.isSelected(locator);

// Check if element is focused
const isFocused = await screen.isFocused(locator);

// Check if checkbox/switch is checked
const isChecked = await screen.isChecked(locator);
```

#### Assertion Methods

```typescript
// Assert element is visible
await screen.assertVisible(locator);

// Assert element is NOT visible
await screen.assertNotVisible(locator);

// Assert element is enabled
await screen.assertEnabled(locator);

// Assert element is disabled
await screen.assertDisabled(locator);

// Assert element has text
await screen.assertText(locator, 'Expected Text');

// Assert element contains text
await screen.assertContainsText(locator, 'Partial Text');
```

#### Utility Methods

```typescript
// Log view tree for debugging
await screen.logTree();

// Take screenshot
await screen.takeScreenshot('screenshot.png', 'jpeg');
```

---

## Page Objects

### PopupScreen

Handles popup dialogs and modal interactions.

**Methods:**
- `isPopupVisible()` - Check if popup is visible
- `waitForPopupToDisappear(timeout)` - Wait for popup to close (default: 15s)
- `getPopupDetails()` - Get all popup element details
- `printDebugInfo()` - Print debug information

**Example Usage:**

```typescript
const popupScreen = new PopupScreen(screen);

const isVisible = await popupScreen.isPopupVisible();
if (isVisible) {
  await popupScreen.waitForPopupToDisappear(15000);
}
```

### EstimationScreen

Handles estimation/booking flow interactions.

**Methods:**
- `clickAddressInput(timeout?)` - Click address field
- `fillAddressInput(address, timeout?)` - Fill address text
- `clickAndFillAddress(address, timeout?)` - Click and fill combined
- `selectAddressFromSuggestion(text, timeout?)` - Select from dropdown
- `selectBikeService(timeout?)` - Select bike option
- `openPaymentOptions(timeout?)` - Open payment menu
- `selectCashPayment(timeout?)` - Select cash payment
- `clickChooseButton(timeout?)` - Click choose button
- `clickConfirmPickup(timeout?)` - Confirm pickup
- `completeEstimationFlow(address, suggestion)` - Complete full flow
- `verifyAddressInputVisible()` - Assert address is visible
- `printDebugInfo()` - Print debug info

**Example Usage:**

```typescript
const estimationScreen = new EstimationScreen(screen);

await estimationScreen.selectBikeService(15000);
await estimationScreen.clickAndFillAddress('airport', 15000);
await estimationScreen.selectAddressFromSuggestion('Hazrat Shahjalal International Airport', 15000);
```

---

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@mobilewright/test';
import { PopupScreen } from '../src/screens/popupScreen';
import { EstimationScreen } from '../src/screens/estimationScreen';

test('Complete booking flow', async ({ screen, device }) => {
  // Initialize page objects
  const popupScreen = new PopupScreen(screen);
  const estimationScreen = new EstimationScreen(screen);

  // Check for popup
  const isPopupVisible = await popupScreen.isPopupVisible();
  if (isPopupVisible) {
    await popupScreen.waitForPopupToDisappear(15000);
  }

  // Select service and fill address
  await estimationScreen.selectBikeService(15000);
  await estimationScreen.clickAndFillAddress('airport', 15000);

  // Assert results
  await estimationScreen.verifyAddressInputVisible();
});
```

### Test Best Practices

1. **Use page objects** - Never interact with elements directly in tests
2. **Use meaningful timeouts** - Different operations need different timeouts
3. **Add logging** - Methods already include console.log for debugging
4. **Handle errors gracefully** - Try-catch where necessary
5. **Use descriptive names** - Make test purposes clear

---

## Debugging

### View Tree

Log the current screen structure:

```typescript
await screen.logTree();
```

### Screenshots

Capture screen state:

```typescript
await screen.takeScreenshot('debug.png', 'jpeg');
```

### Debug Info

Page objects include debug methods:

```typescript
await estimationScreen.printDebugInfo();
```

---

## Resources

- [Mobilewright Documentation](https://mobilewright.dev/docs/)
- [Mobilewright GitHub](https://github.com/mobile-next/mobilewright)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## Contributing

1. Follow the Screen Object Model pattern
2. Always extend BaseScreen for new page objects
3. Add comprehensive JSDoc comments
4. Test your changes before committing

---

## License

This project is licensed under the MIT License.

---

Happy Testing!