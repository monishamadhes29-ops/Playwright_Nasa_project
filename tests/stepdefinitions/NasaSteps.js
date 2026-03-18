const { Given, When, Then } = require("@cucumber/cucumber")
const { expect } = require("@playwright/test")

const logger = require("../../src/utils/logger")
const FrameworkException = require("../../src/exceptions/FrameworkException")
const WaitUtils = require("../../src/utils/WaitUtils")

const HomePage = require("../../src/pages/HomePage")
const SearchResultsPage = require("../../src/pages/SearchResultsPage")
const NasaAPI = require("../../src/api/NasaAPI")
const DetailsPage = require("../../src/pages/DetailsPage")

let nasaAPI
let title
let nasa_id
let assetUrl
let resultCount


/*
=========================
API TESTS
=========================
*/

Given("user calls NASA search API with {string}", async function (term) {

  try {

    logger.info(`Calling NASA search API with term: ${term}`)

    nasaAPI = new NasaAPI()

    await nasaAPI.createContext()

    const data = await nasaAPI.searchImages(term)

    title = data.title
    nasa_id = data.nasa_id

    logger.info(`API returned title: ${title}`)
    logger.info(`API returned nasa_id: ${nasa_id}`)

  } catch (error) {

    logger.error("NASA search API failed")

    throw new FrameworkException("NASA search API failed", error)

  }

})


Then("API returns title and nasa_id", async function () {

  try {

    logger.info("Validating API response values")

    expect(title).not.toBeNull()
    expect(nasa_id).not.toBeNull()

  } catch (error) {

    logger.error("API validation failed")

    throw new FrameworkException("API validation failed", error)

  }

})


Given("user gets asset details", async function () {

  try {

    logger.info(`Calling asset API for nasa_id: ${nasa_id}`)

    assetUrl = await nasaAPI.getAssetDetails(nasa_id)

  } catch (error) {

    logger.error("Asset API call failed")

    throw new FrameworkException("Asset API failed", error)

  }

})


Then("asset API should return downloadable URL", async function () {

  try {

    logger.info("Validating downloadable asset URL")

    expect(assetUrl).not.toBeNull()

    logger.info(`Asset URL: ${assetUrl}`)

  } catch (error) {

    logger.error("Asset API validation failed")

    throw new FrameworkException("Asset API validation failed", error)

  }

})


Given("user calls invalid search", async function () {

  try {

    logger.info("Calling NASA API with invalid search")

    nasaAPI = new NasaAPI()

    await nasaAPI.createContext()

    const response = await nasaAPI.apiContext.get(
      "/search?q=invalid123xyz&media_type=image&page=1"
    )

    const body = await response.json()

    resultCount = body.collection.items.length

    logger.info(`Invalid search returned ${resultCount} results`)

  } catch (error) {

    logger.error("Invalid search API failed")

    throw new FrameworkException("Invalid search API failed", error)

  }

})


Then("API should return zero results", async function () {

  try {

    logger.info("Validating zero results for invalid search")

    expect(resultCount).toBe(0)

  } catch (error) {

    logger.error("Negative API validation failed")

    throw new FrameworkException("Negative API validation failed", error)

  }

})


/*
=========================
UI TESTS
=========================
*/

Given(/^user navigates to NASA website$/, async function () {

  try {

    logger.info("Navigating to NASA website")

    await this.page.goto("https://images.nasa.gov")

    await this.page.waitForLoadState("networkidle")

    logger.info("Page loaded, locating search input")

    const searchBox = this.page.locator(".search-input").first()

    await WaitUtils.waitForElementVisible(searchBox)

    await expect(searchBox).toBeVisible()

    logger.info("NASA homepage loaded successfully")

  } catch (error) {

    logger.error("Navigation failed")

    throw new FrameworkException("Navigation failed", error)

  }

})

When("user searches for {string}", async function (term) {

  try {

    logger.info(`Searching in UI for: ${term}`)

    const home = new HomePage(this.page)

    await home.search(term)

  } catch (error) {

    logger.error("Search step failed")

    throw new FrameworkException("Search step failed", error)

  }

})


Then("at least 5 results should appear", async function () {

  try {

    logger.info("Validating results count")

    const results = new SearchResultsPage(this.page)

    await results.validateResults()

  } catch (error) {

    logger.error("Result validation failed")

    throw new FrameworkException("Result validation failed", error)

  }

})
When("user opens first result", async function () {

  try {

    logger.info("Opening first search result")

    const resultsPage = new SearchResultsPage(this.page)

    await resultsPage.openFirstResult()

  } catch (error) {

    logger.error("Failed to open first search result")

    throw new FrameworkException("Open first result failed", error)

  }

})

Then("title should be visible", async function () {

  try {

    logger.info("Validating title visibility")

    const titleLocator = this.page.locator("h1")

    await WaitUtils.waitForElementVisible(titleLocator)

    await expect(titleLocator).toBeVisible()

    logger.info("Title is visible")

  } catch (error) {

    logger.error("Title validation failed")

    throw new FrameworkException("Title validation failed", error)

  }

})

Then("preview image should load", async function () {

  try {

    logger.info("Validating preview image from step")

    const details = new DetailsPage(this.page)

    await details.validateImageLoaded()

  } catch (error) {

    logger.error("Preview image validation failed")

    throw new FrameworkException("Preview image validation failed", error)

  }

})


/*
=========================
API → UI INTEGRATION
=========================
*/

Then("UI title should match API title", async function () {

  try {

    logger.info("Validating UI title against API title")

    const results = new SearchResultsPage(this.page)
    const details = new DetailsPage(this.page)

    await results.openFirstResult()
    

    const uiTitle = await details.getTitle()

    logger.info("UI Title: " + uiTitle)
    logger.info("API Title: " + title)

    const normalize = (text) =>
      text.replace(/\s+/g, " ").trim().toLowerCase()

    expect(normalize(uiTitle))
      .toContain(normalize(title))

    logger.info("UI title matches API title")

  } catch (error) {

    logger.error("API UI consistency validation failed: " + error.message)

    throw new FrameworkException("API UI consistency validation failed", error)

  }

})