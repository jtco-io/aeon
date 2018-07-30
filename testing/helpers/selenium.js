import { Builder } from 'selenium-webdriver'


export class Selenium {
  initialized
  testEndpoint
  serverEndpoint
  driver

  constructor(testEndpoint) {
    this.testEndpoint = testEndpoint
    if (process.env.SELENIUM_URL) {
      this.serverEndpoint = process.env.SELENIUM_URL
    }
  }

  async load() {
    if (!this.initialized) {
      if (this.serverEndpoint) {
        this.driver = new Builder()
          .forBrowser('chrome')
          .usingServer(`http://${seleniumUrl}/wd/hub`)
          .build()


      } else {
        this.driver = new Builder()
          .forBrowser('chrome')
          .build()
      }

    }
  }

  async quit() {
    this.driver.quit()
  }
}

export const selenium = new Selenium()
