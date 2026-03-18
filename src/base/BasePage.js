const Logger = require("../utils/logger")

class BasePage {

  constructor(page){
    this.page = page
  }

  async click(locator){
    try{
      await locator.click()
      Logger.info("Clicked element")
    }catch(error){
      Logger.error("Error clicking element: " + error.message)
      throw error
    }
  }

  async type(locator, text){
    try{
      await locator.fill(text)
      Logger.info("Entered text: " + text)
    }catch(error){
      Logger.error("Error typing text: " + error.message)
      throw error
    }
  }

  async getText(locator){
    try{
      return await locator.textContent()
    }catch(error){
      Logger.error("Error getting text: " + error.message)
      throw error
    }
  }

  async isVisible(locator){
    try{
      return await locator.isVisible()
    }catch(error){
      Logger.error("Visibility check failed")
      throw error
    }
  }

}

module.exports = BasePage