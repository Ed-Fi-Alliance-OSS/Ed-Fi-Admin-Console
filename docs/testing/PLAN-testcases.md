# Admin Console Test Cases

Below are the test cases for Admin Console and using Gherkin to define the test cases.  This first definition will use [Markdown With Gherkin](https://github.com/cucumber/gherkin/blob/main/MARKDOWN_WITH_GHERKIN.md) to define the test cases in a readable manner and future iterations may convert this into other formats to be used with automation in our C#, Playright and other tools in the future.

# Feature: Login in with recommended MFA configuration

Login with recommended MFA configuration using Keycloak configured to use OTAP or other one-time token for authentication.

## Rule: Successful Login Case

### Scenario Outline: User logs in successfully

* Given there is a user that wants to <start> a new session
* The user has valid credentials
* The user has MFA configured in their IDP, which is KeyCloak for this test case
* The user should have a valid path to authenicate with valid credentials
* Upon login, the user is directed to the authenicated main page

## Rule: Unsuccessful Login Case

### Scenario Outline: User logs in successfully

* Given there is a user that wants to <start> a new session
* The user has invalid credentials
* The user has MFA configured in their IDP, which is KeyCloak for this test case
* The user should have a invalid path to authenicate with invalid credentials
* The user is denied access to Admin Console
* The user is provided appropriate error messages
