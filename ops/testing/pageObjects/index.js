import { until } from 'selenium-webdriver'
import { selenium } from '../helpers'

const rootSelector = {css: '#root'}
const serverUrl = process.env.CLIENT_SERVER_URL || 'localhost:8080'

export const root = () => selenium.driver.findElement(rootSelector)

export const defaultTimeout = 10e3

export const loadSeleniumInitialPage = async function () {
  const driver = selenium.driver

  await driver.get(`${serverUrl}/`)
  await driver.wait(until.elementLocated(root), defaultTimeout)
  return driver
}
