class ScreenshotUtils {

  static async capture(page, name){

    try{

      await page.screenshot({
        path: `reports/screenshots/${name}.png`
      })

    }catch(error){

      console.error("Screenshot capture failed")

    }

  }

}

module.exports = ScreenshotUtils