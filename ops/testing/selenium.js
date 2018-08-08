import { Builder, until } from "selenium-webdriver";


export const defaultTimeout = 10e3;

export default class Selenium {
  initialized;
  testEndpoint;
  getRootSelector;
  seleniumURL;
  driver;

  constructor(testEndpoint, rootSelector = { css: "#root" }) {
    this.testEndpoint = `http:/${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`;
    this.rootSelector = rootSelector;
    if (process.env.SELENIUM_URL) {
      this.seleniumURL = process.env.SELENIUM_URL;
    }
  }

  async initialize() {
    if (!this.initialized) {
      if (this.seleniumURL) {
        this.driver = new Builder()
          .forBrowser( "chrome" )
          .usingServer( `http://${this.seleniumURL}/wd/hub` )
          .build();


      } else {
        this.driver = new Builder()
          .forBrowser( "chrome" )
          .build();
      }
    }
    this.getRootSelector = () => this.driver.findElement( this.rootSelector );
  }

  async loadIndexPage() {
    await this.driver.get( this.testEndpoint );
    await this.driver.wait( until.elementLocated( this.getRootSelector ), defaultTimeout );
  }

  async quit() {
    const quit = this.driver.quit();
    await quit;
  }
}
