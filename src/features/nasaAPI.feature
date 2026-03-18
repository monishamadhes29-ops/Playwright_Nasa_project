Feature: NASA API Validation

Scenario: Search images API
Given user calls NASA search API with "moon"
Then API returns title and nasa_id

Scenario: Asset API validation
Given user gets asset details
Then asset API should return downloadable URL

Scenario: Negative API test
Given user calls invalid search
Then API should return zero results