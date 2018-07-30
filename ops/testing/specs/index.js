import { loadSeleniumInitialPage } from '../pageObjects/index'

describe('index', () => {
  it('should show the right title', async () => {
    const driver = await loadSeleniumInitialPage()
    expect(await driver.getTitle()).toBe('Prion')
  })
})
