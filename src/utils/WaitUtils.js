const { expect } = require("@playwright/test")
const logger = require("./logger")
const FrameworkException = require("../exceptions/FrameworkException")

class WaitUtils {

  static async waitForElementVisible(locator) {

    try {

      logger.info("Waiting for element to be visible")

      await expect(locator).toBeVisible()

    } catch (error) {

      logger.error("Element not visible")

      throw new FrameworkException("Wait for element visible failed", error)

    }

  }

  static async waitForPageLoad(page) {

  try {

    logger.info("Waiting for page to fully load")

    await page.waitForLoadState("networkidle")

  } catch (error) {

    logger.error("Page load wait failed")

    throw new FrameworkException("Page load wait failed", error)

  }

}
static async waitForURL(page, urlPattern, timeout = 15000) {

  try {

    await page.waitForURL(urlPattern, { timeout })

  } catch (error) {

    throw new Error(`URL did not match ${urlPattern} within ${timeout}ms`)

  }

}

}

module.exports = WaitUtils