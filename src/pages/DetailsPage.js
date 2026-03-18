const BasePage = require("../base/BasePage")
const { expect } = require("@playwright/test")
const logger = require("../utils/logger")
const FrameworkException = require("../exceptions/FrameworkException")
const WaitUtils = require("../utils/WaitUtils")

class DetailsPage extends BasePage {

  constructor(page) {

    super(page)

    this.title = page.locator("//div[@class='details-title notEmpty ng-star-inserted']")

    this.image = page.locator(".click-area").first()
    this.previewImage = page.locator("//img[@id='details_img']").first()

  }

  async validateTitleVisible() {

    try {

      logger.info("Validating title visibility")

      await WaitUtils.waitForElementVisible(this.title)

      await expect(this.title).toBeVisible()

      logger.info("Title is visible")

    } catch (error) {

      logger.error("Title validation failed")

      throw new FrameworkException("Title validation failed", error)

    }

  }

  async validateImageLoaded() {

    try {

      logger.info("Waiting for image to be visible")

      //await WaitUtils.waitForElementVisible(this.previewImage)

      await expect(this.previewImage).toBeVisible()

      logger.info("Checking if image is fully loaded")

      const isLoaded = await this.previewImage.evaluate((img) => {
        return img.complete && img.naturalWidth > 0
      })

      if (!isLoaded) {
        throw new Error("Image not loaded properly")
      }

      logger.info("Image loaded successfully")

    } catch (error) {

      logger.error("Preview image validation failed: " + error.message)

      throw new FrameworkException("Preview image validation failed", error)

    }

  }

  async getTitle() {

   await WaitUtils.waitForElementVisible(this.title)
    await expect(this.title).toBeVisible()
    return await this.title.textContent()
}

}

module.exports = DetailsPage