Feature: API UI Integration

Scenario: Validate API and UI consistency
Given user calls NASA search API with "moon"
When user navigates to NASA website
And user searches for "moon"
Then UI title should match API title