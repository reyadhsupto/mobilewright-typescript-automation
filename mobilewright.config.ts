import { defineConfig } from 'mobilewright';

export default defineConfig({
  platform: 'android',
  bundleId: 'com.pathao.user.qa',
  reporter: 'html',
  deviceId: 'R5CY54LYD0X',
  deviceName: /Galaxy A56 5G/,
  timeout: 30_000*10000,
  testDir: './tests',
  
});
