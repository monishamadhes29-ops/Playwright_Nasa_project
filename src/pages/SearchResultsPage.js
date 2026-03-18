const BasePage = require("../base/BasePage")
const WaitUtils = require("../utils/WaitUtils")
const logger = require("../utils/logger")
const FrameworkException = require("../exceptions/FrameworkException")
const { expect } = require("@playwright/test")

class SearchResultsPage extends BasePage {

  constructor(page) {

    super(page)

    this.results = page.locator("a[href*='/details/']")

    this.firstImage = page.locator(".click-area").first()

  }

  async validateResults() {

    try {

      logger.info("Validating search results")

      await WaitUtils.waitForElementVisible(this.results.first())

      const count = await this.results.count()

      logger.info(`Results count: ${count}`)

      expect(count).toBeGreaterThan(4)

    } catch (error) {

      logger.error("Search results validation failed")

      throw new FrameworkException("Search results validation failed", error)

    }

  }

  async openFirstResult() {

    try {

      logger.info("Opening first visible search result image")

      // ✅ Target ONLY images inside search results
      //const firstImage = this.page.locator("a[href*='/details/'] img").first()

      await WaitUtils.waitForElementVisible(this.firstImage)

      await expect(this.firstImage).toBeVisible()
      
      await this.firstImage.click()

      logger.info("Navigated to details page")

    } catch (error) {

      logger.error("Opening first image failed: " + error.message)

      throw new FrameworkException("Open first image failed", error)

    }

  }

}

module.exports = SearchResultsPage