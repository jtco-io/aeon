import { Builder } from 'selenium-webdriver'

const seleniumUrl = process.env.SELENIUM_URL || 'localhost:4000'

export const driver = new Builder()
  .forBrowser('chrome')
  .usingServer(`http://${seleniumUrl}/wd/hub`)
  .build()

afterAll(async () => {
  // Cleanup `process.on('exit')` event handlers to prevent a memory leak caused by the combination of `jest` & `tmp`.
  for (const listener of process.listeners('exit')) {
    listener()
    process.removeListener('exit', listener)
  }
  await driver.quit()
})

export const defaultTimeout = 10e3
