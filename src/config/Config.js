module.exports = {
  default: {
    require: [
      "tests/stepdefinitions/*.js",
      "src/hooks/*.js"
    ],
    format: [
      "progress",
      "html:reports/cucumber-report.html"
    ],
    paths: [
      "src/features/*.feature"
    ]
  }
}