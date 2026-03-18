const BasePage = require("../base/BasePage")
const { expect } = require("@playwright/test")
const WaitUtils = require("../utils/WaitUtils")
const logger = require("../utils/logger")
const FrameworkException = require("../exceptions/FrameworkException")

class HomePage extends BasePage {

  constructor(page) {

    super(page)

    this.searchBox = this.page.locator("//input[@id='search-input']").first()

  }

  async search(term) {

  try {

    logger.info("Waiting for search box")
   

    const searchBox = this.page.locator("//input[@id='search-input']")

     await WaitUtils.waitForElementVisible(this.searchBox)

    await expect(searchBox).toBeVisible()

    logger.info(`Entering search term: ${term}`)

    await searchBox.click()
    await searchBox.fill(term)

    logger.info("Triggering search")

    await this.page.keyboard.press("Enter")

    logger.info("Waiting for URL to change")

    await WaitUtils.waitForURL(this.page, "**/search?*")

    logger.info("Waiting for results")

    const results = this.page.locator("a[href*='/details/']")

    await results.first().waitFor({ state: "visible", timeout: 15000 })

    await expect(results.first()).toBeVisible()

    logger.info("Search completed successfully")

  } catch (error) {

    logger.error("Search failed: " + error.message)

    throw new FrameworkException("Search failed in HomePage", error)

  }

}
}

module.exports = HomePage