const { request, expect } = require("@playwright/test")
const logger = require("../utils/logger")
const FrameworkException = require("../exceptions/FrameworkException")

class NasaAPI {

  constructor() {

    this.baseURL = "https://images-api.nasa.gov"

  }

  async createContext() {

    try {

      logger.info("Creating API request context")

      this.apiContext = await request.newContext({
        baseURL: this.baseURL
      })

    } catch (error) {

      logger.error("API context creation failed")

      throw new FrameworkException("API context creation failed", error)

    }

  }

  async searchImages(term) {

    try {

      logger.info(`Calling NASA search API with term: ${term}`)

      const response = await this.apiContext.get(
        `/search?q=${term}&media_type=image&page=1`
      )

      expect(response.status()).toBe(200)

      const body = await response.json()

      const items = body.collection.items

      expect(items.length).toBeGreaterThan(0)

      const data = items[0].data[0]

      logger.info(`NASA ID extracted: ${data.nasa_id}`)

      return {
        title: data.title,
        nasa_id: data.nasa_id
      }

    } catch (error) {

      logger.error("NASA search API failed")

      throw new FrameworkException("NASA search API failed", error)

    }

  }

  async getAssetDetails(nasa_id) {

    try {

      logger.info(`Calling asset API for nasa_id: ${nasa_id}`)

      const response = await this.apiContext.get(`/asset/${nasa_id}`)

      expect(response.status()).toBe(200)

      const body = await response.json()

      const items = body.collection.items

      expect(items.length).toBeGreaterThan(0)

      return items[0].href

    } catch (error) {

      logger.error("Asset API failed")

      throw new FrameworkException("Asset API failed", error)

    }

  }

}

module.exports = NasaAPI