🚀 Playwright NASA Automation Framework (UI + API + BDD)
________________________________________
📖 Overview
This project is a Hybrid Automation Framework built using Playwright with JavaScript, supporting both:
•	✅ UI Automation
•	✅ API Automation
•	✅ BDD (Cucumber)
The framework follows Page Object Model (POM) and is designed for scalability, maintainability, and real-world testing needs.
________________________________________
🎯 Key Highlights
•	🔹 UI + API automation in a single framework
•	🔹 BDD using Cucumber (Gherkin syntax)
•	🔹 Clean Page Object Model (POM)
•	🔹 Centralized configuration management
•	🔹 Custom logging & reporting
•	🔹 Screenshot & video support
•	🔹 Exception handling layer
•	🔹 Scalable and production-ready structure
________________________________________
🛠️ Tech Stack
Tool	Purpose
Playwright	UI Automation
JavaScript	Programming
Cucumber	BDD
Node.js	Runtime
Git	Version Control
________________________________________
📂 Project Structure
PLAYWRIGHT_NASA_PROJECT
│
├── .github                # CI/CD workflows (future use)
├── node_modules
│
├── reports
│   ├── logs
│   │   ├── test.log
│   ├── cucumber_report.json
│   ├── cucumber-report.html
│   ├── framework.log
│
├── src
│   ├── api
│   │   ├── ApiClient.js
│   │   ├── NasaAPI.js
│
│   ├── base
│   │   ├── BasePage.js
│
│   ├── config
│   │   ├── Config.js
│
│   ├── exceptions
│   │   ├── FrameworkException.js
│
│   ├── features
│   │   ├── nasaAPI.feature
│   │   ├── nasaIntegration.feature
│   │   ├── nasaUI.feature
│
│   ├── hooks
│   │   ├── Hooks.js
│
│   ├── pages
│   │   ├── HomePage.js
│   │   ├── SearchResultsPage.js
│   │   ├── DetailsPage.js
│
│   ├── utils
│   │   ├── WaitUtils.js
│   │   ├── ScreenshotUtils.js
│   │   ├── VideoUtils.js
│   │   ├── logger.js
│   │   ├── reportGenerator.js
│
├── tests
│   ├── stepdefinitions
│   │   ├── NasaSteps.js
│
├── cucumber.js
├── playwright.config.js
├── package.json
├── .gitignore
________________________________________
⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/monishamadhes29-ops/Playwright_Nasa_project.git
cd PLAYWRIGHT_NASA_PROJECT
________________________________________
2️⃣ Install Dependencies
npm install
________________________________________
3️⃣ Install Playwright Browsers
npx playwright install
________________________________________
▶️ Test Execution
Run All Tests
npx cucumber-js
________________________________________
Run Specific Feature
npx cucumber-js src/features/nasaUI.feature
________________________________________
🧪 Test Coverage
🌐 UI Testing
•	NASA homepage validation
•	Search functionality
•	Result verification
🔗 API Testing
•	NASA API validation
•	API response verification
•	Integration with UI scenarios
________________________________________
🔧 Framework Components
📄 Pages
•	Encapsulates UI elements and actions
•	Follows Page Object Model
🔗 API Layer
•	ApiClient.js → Handles HTTP requests
•	NasaAPI.js → NASA-specific API methods
⚙️ Utils
•	WaitUtils → Custom wait handling
•	ScreenshotUtils → Capture screenshots
•	VideoUtils → Record execution
•	logger → Logging support
•	reportGenerator → Custom reports
🧱 Base Layer
•	BasePage → Common reusable methods
⚠️ Exception Handling
•	Centralized error handling via FrameworkException.js
________________________________________
📊 Reporting
Reports are generated under:
reports/
Includes:
•	HTML Report → cucumber-report.html
•	JSON Report → cucumber_report.json
•	Logs → test.log, framework.log
________________________________________
🐞 Debugging
Run in headed mode
npx playwright test --headed
Pause execution
await page.pause()
________________________________________
📸 Screenshots / Demo
👉 Add screenshots after execution:
![Execution](./reports/screenshots/sample.png)
________________________________________
🚀 Future Enhancements
•	🔹 CI/CD integration (GitHub Actions)
•	🔹 Parallel execution
•	🔹 Cross-browser execution
•	🔹 Allure reporting integration
•	🔹 Docker support
________________________________________
🧑‍💻 Author
Monisha Madheswaran
