module.exports = {
  default: {
    require: [
      "tests/stepdefinitions/*.js",
      "src/hooks/*.js"
    ],
    paths: [
      "src/features/*.feature"
    ],
    format: [
      "progress",
      "json:reports/cucumber_report.json"
    ]
  }
}