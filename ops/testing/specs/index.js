import { selenium } from "../selenium";

describe('index', () => {
  it('should show the right title', async () => {
    const selenium = process.selenium;
    await selenium.loadIndexPage()

    expect(await selenium.driver.getTitle()).toBe('Prion')
  })
})
