Feature: NASA UI Search
@apiTest
Scenario: Search moon images
Given user navigates to NASA website
When user searches for "moon"
Then at least 5 results should appear
And user opens first result
Then title should be visible
And preview image should load