const reporter = require("cucumber-html-reporter")

const options = {
  theme: "bootstrap",
  jsonFile: "reports/cucumber_report.json",
  output: "reports/cucumber-report.html",
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "Project Name": "NASA Playwright Automation",
    "Test Environment": "QA",
    "Browser": "Chromium",
    "Platform": "Windows",
    "Executed": "Local"
  }
}

reporter.generate(options)